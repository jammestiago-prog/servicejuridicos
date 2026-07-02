import { CheckCircle2, Award, Users2, Scale } from "lucide-react";
import { buildWhatsAppLink, defaultWhatsAppMessage } from "@/lib/whatsapp";
import { useInView } from "@/hooks/useInView";

const IMG =
  "https://images.unsplash.com/photo-1479142506502-19b3a3b7ff33?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200";

const PILLARS = [
  { icon: Scale, title: "Direito Bancário", text: "Especialização em revisões de contratos, cédulas e teses contra instituições financeiras." },
  { icon: Award, title: "Resultado Comprovado", text: "Mais de R$ 50 milhões recuperados ou economizados para nossos clientes." },
  { icon: Users2, title: "Atendimento Humano", text: "Cada caso é acompanhado individualmente, com transparência do início ao fim." },
];

const BULLETS = [
  "Advogados registrados na OAB",
  "Atendimento em todo Brasil",
  "Consulta inicial gratuita e sigilosa",
  "Honorários flexíveis e transparentes",
];

export const About = () => {
  const [ref, inView] = useInView();
  return (
    <section
      id="sobre"
      data-testid="about-section"
      className="relative py-24 lg:py-32 bg-[#0d0d0d]"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-14 items-center">
        <div className={`relative fade-up ${inView ? "in-view" : ""}`} ref={ref}>
          <div
            className="w-full aspect-[4/5] rounded-sm border border-[#d4af37]/30"
            style={{
              backgroundImage: `linear-gradient(180deg, rgba(10,10,10,0.15), rgba(10,10,10,0.6)), url(${IMG})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            data-testid="about-image"
          />
          <div className="absolute -bottom-8 -right-8 hidden md:block bg-[#0a0a0a] border border-[#d4af37]/40 px-8 py-6">
            <div className="font-serif-lux text-5xl gold-text">+10</div>
            <div className="text-xs uppercase tracking-widest text-neutral-400 mt-1">
              Anos de Experiência
            </div>
          </div>
        </div>

        <div>
          <span className="divider-gold text-xs uppercase tracking-[0.4em]">
            Sobre Nós
          </span>
          <h2
            className="font-serif-lux text-4xl sm:text-5xl lg:text-6xl text-white mt-6 leading-tight"
            data-testid="about-title"
          >
            Autoridade em <span className="gold-text italic">direito bancário</span> e reestruturação financeira
          </h2>
          <p className="text-neutral-400 mt-6 text-lg leading-relaxed">
            Somos um escritório especializado em direito bancário e consultoria de
            crédito. Atuamos ao lado de pessoas, empresas e produtores rurais que
            enfrentam contratos abusivos, restrições financeiras e disputas com
            bancos — sempre com estratégia, discrição e resultado.
          </p>

          <div className="grid sm:grid-cols-2 gap-4 mt-8" data-testid="about-bullets">
            {BULLETS.map((b) => (
              <div key={b} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#d4af37] mt-0.5 shrink-0" />
                <span className="text-neutral-300 text-sm">{b}</span>
              </div>
            ))}
          </div>

          <div className="mt-10 grid sm:grid-cols-3 gap-6">
            {PILLARS.map((p) => (
              <div
                key={p.title}
                className="p-5 border border-[#262626] hover:border-[#d4af37]/40 transition-colors bg-[#0a0a0a]"
                data-testid={`about-pillar-${p.title.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <p.icon className="w-6 h-6 text-[#d4af37] mb-3" />
                <div className="text-white font-medium mb-1">{p.title}</div>
                <p className="text-xs text-neutral-500 leading-relaxed">{p.text}</p>
              </div>
            ))}
          </div>

          <a
            href={buildWhatsAppLink(defaultWhatsAppMessage())}
            target="_blank"
            rel="noopener noreferrer"
            className="gold-btn rounded-full px-7 py-3.5 text-sm mt-10 inline-block"
            data-testid="about-cta"
          >
            Agendar Consulta Gratuita
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;
