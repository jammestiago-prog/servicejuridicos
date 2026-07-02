import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Loader2, LogOut, RefreshCw, Trash2, Phone, Mail, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const TOKEN_KEY = "sj_admin_token";

const STATUS = [
  { v: "novo", label: "Novo", color: "text-[#d4af37] border-[#d4af37]/40" },
  { v: "contatado", label: "Contatado", color: "text-blue-300 border-blue-400/40" },
  { v: "convertido", label: "Convertido", color: "text-emerald-300 border-emerald-400/40" },
  { v: "descartado", label: "Descartado", color: "text-neutral-400 border-neutral-500/40" },
];

const LoginForm = ({ onLogin }) => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(`${API}/admin/login`, { password });
      localStorage.setItem(TOKEN_KEY, data.token);
      onLogin(data.token);
      toast.success("Bem-vindo!");
    } catch {
      toast.error("Senha inválida.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-6">
      <form
        onSubmit={submit}
        className="w-full max-w-md border border-[#262626] bg-[#0d0d0d] p-8 rounded-sm"
        data-testid="admin-login-form"
      >
        <div className="mb-6">
          <div className="text-xs uppercase tracking-[0.4em] text-[#d4af37] mb-2">Painel Admin</div>
          <h1 className="font-serif-lux text-3xl text-white">Acesso restrito</h1>
        </div>
        <Label className="text-xs uppercase tracking-widest text-neutral-400">Senha</Label>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          className="mt-2 bg-[#0a0a0a] border-[#262626] text-white gold-ring h-12"
          data-testid="admin-input-password"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="gold-btn rounded-full w-full py-3 mt-6 inline-flex items-center justify-center gap-2"
          data-testid="admin-login-submit"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Entrar"}
        </button>
      </form>
    </div>
  );
};

