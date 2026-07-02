import {
  Car,
  Receipt,
  FileSearch,
  Landmark,
  ShieldCheck,
  TrendingUp,
  UserMinus,
  Unlock,
  FileWarning,
  Percent,
  Tractor,
  Calculator,
  ArrowUpRight,
} from "lucide-react";
import { SERVICES } from "@/data/services";
import { buildWhatsAppLink, defaultWhatsAppMessage } from "@/lib/whatsapp";
import { useInView } from "@/hooks/useInView";

const ICONS = {
  Car,
  Receipt,
  FileSearch,
  Landmark,
  ShieldCheck,
  TrendingUp,
  UserMinus,
  Unlock,
  FileWarning,
  Percent,
  Tractor,
  Calculator,
};

const ServiceCard = ({ svc, idx }) => {
  const [ref, inView] = useInView();
  const Icon = ICONS[svc.icon] || ShieldCheck;
  return (
    <a
      ref={ref}
      href={buildWhatsAppLink(defaultWhatsAppMessage(svc.title))}
      target="_blank"
      rel="noopener noreferrer"
      className={`service-card p-8 rounded-sm block group fade-up ${inView ? "in-view" : ""}`}
      style={{ transitionDelay: `${(idx % 6) * 80}ms` }}
      data-testid={`service-card-${svc.id}`}
    >
      <div className="flex items-start justify-between mb-8">
        <span
          className="w-14 h-14 rounded-full border border-[#d4af37]/40 flex items-center justify-center bg-[#0a0a0a] group-hover:border-[#d4af37] transition-colors"
          aria-hidden
        >
          <Icon className="w-6 h-6 text-[#d4af37]" />
        </span>
        <span className="text-neutral-600 group-hover:text-[#d4af37] transition-colors">
          <ArrowUpRight className="w-5 h-5" />
        </span>
      </div>

      <h3 className="font-serif-lux text-2xl text-white leading-tight mb-3">
        {svc.title}
      </h3>
      <p className="text-sm text-neutral-400 leading-relaxed">{svc.short}</p>

      <div className="mt-6 pt-5 border-t border-[#262626] flex items-center justify-between">
        <span className="text-xs uppercase tracking-widest text-[#d4af37]/90">
          Consultar
        </span>
        <span className="text-xs text-neutral-500">Nº {String(idx + 1).padStart(2, "0")}</span>
      </div>
    </a>
  );
};

export const Services = () => {
  return (
    <section
      id="servicos"
      data-testid="services-section"
      className="relative py-24 lg:py-32 bg-[#0a0a0a] border-t border-[#1a1a1a]"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="max-w-3xl mb-16">
          <span className="divider-gold text-xs uppercase tracking-[0.4em]">
            Nossos Serviços
          </span>
          <h2
            className="font-serif-lux text-4xl sm:text-5xl lg:text-6xl text-white mt-6 leading-tight"
            data-testid="services-title"
          >
            Soluções <span className="gold-text italic">jurídicas</span> e
            financeiras completas
          </h2>
          <p className="text-neutral-400 mt-6 text-lg leading-relaxed">
            Do cancelamento de busca e apreensão à redução tributária empresarial —
            um portfólio pensado para devolver liberdade financeira a Pessoas
            Físicas, Jurídicas e Produtores Rurais.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8" data-testid="services-grid">
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.id} svc={s} idx={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
