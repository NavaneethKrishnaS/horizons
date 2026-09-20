// Single place for the business WhatsApp number and enquiry links.
export const WHATSAPP_NUMBER = "919495050352";

export function whatsappLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
