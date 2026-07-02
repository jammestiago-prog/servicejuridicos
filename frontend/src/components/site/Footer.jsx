import { Scale } from "lucide-react";
import { WHATSAPP_DISPLAY } from "@/data/services";

export const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer
      data-testid="site-footer"
      className="bg-[#050505] border-t border-[#1a1a1a] py-14"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 grid md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-10 h-10 rounded-full border border-[#d4af37]/50 flex items-center justify-center bg-[#141414]">
              <Scale className="w-5 h-5 text-[#d4af37]" />
            </span>
            <span className="font-serif-lux text-xl gold-text">
              Serviços Jurídicos & Consultoria de Crédito
            </span>
          </div>
          <p className="text-neutral-500 text-sm leading-relaxed max-w-md">
            Escritório especializado em direito bancário, revisional de contratos,
            limpeza de nome, redução de dívidas e planejamento tributário para PF, PJ e Agro.
          </p>
        </div>

        <div>
          <div className="text-xs uppercase tracking-widest text-[#d4af37] mb-4">Institucional</div>
          <ul className="space-y-2 text-sm text-neutral-400">
            <li><a href="#sobre" className="hover:text-[#d4af37] transition">Sobre nós</a></li>
            <li><a href="#servicos" className="hover:text-[#d4af37] transition">Serviços</a></li>
            <li><a href="#faq" className="hover:text-[#d4af37] transition">Dúvidas</a></li>
            <li><a href="#contato" className="hover:text-[#d4af37] transition">Contato</a></li>
          </ul>
        </div>

        <div>
          <div className="text-xs uppercase tracking-widest text-[#d4af37] mb-4">Contato</div>
          <ul className="space-y-2 text-sm text-neutral-400">
            <li>{WHATSAPP_DISPLAY}</li>
            <li>contato@servicosjuridicos.com.br</li>
            <li>Atendimento em todo o Brasil</li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 mt-12 pt-8 border-t border-[#1a1a1a] flex flex-col md:flex-row justify-between gap-4">
        <p className="text-xs text-neutral-600">
          © {year} Serviços Jurídicos & Consultoria de Crédito. Todos os direitos reservados.
        </p>
        <p className="text-xs text-neutral-600">
          Advogados devidamente registrados na OAB. Este site não configura oferta de serviços conforme Provimento CFOAB 205/2021.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
