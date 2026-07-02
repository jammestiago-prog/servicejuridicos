import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Loader2, Send, Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SERVICES, WHATSAPP_DISPLAY } from "@/data/services";
import { buildWhatsAppLink, defaultWhatsAppMessage } from "@/lib/whatsapp";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export const Contact = () => {
  const [form, setForm] = useState({
    nome: "",
    telefone: "",
    email: "",
    servico: "",
    mensagem: "",
  });
  const [loading, setLoading] = useState(false);

  const upd = (k) => (e) => setForm((f) => ({ ...f, [k]: e?.target?.value ?? e }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.nome || !form.telefone || !form.servico) {
      toast.error("Preencha nome, telefone e serviço de interesse.");
      return;
    }
    try {
      setLoading(true);
      await axios.post(`${API}/leads`, {
        nome: form.nome,
        telefone: form.telefone,
        email: form.email || null,
        servico: form.servico,
        mensagem: form.mensagem,
      });
      toast.success("Recebemos seus dados! Entraremos em contato em breve.");
      const msg = `Olá! Meu nome é ${form.nome}. Tenho interesse no serviço: ${form.servico}.${
        form.mensagem ? " " + form.mensagem : ""
      }`;
      window.open(buildWhatsAppLink(msg), "_blank");
      setForm({ nome: "", telefone: "", email: "", servico: "", mensagem: "" });
    } catch (err) {
      toast.error("Não foi possível enviar. Tente novamente ou fale no WhatsApp.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contato"
      data-testid="contact-section"
      className="relative py-24 lg:py-32 bg-[#0a0a0a] border-t border-[#1a1a1a] overflow-hidden"
    >
      <div
        aria-hidden
        className="absolute -top-40 -left-40 w-[520px] h-[520px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(212,175,55,0.12) 0%, rgba(212,175,55,0) 65%)",
        }}
      />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-5 gap-12">
        <div className="lg:col-span-2">
          <span className="divider-gold text-xs uppercase tracking-[0.4em]">Contato</span>
          <h2
            className="font-serif-lux text-4xl sm:text-5xl lg:text-6xl text-white mt-6 leading-tight"
            data-testid="contact-title"
          >
            Fale com um <span className="gold-text italic">especialista</span> agora
          </h2>
          <p className="text-neutral-400 mt-6 text-lg leading-relaxed">
            Envie seus dados que retornamos rapidamente pelo canal de sua preferência.
            Atendimento sigiloso, primeira consulta gratuita.
          </p>

          <div className="mt-10 space-y-5" data-testid="contact-info">
            <a
              href={buildWhatsAppLink(defaultWhatsAppMessage())}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 group"
              data-testid="contact-whatsapp-link"
            >
              <span className="w-12 h-12 rounded-full bg-[#141414] border border-[#d4af37]/40 flex items-center justify-center group-hover:border-[#d4af37] transition">
                <MessageCircle className="w-5 h-5 text-[#d4af37]" />
              </span>
              <div>
                <div className="text-xs uppercase tracking-widest text-neutral-500">WhatsApp</div>
                <div className="text-white group-hover:text-[#d4af37] transition">
                  {WHATSAPP_DISPLAY}
                </div>
              </div>
            </a>

            <div className="flex items-center gap-4">
              <span className="w-12 h-12 rounded-full bg-[#141414] border border-[#d4af37]/40 flex items-center justify-center">
                <Phone className="w-5 h-5 text-[#d4af37]" />
              </span>
              <div>
                <div className="text-xs uppercase tracking-widest text-neutral-500">Telefone</div>
                <div className="text-white">{WHATSAPP_DISPLAY}</div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="w-12 h-12 rounded-full bg-[#141414] border border-[#d4af37]/40 flex items-center justify-center">
                <Mail className="w-5 h-5 text-[#d4af37]" />
              </span>
              <div>
                <div className="text-xs uppercase tracking-widest text-neutral-500">E-mail</div>
                <div className="text-white">contato@servicosjuridicos.com.br</div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="w-12 h-12 rounded-full bg-[#141414] border border-[#d4af37]/40 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-[#d4af37]" />
              </span>
              <div>
                <div className="text-xs uppercase tracking-widest text-neutral-500">Atendimento</div>
                <div className="text-white">Todo o Brasil — remoto e presencial</div>
              </div>
            </div>
          </div>
        </div>

        <form
          onSubmit={submit}
          className="lg:col-span-3 border border-[#262626] bg-[#0d0d0d] p-8 lg:p-10 rounded-sm"
          data-testid="contact-form"
        >
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <Label className="text-xs uppercase tracking-widest text-neutral-400" htmlFor="nome">
                Nome*
              </Label>
              <Input
                id="nome"
                value={form.nome}
                onChange={upd("nome")}
                placeholder="Seu nome completo"
                className="mt-2 bg-[#0a0a0a] border-[#262626] text-white placeholder:text-neutral-600 gold-ring h-12"
                data-testid="contact-input-nome"
                required
              />
            </div>
            <div>
              <Label className="text-xs uppercase tracking-widest text-neutral-400" htmlFor="telefone">
                Telefone / WhatsApp*
              </Label>
              <Input
                id="telefone"
                value={form.telefone}
                onChange={upd("telefone")}
                placeholder="(00) 00000-0000"
                className="mt-2 bg-[#0a0a0a] border-[#262626] text-white placeholder:text-neutral-600 gold-ring h-12"
                data-testid="contact-input-telefone"
                required
              />
            </div>
            <div className="sm:col-span-2">
              <Label className="text-xs uppercase tracking-widest text-neutral-400" htmlFor="email">
                E-mail
              </Label>
              <Input
                id="email"
                type="email"
                value={form.email}
                onChange={upd("email")}
                placeholder="seu@email.com"
                className="mt-2 bg-[#0a0a0a] border-[#262626] text-white placeholder:text-neutral-600 gold-ring h-12"
                data-testid="contact-input-email"
              />
            </div>
            <div className="sm:col-span-2">
              <Label className="text-xs uppercase tracking-widest text-neutral-400">
                Serviço de interesse*
              </Label>
              <Select value={form.servico} onValueChange={(v) => setForm((f) => ({ ...f, servico: v }))}>
                <SelectTrigger
                  className="mt-2 bg-[#0a0a0a] border-[#262626] text-white h-12 gold-ring"
                  data-testid="contact-select-servico"
                >
                  <SelectValue placeholder="Selecione um serviço" />
                </SelectTrigger>
                <SelectContent className="bg-[#0a0a0a] border-[#262626] text-white max-h-72">
                  {SERVICES.map((s) => (
                    <SelectItem
                      key={s.id}
                      value={s.title}
                      className="focus:bg-[#141414] focus:text-[#d4af37]"
                      data-testid={`contact-servico-opt-${s.id}`}
                    >
                      {s.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="sm:col-span-2">
              <Label className="text-xs uppercase tracking-widest text-neutral-400" htmlFor="mensagem">
                Mensagem
              </Label>
              <Textarea
                id="mensagem"
                value={form.mensagem}
                onChange={upd("mensagem")}
                placeholder="Conte brevemente sua situação..."
                rows={4}
                className="mt-2 bg-[#0a0a0a] border-[#262626] text-white placeholder:text-neutral-600 gold-ring resize-none"
                data-testid="contact-input-mensagem"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="gold-btn rounded-full px-8 py-4 mt-8 inline-flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            data-testid="contact-submit"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Enviando...
              </>
            ) : (
              <>
                Enviar e falar no WhatsApp <Send className="w-4 h-4" />
              </>
            )}
          </button>

          <p className="text-xs text-neutral-500 mt-4">
            Seus dados são tratados com sigilo profissional (LGPD).
          </p>
        </form>
      </div>
    </section>
  );
};

export default Contact;
