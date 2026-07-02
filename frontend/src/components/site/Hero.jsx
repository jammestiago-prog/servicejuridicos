import { ArrowRight, ShieldCheck, ChevronDown } from "lucide-react";
import { buildWhatsAppLink, defaultWhatsAppMessage } from "@/lib/whatsapp";

const HERO_IMG =
  "https://images.pexels.com/photos/6077665/pexels-photo-6077665.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=1400";

const scrollTo = (id) => (e) => {
  e.preventDefault();
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

export const Hero = () => {
  return (
    <section
      id="top"
      data-testid="hero-section"
      className="relative min-h-[100vh] pt-32 pb-24 overflow-hidden bg-[#0a0a0a]"
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.75) 45%, rgba(10,10,10,0.4) 100%), url(${HERO_IMG})`,
          backgroundSize: "cover",
          backgroundPosition: "center right",
        }}
      />
      <div className="hero-noise" aria-hidden />
      <div
        aria-hidden
        className="absolute -top-40 -right-40 w-[520px] h-[520px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(212,175,55,0.18) 0%, rgba(212,175,55,0) 65%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-8 xl:col-span-7">
          <span
            className="inline-flex items-center gap-2 text-xs tracking-[0.35em] uppercase text-[#d4af37]/90 mb-8"
            data-testid="hero-tag"
          >
            <span className="w-8 h-px bg-[#d4af37]/70" />
            Direito Bancário • Consultoria Financeira
          </span>

          <h1
            className="font-serif-lux text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-[0.95] tracking-tight text-white"
            data-testid="hero-title"
          >
            Serviços <span className="gold-text italic">Jurídicos</span>
            <br />
            e <span className="gold-text italic">Consultoria</span>
            <br />
            de Crédito
          </h1>

          <p
            className="mt-8 max-w-2xl text-lg text-neutral-300 leading-relaxed"
            data-testid="hero-subtitle"
          >
            Recupere seu poder de crédito, revise contratos abusivos, elimine
            restrições e reduza dívidas com um time especialista em direito
            bancário e reestruturação financeira para PF, PJ e Agro.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href={buildWhatsAppLink(defaultWhatsAppMessage())}
              target="_blank"
              rel="noopener noreferrer"
              className="gold-btn rounded-full px-7 py-4 text-sm inline-flex items-center gap-2"
              data-testid="hero-cta-whatsapp"
            >
              Falar com um Especialista
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#servicos"
              onClick={scrollTo("servicos")}
              className="gold-outline-btn rounded-full px-7 py-4 text-sm"
              data-testid="hero-cta-servicos"
            >
              Ver Todos os Serviços
            </a>
          </div>

          <div className="mt-14 grid grid-cols-3 gap-6 max-w-2xl">
            {[
              { k: "+10", v: "Anos de atuação" },
              { k: "+2.400", v: "Casos concluídos" },
              { k: "95%", v: "Redução de dívida" },
            ].map((s) => (
              <div key={s.v} className="border-l border-[#d4af37]/40 pl-4">
                <div className="font-serif-lux text-3xl gold-text">{s.k}</div>
                <div className="text-xs uppercase tracking-widest text-neutral-400 mt-1">
                  {s.v}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="hidden lg:flex lg:col-span-4 xl:col-span-5 justify-end">
          <div className="relative">
            <div
              className="w-[380px] h-[500px] rounded-sm border border-[#d4af37]/40 shadow-2xl"
              style={{
                backgroundImage: `url(${HERO_IMG})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <div className="absolute -bottom-8 -left-10 w-64 bg-[#0a0a0a]/95 border border-[#d4af37]/30 backdrop-blur-md px-5 py-4">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-[#d4af37]" />
                <span className="text-xs uppercase tracking-widest text-neutral-300">
                  Atendimento Sigiloso
                </span>
              </div>
              <p className="text-sm text-neutral-400 mt-2 leading-snug">
                Consulta inicial gratuita e sigilo profissional garantido.
              </p>
            </div>
          </div>
        </div>
      </div>

      <a
        href="#servicos"
        onClick={scrollTo("servicos")}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-neutral-500 hover:text-[#d4af37] transition-colors"
        data-testid="hero-scroll-indicator"
        aria-label="Descer"
      >
        <ChevronDown className="w-6 h-6 animate-bounce" />
      </a>
    </section>
  );
};

export default Hero;
