export default function WhyChooseHorizons() {
    const features = [
      {
        title: "Curated Fleet",
        description:
          "Every houseboat is personally selected for its comfort, authenticity and exceptional hospitality.",
      },
      {
        title: "Local Expertise",
        description:
          "Crafted by a Kerala-based team with deep knowledge of Kerala's backwaters and local experiences.",
      },
      {
        title: "Transparent Pricing",
        description:
          "Clear pricing with no hidden charges, giving you complete confidence before you book.",
      },
      {
        title: "Dedicated Concierge",
        description:
          "From your first enquiry to the end of your stay, our team is here whenever you need us.",
      },
    ];
  
    return (
      <section className="bg-[#F8F7F3] py-20 md:py-36">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-20">
            {/* Left Column */}
            <div className="h-fit lg:sticky lg:top-32 lg:col-span-5">
              <p className="text-[13px] font-medium uppercase tracking-[0.35em] text-[#7A8250]">
                Why HORIZONS
              </p>
  
              <h2 className="mt-4 font-cormorant text-[28px] leading-[1.12] tracking-[-0.01em] text-neutral-900 sm:mt-5 sm:text-[38px] lg:text-[52px] lg:leading-[1.08] lg:tracking-[-0.03em] xl:text-[56px]">
                Curated with care,
                <br />
                designed for
                <br />
                unforgettable journeys.
              </h2>
  
              <p className="mt-4 max-w-md text-[15px] leading-7 text-neutral-600 sm:mt-8 sm:text-lg sm:leading-8">
                Every houseboat featured on HORIZONS is personally selected for
                its hospitality, comfort and authenticity, ensuring every journey
                across Kerala&apos;s backwaters feels effortless from beginning to
                end.
              </p>
            </div>
  
            {/* Right Column */}
            <div className="lg:col-span-7">
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className={`group py-8 transition-all duration-300 hover:pl-2 md:py-10 ${
                    index !== 0
                      ? "border-t border-neutral-400/60"
                      : ""
                  }`}
                >
                  <div className="grid grid-cols-1 items-start gap-3 md:grid-cols-12 md:gap-8">
                    {/* Title */}
                    <div className="md:col-span-5">
                      <span className="text-sm uppercase tracking-[0.25em] text-[#7A8250]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
  
                      <h3 className="mt-3 font-cormorant text-[26px] leading-tight text-neutral-900 transition-colors duration-300 group-hover:text-[#7A8250] md:text-[36px]">
                        {feature.title}
                      </h3>
                    </div>
  
                    {/* Description */}
                    <div className="md:col-span-7">
                      <p className="max-w-lg text-[15px] leading-7 text-neutral-600 sm:text-lg sm:leading-8">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
  
              <div className="border-t border-neutral-400/60" />
            </div>
          </div>
        </div>
      </section>
    );
  }