const Dashboard = ({ token, onLogout }) => {
  const [leads, setLeads] = useState([]);
  const [stats, setStats] = useState({ total: 0, novos: 0, contatados: 0, convertidos: 0 });
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("todos");
  const [search, setSearch] = useState("");

  const headers = { "X-Admin-Token": token };

  const load = async () => {
    try {
      setLoading(true);
      const [l, s] = await Promise.all([
        axios.get(`${API}/admin/leads`, { headers }),
        axios.get(`${API}/admin/stats`, { headers }),
      ]);
      setLeads(l.data);
      setStats(s.data);
    } catch (e) {
      if (e?.response?.status === 401) {
        onLogout();
        toast.error("Sessão expirada.");
      } else {
        toast.error("Erro ao carregar leads.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const changeStatus = async (id, status) => {
    try {
      await axios.patch(`${API}/admin/leads/${id}`, { status }, { headers });
      toast.success("Status atualizado.");
      load();
    } catch {
      toast.error("Erro ao atualizar.");
    }
  };

  const remove = async (id) => {
    if (!window.confirm("Excluir este lead permanentemente?")) return;
    try {
      await axios.delete(`${API}/admin/leads/${id}`, { headers });
      toast.success("Lead excluído.");
      load();
    } catch {
      toast.error("Erro ao excluir.");
    }
  };

  const filtered = leads.filter((l) => {
    if (filter !== "todos" && l.status !== filter) return false;
    const q = search.toLowerCase();
    if (!q) return true;
    return (
      l.nome?.toLowerCase().includes(q) ||
      l.telefone?.toLowerCase().includes(q) ||
      l.email?.toLowerCase().includes(q) ||
      l.servico?.toLowerCase().includes(q)
    );
  });

  const fmt = (iso) => {
    try {
      const d = new Date(iso);
      return d.toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" });
    } catch {
      return iso;
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <header className="border-b border-[#262626] bg-[#0d0d0d]">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div>
            <div className="text-xs uppercase tracking-[0.4em] text-[#d4af37]">Painel Admin</div>
            <h1 className="font-serif-lux text-2xl mt-1">Leads Recebidos</h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={load}
              className="gold-outline-btn rounded-full px-4 py-2 text-xs inline-flex items-center gap-2"
              data-testid="admin-refresh"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} /> Atualizar
            </button>
            <button
              onClick={onLogout}
              className="text-neutral-400 hover:text-[#d4af37] text-xs inline-flex items-center gap-2"
              data-testid="admin-logout"
            >
              <LogOut className="w-4 h-4" /> Sair
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10" data-testid="admin-stats">
          {[
            { k: "total", label: "Total", val: stats.total },
            { k: "novos", label: "Novos", val: stats.novos },
            { k: "contatados", label: "Contatados", val: stats.contatados },
            { k: "convertidos", label: "Convertidos", val: stats.convertidos },
          ].map((s) => (
            <div key={s.k} className="border border-[#262626] bg-[#0d0d0d] p-5" data-testid={`stat-${s.k}`}>
              <div className="text-xs uppercase tracking-widest text-neutral-500">{s.label}</div>
              <div className="font-serif-lux text-4xl gold-text mt-1">{s.val}</div>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between mb-6">
          <div className="flex items-center gap-3 text-sm text-neutral-400">
            <Filter className="w-4 h-4 text-[#d4af37]" />
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger
                className="w-44 bg-[#0d0d0d] border-[#262626] text-white h-10"
                data-testid="admin-filter"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#0a0a0a] border-[#262626] text-white">
                <SelectItem value="todos">Todos</SelectItem>
                {STATUS.map((s) => (
                  <SelectItem key={s.v} value={s.v}>{s.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Input
            placeholder="Buscar por nome, telefone, email ou serviço..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-md bg-[#0d0d0d] border-[#262626] text-white gold-ring h-10"
            data-testid="admin-search"
          />
        </div>

        <div className="border border-[#262626] rounded-sm overflow-hidden" data-testid="admin-leads-table">
          {loading && leads.length === 0 ? (
            <div className="p-12 text-center text-neutral-400">
              <Loader2 className="w-6 h-6 animate-spin mx-auto mb-3 text-[#d4af37]" />
              Carregando leads...
            </div>
          ) : filtered.length === 0 ? (
            <div className="p-12 text-center text-neutral-500">Nenhum lead encontrado.</div>
          ) : (
            <div className="divide-y divide-[#1a1a1a]">
              {filtered.map((l) => {
                const st = STATUS.find((x) => x.v === l.status) || STATUS[0];
                return (
                  <div key={l.id} className="p-5 hover:bg-[#0d0d0d] transition" data-testid={`lead-row-${l.id}`}>
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-3 flex-wrap">
                          <span className="text-white font-medium">{l.nome}</span>
                          <span className={`text-[10px] uppercase tracking-widest border rounded-full px-2.5 py-0.5 ${st.color}`}>
                            {st.label}
                          </span>
                          <span className="text-xs text-neutral-500">{fmt(l.created_at)}</span>
                        </div>
                        <div className="text-sm text-[#d4af37] mt-1">{l.servico}</div>
                        <div className="flex flex-wrap gap-4 text-xs text-neutral-400 mt-2">
                          <a href={`tel:${l.telefone}`} className="inline-flex items-center gap-1 hover:text-[#d4af37]">
                            <Phone className="w-3 h-3" /> {l.telefone}
                          </a>
                          {l.email && (
                            <a href={`mailto:${l.email}`} className="inline-flex items-center gap-1 hover:text-[#d4af37]">
                              <Mail className="w-3 h-3" /> {l.email}
                            </a>
                          )}
                          <a
                            href={`https://wa.me/${l.telefone.replace(/\D/g, "")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#25d366] hover:underline"
                          >
                            WhatsApp
                          </a>
                        </div>
                        {l.mensagem && (
                          <p className="text-sm text-neutral-400 mt-2 italic">"{l.mensagem}"</p>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <Select value={l.status} onValueChange={(v) => changeStatus(l.id, v)}>
                          <SelectTrigger
                            className="w-40 bg-[#0a0a0a] border-[#262626] text-white h-9 text-xs"
                            data-testid={`lead-status-${l.id}`}
                          >
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-[#0a0a0a] border-[#262626] text-white">
                            {STATUS.map((s) => (
                              <SelectItem key={s.v} value={s.v}>{s.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <button
                          onClick={() => remove(l.id)}
                          className="text-neutral-500 hover:text-red-400 p-2"
                          data-testid={`lead-delete-${l.id}`}
                          aria-label="Excluir"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default function Admin() {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY) || "");
  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setToken("");
  };
  return token ? <Dashboard token={token} onLogout={logout} /> : <LoginForm onLogin={setToken} />;
}
