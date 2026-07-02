import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ_ITEMS = [
  {
    q: "Vocês atendem em todo o Brasil?",
    a: "Sim. Nosso atendimento é feito de forma remota (WhatsApp, e-mail, vídeo) e presencial quando necessário, com atuação em todos os estados via processos eletrônicos.",
  },
  {
    q: "Quanto tempo leva um processo de revisional de contrato?",
    a: "Depende da complexidade e da instituição envolvida. Muitos casos são resolvidos em acordo em 30 a 90 dias. Ações judiciais podem levar mais tempo — te informamos o prazo estimado no primeiro atendimento.",
  },
  {
    q: "É possível reduzir dívidas mesmo estando negativado?",
    a: "Sim. A negativação, na verdade, aumenta o poder de negociação com o credor. Já reduzimos dívidas em até 95% em acordos e ações judiciais.",
  },
  {
    q: "Como funciona o Limpa Nome?",
    a: "Analisamos suas restrições em Serasa, SPC, SCR/Bacen, Jusbrasil e Escavador e aplicamos a medida jurídica correta para cada apontamento (notificação, negociação ou ação).",
  },
  {
    q: "Quanto custa uma consulta?",
    a: "A primeira consulta é gratuita e sigilosa. Só após o diagnóstico do seu caso definimos honorários — sempre transparentes, e com opções flexíveis.",
  },
  {
    q: "Vocês atendem produtores rurais e cooperativados?",
    a: "Sim. Temos atuação forte em Direito do Agronegócio, com prolongamento de dívidas, revisão de cédulas rurais e negociações com bancos e cooperativas.",
  },
];

export const FAQ = () => {
  return (
    <section id="faq" data-testid="faq-section" className="py-24 lg:py-32 bg-[#0d0d0d] border-t border-[#1a1a1a]">
      <div className="max-w-4xl mx-auto px-6 lg:px-10">
        <div className="text-center mb-14">
          <span className="divider-gold text-xs uppercase tracking-[0.4em]">Dúvidas Frequentes</span>
          <h2
            className="font-serif-lux text-4xl sm:text-5xl lg:text-6xl text-white mt-6"
            data-testid="faq-title"
          >
            Respostas <span className="gold-text italic">diretas</span> às principais dúvidas
          </h2>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-3" data-testid="faq-accordion">
          {FAQ_ITEMS.map((item, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="border border-[#262626] bg-[#0a0a0a] rounded-sm px-6 data-[state=open]:border-[#d4af37]/40 transition-colors"
              data-testid={`faq-item-${i}`}
            >
              <AccordionTrigger className="text-left text-white hover:text-[#d4af37] font-medium text-base sm:text-lg py-5 hover:no-underline">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="text-neutral-400 leading-relaxed pb-6 text-sm sm:text-base">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;
