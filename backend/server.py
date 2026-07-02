from fastapi import FastAPI, APIRouter, HTTPException, Header, Depends
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI(title="Serviços Jurídicos API")
api_router = APIRouter(prefix="/api")


# ============ Models ============
class Lead(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    nome: str
    telefone: str
    email: Optional[str] = None
    servico: str
    mensagem: Optional[str] = ""
    status: str = "novo"  # novo, contatado, convertido, descartado
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class LeadCreate(BaseModel):
    nome: str = Field(min_length=2, max_length=120)
    telefone: str = Field(min_length=8, max_length=32)
    email: Optional[str] = None
    servico: str = Field(min_length=2, max_length=120)
    mensagem: Optional[str] = Field(default="", max_length=2000)


class AdminLogin(BaseModel):
    password: str


class LeadStatusUpdate(BaseModel):
    status: str


# ============ Auth ============
ADMIN_PASSWORD = os.environ.get('ADMIN_PASSWORD', 'admin123')


def require_admin(x_admin_token: Optional[str] = Header(default=None)):
    if not x_admin_token or x_admin_token != ADMIN_PASSWORD:
        raise HTTPException(status_code=401, detail="Não autorizado")
    return True


# ============ Routes ============
@api_router.get("/")
async def root():
    return {"message": "Serviços Jurídicos API online"}


@api_router.post("/leads", response_model=Lead)
async def create_lead(input: LeadCreate):
    lead = Lead(**input.model_dump())
    doc = lead.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.leads.insert_one(doc)
    return lead


@api_router.post("/admin/login")
async def admin_login(payload: AdminLogin):
    if payload.password != ADMIN_PASSWORD:
        raise HTTPException(status_code=401, detail="Senha incorreta")
    return {"token": ADMIN_PASSWORD, "ok": True}


@api_router.get("/admin/leads", response_model=List[Lead])
async def list_leads(_: bool = Depends(require_admin)):
    docs = await db.leads.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    for d in docs:
        if isinstance(d.get('created_at'), str):
            d['created_at'] = datetime.fromisoformat(d['created_at'])
    return docs


@api_router.patch("/admin/leads/{lead_id}", response_model=Lead)
async def update_lead_status(lead_id: str, payload: LeadStatusUpdate, _: bool = Depends(require_admin)):
    result = await db.leads.find_one_and_update(
        {"id": lead_id},
        {"$set": {"status": payload.status}},
        return_document=True,
        projection={"_id": 0},
    )
    if not result:
        raise HTTPException(status_code=404, detail="Lead não encontrado")
    if isinstance(result.get('created_at'), str):
        result['created_at'] = datetime.fromisoformat(result['created_at'])
    return result


@api_router.delete("/admin/leads/{lead_id}")
async def delete_lead(lead_id: str, _: bool = Depends(require_admin)):
    result = await db.leads.delete_one({"id": lead_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Lead não encontrado")
    return {"ok": True}


@api_router.get("/admin/stats")
async def stats(_: bool = Depends(require_admin)):
    total = await db.leads.count_documents({})
    novos = await db.leads.count_documents({"status": "novo"})
    contatados = await db.leads.count_documents({"status": "contatado"})
    convertidos = await db.leads.count_documents({"status": "convertido"})
    return {"total": total, "novos": novos, "contatados": contatados, "convertidos": convertidos}


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
