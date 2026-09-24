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

/*
  Encoded by hand rather than with URLSearchParams, which writes a space
  as "+". That is correct for a form post and wrong for a mailto: mail
  clients read the query per RFC 3986, where "+" is a literal plus — so
  "Two weeks in February" arrived in the compose window as
  "Two+weeks+in+February". encodeURIComponent writes %20, which every
  client reads back as a space.
*/
export function emailLink(subject: string, body?: string) {
  const query = [`subject=${encodeURIComponent(subject)}`];

  if (body) query.push(`body=${encodeURIComponent(body)}`);

  return `mailto:${CONTACT_EMAIL}?${query.join("&")}`;
}
