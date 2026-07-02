import { useEffect, useState } from "react";
import { Menu, X, Scale } from "lucide-react";
import { buildWhatsAppLink, defaultWhatsAppMessage } from "@/lib/whatsapp";

const NAV = [
  { id: "servicos", label: "Serviços" },
  { id: "sobre", label: "Sobre" },
  { id: "depoimentos", label: "Depoimentos" },
  { id: "faq", label: "Dúvidas" },
  { id: "contato", label: "Contato" },
];

export const Header = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id) => (e) => {
    e.preventDefault();
    setOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header
      data-testid="site-header"
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
        scrolled ? "bg-[#0a0a0a]/85 backdrop-blur-xl border-b border-[#262626]" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
        <a href="#top" onClick={go("top")} className="flex items-center gap-3" data-testid="header-logo">
          <span className="w-10 h-10 rounded-full border border-[#d4af37]/50 flex items-center justify-center bg-[#141414]">
            <Scale className="w-5 h-5 text-[#d4af37]" />
          </span>
          <span className="hidden sm:flex flex-col leading-none">
            <span className="font-serif-lux text-xl gold-text">Serviços Jurídicos</span>
            <span className="text-[10px] tracking-[0.3em] uppercase text-neutral-400 mt-1">
              & Consultoria de Crédito
            </span>
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-9">
          {NAV.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              onClick={go(n.id)}
              className="text-sm text-neutral-300 hover:text-[#d4af37] transition-colors tracking-wide"
              data-testid={`nav-${n.id}`}
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex items-center">
          <a
            href={buildWhatsAppLink(defaultWhatsAppMessage())}
            target="_blank"
            rel="noopener noreferrer"
            className="gold-btn rounded-full px-5 py-2.5 text-sm"
            data-testid="header-cta-whatsapp"
          >
            Falar no WhatsApp
          </a>
        </div>

        <button
          className="lg:hidden text-[#d4af37]"
          onClick={() => setOpen((v) => !v)}
          data-testid="header-menu-toggle"
          aria-label="Abrir menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-[#0a0a0a]/95 backdrop-blur-xl border-t border-[#262626]" data-testid="mobile-menu">
          <div className="px-6 py-6 flex flex-col gap-4">
            {NAV.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                onClick={go(n.id)}
                className="text-neutral-200 hover:text-[#d4af37] py-2 border-b border-[#1f1f1f]"
                data-testid={`mobile-nav-${n.id}`}
              >
                {n.label}
              </a>
            ))}
            <a
              href={buildWhatsAppLink(defaultWhatsAppMessage())}
              target="_blank"
              rel="noopener noreferrer"
              className="gold-btn rounded-full px-5 py-3 text-sm text-center mt-2"
              data-testid="mobile-cta-whatsapp"
            >
              Falar no WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
