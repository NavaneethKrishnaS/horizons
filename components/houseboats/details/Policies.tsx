import { ShieldCheck } from "lucide-react";

import { Houseboat } from "@/data/houseboat.types";

interface PoliciesProps {
  houseboat: Houseboat;
}

export default function Policies({ houseboat }: PoliciesProps) {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <p className="text-sm uppercase tracking-[0.35em] text-neutral-500">
            Policies
          </p>

          <h2 className="mt-4 text-5xl font-light text-neutral-900">
            Important Information
          </h2>

          <p className="mt-6 text-lg leading-8 text-neutral-600">
            Please review the following policies before your journey.
          </p>
        </div>

        <div className="mt-12 grid gap-5">
          {houseboat.policies.map((policy) => (
            <div
              key={policy}
              className="flex items-start gap-5 rounded-3xl border border-neutral-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-neutral-900 text-white">
                <ShieldCheck size={18} strokeWidth={2.25} />
              </div>

              <p className="flex-1 pt-1 text-lg leading-8 text-neutral-700">
                {policy}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}