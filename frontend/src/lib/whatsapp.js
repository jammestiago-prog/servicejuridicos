import { WHATSAPP_NUMBER } from "@/data/services";

export const buildWhatsAppLink = (message) => {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
};

export const defaultWhatsAppMessage = (servico) => {
  if (servico) {
    return `Olá! Tenho interesse no serviço: ${servico}. Poderia me atender?`;
  }
  return "Olá! Gostaria de saber mais sobre os Serviços Jurídicos e a Consultoria de Crédito.";
};
