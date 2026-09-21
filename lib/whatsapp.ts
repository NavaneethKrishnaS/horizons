// Single place for the business contact details and enquiry links.
export const WHATSAPP_NUMBER = "919495050352";

/*
  Not everyone has WhatsApp. It is close to universal for our Indian and
  European guests and close to absent for some of our American and UK
  ones, so anywhere we offer it we offer an address beside it.
*/
export const CONTACT_EMAIL = "info@scenicescapesindia.com";

export function whatsappLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function emailLink(subject: string, body?: string) {
  const query = new URLSearchParams({ subject });

  if (body) query.set("body", body);

  return `mailto:${CONTACT_EMAIL}?${query.toString()}`;
}
