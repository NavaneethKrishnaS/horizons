"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { format } from "date-fns";
import { whatsappLink } from "@/lib/whatsapp";

interface InquiryModalProps {
    isOpen: boolean;
    onClose: () => void;
  
    houseboatName: string;
    checkIn: Date;
    checkOut: Date;
  
    adults: number;
    children: number;
    infants: number;
  
    nights: number;
    selectedCategory: string;
    totalPrice: number;
  }

  export default function InquiryModal({
    isOpen,
    onClose,
    houseboatName,
    checkIn,
    checkOut,
    adults,
    children,
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

    return (
      !newErrors.fullName &&
      !newErrors.email &&
      !newErrors.phone
    );
  };

  if (!isOpen) return null;

  const totalGuests = adults + children;

  const handleContinue = () => {
    if (!validateForm()) return;

    const guestLines = [
      `${adults} Adult${adults > 1 ? "s" : ""}`,
      ...(children > 0
        ? [`${children} ${children === 1 ? "Child" : "Children"}`]
        : []),
      ...(infants > 0
        ? [`${infants} Infant${infants > 1 ? "s" : ""}`]
        : []),
    ];
    console.log("InquiryModal nights:", nights);
    const message = `Hello HORIZONS by Scenic Escapes,

I'd like to inquire about the following houseboat.

━━━━━━━━━━━━━━━━━━

🏡 Houseboat
${houseboatName}

⭐ Category
${selectedCategory}

📅 Check-in
${format(checkIn, "dd MMM yyyy")}

📅 Check-out
${format(checkOut, "dd MMM yyyy")}

🌙 Duration
${nights} Night${nights > 1 ? "s" : ""}

👥 Guests
${guestLines.join("\n")}

💰 Total Price
₹${totalPrice.toLocaleString()}

━━━━━━━━━━━━━━━━━━

Guest Details

👤 Name
${fullName}

📧 Email
${email}

📞 Phone
${phone}

🌍 Country
${country || "Not provided"}

📝 Special Requests
${specialRequests || "None"}

━━━━━━━━━━━━━━━━━━

Looking forward to your response.
Thank you!`;

    const whatsappUrl = whatsappLink(message);

    window.open(whatsappUrl, "_blank");

setFullName("");
setEmail("");
setPhone("");
setCountry("");
setSpecialRequests("");

setErrors({
  fullName: "",
  email: "",
  phone: "",
});

onClose();
  };

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

<div className="fixed inset-0 z-50 overflow-y-auto p-6">
  <div className="flex min-h-full items-center justify-center">
    <div className="my-8 flex w-full max-w-2xl max-h-[90vh] flex-col overflow-hidden rounded-[32px] bg-white shadow-2xl">
          <div className="flex items-center justify-between border-b border-neutral-200 px-8 py-6">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-neutral-500">
                Inquiry
              </p>

              <h2 className="mt-2 text-3xl font-light text-neutral-900">
                Check Availability
              </h2>
            </div>

            <button
              onClick={onClose}
              aria-label="Close inquiry"
              className="rounded-full p-2 text-neutral-600 transition hover:bg-neutral-100 hover:text-neutral-900"
            >
              <X size={22} className="text-neutral-700" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto space-y-8 p-8">
            <div className="rounded-3xl bg-neutral-50 p-6">
              <p className="text-xs uppercase tracking-[0.35em] text-neutral-500">
                Your Stay
              </p>

              <h3 className="mt-4 text-xl font-medium text-neutral-900">
                {houseboatName}
              </h3>

              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-neutral-600">Dates</span>

                  <span className="font-medium text-neutral-900">
                    {format(checkIn, "dd MMM")} –{" "}
                    {format(checkOut, "dd MMM yyyy")}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-neutral-600">Guests</span>

                  <span className="font-medium text-neutral-900">
                    {totalGuests} Guest
                    {totalGuests > 1 ? "s" : ""}
                    {infants > 0 &&
                      ` + ${infants} Infant${infants > 1 ? "s" : ""}`}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-neutral-600">Duration</span>

                  <span className="font-medium text-neutral-900">
                    {nights} Night{nights > 1 ? "s" : ""}
                  </span>
                </div>

                <div className="flex items-center justify-between border-t border-neutral-200 pt-4">
                  <span className="text-lg font-medium text-neutral-900">
                    Total
                  </span>

                  <span className="text-2xl font-light text-neutral-900">
                    ₹{totalPrice.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-neutral-700">
                Full Name *
              </label>

              <input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className={`w-full rounded-2xl border px-5 py-4 text-neutral-900 placeholder:text-neutral-500 outline-none transition focus:border-neutral-900 ${
                    errors.fullName ? "border-red-500" : "border-neutral-300"
                  }`}
                placeholder="Enter your full name"
              />

              {errors.fullName && (
                <p className="mt-2 text-sm text-red-600">{errors.fullName}</p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-neutral-700">
                Email *
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full rounded-2xl border px-5 py-4 text-neutral-900 placeholder:text-neutral-500 outline-none transition focus:border-neutral-900 ${
                    errors.fullName ? "border-red-500" : "border-neutral-300"
                  }`}
                placeholder="Enter your email address"
              />

              {errors.email && (
                <p className="mt-2 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-neutral-700">
                Phone Number *
              </label>

              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={`w-full rounded-2xl border px-5 py-4 text-neutral-900 placeholder:text-neutral-500 outline-none transition focus:border-neutral-900 ${
                    errors.fullName ? "border-red-500" : "border-neutral-300"
                  }`}
                placeholder="e.g. +91 98765 43210"
              />

              {errors.phone && (
                <p className="mt-2 text-sm text-red-600">{errors.phone}</p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-neutral-700">
                Country
              </label>

              <input
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full rounded-2xl border px-5 py-4 text-neutral-900 placeholder:text-neutral-500 outline-none transition focus:border-neutral-900"
                placeholder="e.g. India"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-neutral-700">
                Special Requests
              </label>

              <textarea
                rows={4}
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                className="w-full rounded-2xl border px-5 py-4 text-neutral-900 placeholder:text-neutral-500 outline-none transition focus:border-neutral-900"
                placeholder="Any dietary needs, celebrations, early check-in..."
              />
            </div>

            <div className="flex gap-4">
  <button
    onClick={onClose}
    className="flex-1 rounded-full border border-neutral-300 bg-white py-4 text-base font-medium text-neutral-900 transition hover:border-neutral-900 hover:bg-neutral-50"
  >
    Cancel
  </button>

  <button
    onClick={handleContinue}
    className="flex-1 rounded-full bg-neutral-900 py-4 text-base font-medium text-white transition hover:bg-black"
  >
    Continue
  </button>
</div>
          </div>
          </div>
      </div>
    </div>
    </>
  );
}