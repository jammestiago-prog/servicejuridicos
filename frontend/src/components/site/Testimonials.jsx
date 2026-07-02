import { Quote, Star } from "lucide-react";
import { useInView } from "@/hooks/useInView";

const ITEMS = [
  {
    name: "Marcelo A.",
    role: "Produtor rural — MT",
    text: "Renegociaram minha dívida com o banco e prolongaram o vencimento. Consegui manter a fazenda operando na safra.",
    tag: "Prolongamento Agro",
  },
  {
    name: "Juliana R.",
    role: "Empresária — SP",
    text: "Retiraram o meu nome do Serasa em menos de 30 dias. Recuperei crédito para comprar estoque e girar o negócio.",
    tag: "Limpa Nome",
  },
  {
    name: "Rodrigo T.",
    role: "Motorista de aplicativo — RJ",
    text: "Meu carro estava em busca e apreensão. Eles conseguiram cancelar e ainda revisaram o contrato. Voltei a trabalhar.",
    tag: "Busca e Apreensão",
  },
  {
    name: "Camila S.",
    role: "Servidora pública — MG",
    text: "Reduziram minha dívida em 89% no acordo. Atendimento respeitoso e sem enrolação, do começo ao fim.",
    tag: "Redução de Dívidas",
  },
  {
    name: "Diretor Financeiro — Indústria",
    role: "Empresa de médio porte",
    text: "O planejamento tributário aplicado à nossa operação reduziu impostos em 34% no primeiro ano. Recomendo.",
    tag: "Redução de Impostos",
  },
  {
    name: "Fernanda L.",
    role: "Consumidora — PR",
    text: "Retiraram meu nome do Jusbrasil e do Escavador. Voltei a ser encontrada por bons motivos no Google.",
    tag: "Jusbrasil / Escavador",
  },
];

const Card = ({ t, idx }) => {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={`service-card p-8 fade-up ${inView ? "in-view" : ""}`}
      style={{ transitionDelay: `${(idx % 3) * 120}ms` }}
      data-testid={`testimonial-${idx}`}
    >
      <Quote className="w-8 h-8 text-[#d4af37]/70 mb-4" />
      <p className="text-neutral-200 leading-relaxed mb-6">&ldquo;{t.text}&rdquo;</p>
      <div className="flex items-center gap-1 mb-4" aria-label="5 estrelas">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-[#d4af37] text-[#d4af37]" />
        ))}
      </div>
      <div className="flex items-center justify-between pt-4 border-t border-[#262626]">
        <div>
          <div className="text-white font-medium">{t.name}</div>
          <div className="text-xs text-neutral-500 mt-0.5">{t.role}</div>
        </div>
        <span className="text-[10px] uppercase tracking-widest text-[#d4af37]/90 border border-[#d4af37]/30 rounded-full px-3 py-1">
          {t.tag}
        </span>
      </div>
    </div>
  );
};

export const Testimonials = () => {
  return (
    <section
      id="depoimentos"
      data-testid="testimonials-section"
      className="py-24 lg:py-32 bg-[#0a0a0a] border-t border-[#1a1a1a]"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="divider-gold text-xs uppercase tracking-[0.4em]">Depoimentos</span>
          <h2
            className="font-serif-lux text-4xl sm:text-5xl lg:text-6xl text-white mt-6"
            data-testid="testimonials-title"
          >
            Histórias de quem <span className="gold-text italic">recuperou</span> o crédito
          </h2>
          <p className="text-neutral-400 mt-6 text-lg">
            Casos reais atendidos pelo nosso time. Nomes preservados por sigilo profissional.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {ITEMS.map((t, i) => (
            <Card t={t} idx={i} key={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
