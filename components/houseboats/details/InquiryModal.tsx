"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { format } from "date-fns";

import { emailLink, whatsappLink } from "@/lib/whatsapp";

import { useScrollLock } from "@/lib/scrollLock";

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;

  houseboatName: string;
  checkIn: Date;
  checkOut: Date;

  adults: number;
  childCount: number;
  infants: number;

  nights: number;
  selectedCategory: string;
  totalPrice: number;
}

const labelClass =
  "block text-[11px] uppercase tracking-[0.18em] text-neutral-500";

const inputClass =
  "mt-2 w-full border bg-white px-4 py-3.5 text-[15px] text-neutral-900 outline-none transition-colors duration-300 placeholder:text-neutral-400 focus:border-neutral-900";

export default function InquiryModal({
  isOpen,
  onClose,
  houseboatName,
  checkIn,
  checkOut,
  adults,
  childCount,
  infants,
  nights,
  selectedCategory,
  totalPrice,
}: InquiryModalProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");

  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  useScrollLock(isOpen);

  const totalGuests = adults + childCount;

  const validateForm = () => {
    const newErrors = {
      fullName: "",
      email: "",
      phone: "",
    };

    if (!fullName.trim()) {
      newErrors.fullName = "Please enter your full name.";
    }

    if (!email.trim()) {
      newErrors.email = "Please enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!phone.trim()) {
      newErrors.phone = "Please enter your phone number.";
    } else if (!/^[0-9+\-\s()]{8,20}$/.test(phone)) {
      newErrors.phone = "Please enter a valid phone number.";
    }

    setErrors(newErrors);

    return !newErrors.fullName && !newErrors.email && !newErrors.phone;
  };

  const handleContinue = (route: "whatsapp" | "email") => {
    if (!validateForm()) return;

    const guests = [
      `${adults} Adult${adults === 1 ? "" : "s"}`,
      ...(childCount > 0
        ? [`${childCount} ${childCount === 1 ? "Child" : "Children"}`]
        : []),
      ...(infants > 0 ? [`${infants} Infant${infants === 1 ? "" : "s"}`] : []),
    ].join(", ");

    /*
      Set out as correspondence, the same as the enquiry on the contact
      page: an address, the request in a sentence, the particulars, a
      sign-off. An optional field is left out entirely rather than sent
      as "Not provided".

      No asterisks. WhatsApp reads them as bold; email prints them, and
      this same text now goes down both routes.
    */
    const lines = [
      "Dear HORIZONS,",
      "",
      `I am writing to enquire about availability on ${houseboatName}.`,
      "",
      `Category: ${selectedCategory}`,
      `Check-in: ${format(checkIn, "dd MMM yyyy")}`,
      `Check-out: ${format(checkOut, "dd MMM yyyy")}`,
      `Duration: ${nights} night${nights === 1 ? "" : "s"}`,
      `Guests: ${guests}`,
      `Estimated total: ₹${totalPrice.toLocaleString()}`,
      ...(specialRequests.trim() ? ["", specialRequests.trim()] : []),
      "",
      "I should be grateful if you could confirm availability.",
      "",
      "Kind regards,",
      fullName.trim(),
      email.trim(),
      phone.trim(),
      ...(country.trim() ? [country.trim()] : []),
      "",
      "Sent via the HORIZONS website",
    ];

    const body = lines.join("\n");

    const url =
      route === "whatsapp"
        ? whatsappLink(body)
        : emailLink(`Availability enquiry — ${houseboatName}`, body);

    /*
      A mail client takes the link in this tab on any device; it opens
      over the page rather than replacing it.

      WhatsApp on a phone takes over the tab it is opened in, so a new
      tab means the visitor comes back to a blank page with no way back
      to the site. Navigate the current tab instead and let Back return
      them here. On a laptop the new tab opens alongside the site, where
      web.whatsapp.com belongs.
    */
    const isHandheld = window.matchMedia("(max-width: 1023px)").matches;

    if (route === "email" || isHandheld) {
      window.location.href = url;
    } else {
      window.open(url, "_blank", "noopener");
    }

    setFullName("");
    setEmail("");
    setPhone("");
    setCountry("");
    setSpecialRequests("");

    setErrors({ fullName: "", email: "", phone: "" });

    onClose();
  };

  const summary: { label: string; value: string }[] = [
    { label: "Houseboat", value: houseboatName },
    { label: "Category", value: selectedCategory },
    {
      label: "Dates",
      value: `${format(checkIn, "dd MMM")} – ${format(checkOut, "dd MMM yyyy")}`,
    },
    { label: "Duration", value: `${nights} Night${nights === 1 ? "" : "s"}` },
    {
      label: "Guests",
      value: `${totalGuests} Guest${totalGuests === 1 ? "" : "s"}${
        infants > 0 ? ` · ${infants} Infant${infants === 1 ? "" : "s"}` : ""
      }`,
    },
  ];

  /*
    Portalled to <body>. The booking card sits inside a `sticky` wrapper, and
    position: sticky creates a stacking context — which trapped this overlay
    below the fixed navbar no matter how high its z-index went.
  */
  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          className="fixed inset-0 z-[1000] overflow-y-auto bg-black/50 p-0 backdrop-blur-sm md:p-6"
        >
          <div className="flex min-h-full items-end justify-center md:items-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 24 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(event) => event.stopPropagation()}
              className="flex max-h-[92vh] w-full max-w-2xl flex-col border border-neutral-200 bg-white md:max-h-[88vh]"
            >
              <div className="flex items-start justify-between border-b border-neutral-200 px-6 py-5 md:px-9 md:py-7">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.3em] text-neutral-500">
                    Enquiry
                  </p>

                  <h2 className="mt-2 font-cormorant text-[28px] font-light leading-none text-neutral-900 md:text-[34px]">
                    Check Availability
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close enquiry"
                  className="-mr-2 -mt-1 flex h-10 w-10 shrink-0 items-center justify-center text-neutral-900 transition-colors duration-300 hover:text-[#6B7341]"
                >
                  <X size={20} strokeWidth={1.5} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-7 md:px-9 md:py-9">
                {/* Your stay */}
                <div className="border border-neutral-200 px-5 py-5 md:px-6">
                  <p className="text-[11px] uppercase tracking-[0.3em] text-neutral-500">
                    Your Stay
                  </p>

                  <dl className="mt-5 space-y-3">
                    {summary.map((row) => (
                      <div
                        key={row.label}
                        className="flex items-baseline justify-between gap-6 text-[14px]"
                      >
                        <dt className="text-neutral-500">{row.label}</dt>

                        <dd className="text-right text-neutral-900 lining-nums">
                          {row.value}
                        </dd>
                      </div>
                    ))}
                  </dl>

                  <div className="mt-5 flex items-baseline justify-between border-t border-neutral-200 pt-5">
                    <span className="text-[11px] uppercase tracking-[0.25em] text-neutral-500">
                      Estimated Total
                    </span>

                    <span className="text-[24px] font-light leading-none text-neutral-900 lining-nums tabular-nums">
                      ₹{totalPrice.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Guest details */}
                <p className="mt-9 text-[11px] uppercase tracking-[0.3em] text-neutral-500">
                  Your Details
                </p>

                <div className="mt-5 grid gap-5 md:grid-cols-2">
                  <div>
                    <label htmlFor="inquiry-name" className={labelClass}>
                      Full Name <span className="text-[#6B7341]">*</span>
                    </label>

                    <input
                      id="inquiry-name"
                      value={fullName}
                      onChange={(event) => setFullName(event.target.value)}
                      placeholder="Your full name"
                      className={`${inputClass} ${
                        errors.fullName ? "border-red-400" : "border-neutral-200"
                      }`}
                    />

                    {errors.fullName && (
                      <p className="mt-2 text-[12px] text-red-500">
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="inquiry-email" className={labelClass}>
                      Email <span className="text-[#6B7341]">*</span>
                    </label>

                    <input
                      id="inquiry-email"
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="name@example.com"
                      className={`${inputClass} ${
                        errors.email ? "border-red-400" : "border-neutral-200"
                      }`}
                    />

                    {errors.email && (
                      <p className="mt-2 text-[12px] text-red-500">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="inquiry-phone" className={labelClass}>
                      Phone <span className="text-[#6B7341]">*</span>
                    </label>

                    <input
                      id="inquiry-phone"
                      type="tel"
                      value={phone}
                      onChange={(event) => setPhone(event.target.value)}
                      placeholder="+91 98765 43210"
                      className={`${inputClass} ${
                        errors.phone ? "border-red-400" : "border-neutral-200"
                      }`}
                    />

                    {errors.phone && (
                      <p className="mt-2 text-[12px] text-red-500">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="inquiry-country" className={labelClass}>
                      Country
                    </label>

                    <input
                      id="inquiry-country"
                      value={country}
                      onChange={(event) => setCountry(event.target.value)}
                      placeholder="Optional"
                      className={`${inputClass} border-neutral-200`}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="inquiry-requests" className={labelClass}>
                      Special Requests
                    </label>

                    <textarea
                      id="inquiry-requests"
                      rows={3}
                      value={specialRequests}
                      onChange={(event) =>
                        setSpecialRequests(event.target.value)
                      }
                      placeholder="Dietary needs, a celebration, an early check-in"
                      className={`${inputClass} resize-none border-neutral-200`}
                    />
                  </div>
                </div>
              </div>

              {/*
                Two ways to send it, drawn the same and weighted the
                same. WhatsApp is close to universal for our Indian and
                European guests and close to absent for some of the
                British and American ones, so neither can be the real
                button with the other offered as a consolation. Cancel
                steps back to plain text underneath, where a way out
                belongs.
              */}
              <div className="border-t border-neutral-200 px-6 py-5 md:px-9">
                <div className="grid gap-3 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={() => handleContinue("whatsapp")}
                    className="w-full bg-neutral-900 py-4 text-[12px] uppercase tracking-[0.25em] text-white transition-colors duration-300 hover:bg-black"
                  >
                    Send on WhatsApp
                  </button>

                  <button
                    type="button"
                    onClick={() => handleContinue("email")}
                    className="w-full bg-neutral-900 py-4 text-[12px] uppercase tracking-[0.25em] text-white transition-colors duration-300 hover:bg-black"
                  >
                    Send by email
                  </button>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  className="mt-4 w-full py-1 text-[12px] uppercase tracking-[0.25em] text-neutral-500 transition-colors duration-300 hover:text-neutral-900"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
