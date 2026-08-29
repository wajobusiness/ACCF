import React from "react";
import Link from "next/link";
import { ShieldCheck, HeartHandshake, Globe2, Sparkles, Award, ArrowRight } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-accf-ivory">
      {/* Hero */}
      <section className="bg-accf-charcoal text-accf-ivory py-20 px-4 sm:px-6 lg:px-8 border-b border-accf-line">
        <div className="max-w-4xl mx-auto space-y-4 text-center">
          <div className="text-xs font-mono uppercase tracking-widest text-accf-gold font-bold">
            About The Movement
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl font-semibold leading-tight">
            One Home. One Meal. <br />
            <em className="text-accf-gold italic font-normal">One Africa.</em>
          </h1>
          <p className="text-base sm:text-lg text-accf-ivory/80 max-w-2xl mx-auto leading-relaxed">
            The African Cultural Culinary Festival (ACCF) is a flagship initiative of Afrigreen &amp; Heritage Concepts Limited,
            created to promote peace, cultural preservation, food security, tourism and economic integration through Africa&apos;s rich culinary heritage.
          </p>
        </div>
      </section>

      {/* Core Mandate & Vision Pillars */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 bg-white border border-accf-line-dark rounded space-y-4 shadow-sm">
            <div className="w-12 h-12 rounded-full bg-accf-green/10 text-accf-green flex items-center justify-center">
              <HeartHandshake className="w-6 h-6 text-accf-green" />
            </div>
            <h3 className="font-serif font-bold text-xl text-accf-charcoal">
              Culinary Diplomacy &amp; Peace
            </h3>
            <p className="text-xs sm:text-sm text-accf-muted leading-relaxed">
              We believe food is the shortest route to friendship and the most profound covenant of peace. By breaking the Kolanut together, we dissolve regional divisions and forge continental fraternity.
            </p>
          </div>

          <div className="p-8 bg-white border border-accf-line-dark rounded space-y-4 shadow-sm">
            <div className="w-12 h-12 rounded-full bg-accf-gold/20 text-accf-gold flex items-center justify-center">
              <Globe2 className="w-6 h-6 text-accf-gold" />
            </div>
            <h3 className="font-serif font-bold text-xl text-accf-charcoal">
              Continental Food Sovereignty
            </h3>
            <p className="text-xs sm:text-sm text-accf-muted leading-relaxed">
              Preserving over 1,000 indigenous grains, heirloom tubers, and fermentation traditions. Connecting 300 million Africans into a self-sustaining intra-African agricultural economy.
            </p>
          </div>

          <div className="p-8 bg-white border border-accf-line-dark rounded space-y-4 shadow-sm">
            <div className="w-12 h-12 rounded-full bg-accf-maroon/10 text-accf-maroon flex items-center justify-center">
              <Award className="w-6 h-6 text-accf-maroon" />
            </div>
            <h3 className="font-serif font-bold text-xl text-accf-charcoal">
              Heritage &amp; Cultural Economy
            </h3>
            <p className="text-xs sm:text-sm text-accf-muted leading-relaxed">
              Empowering food artisans, master chefs, traditional farmers, and cultural tourism operators across 54 African countries and the global African diaspora.
            </p>
          </div>
        </div>

        {/* Narrative Section with Image */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pt-8">
          <div className="space-y-6">
            <div className="text-xs font-mono uppercase tracking-widest text-accf-maroon font-bold">
              The Symbolism of the Kolanut
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-accf-charcoal leading-tight">
              &quot;He who brings Kolanut, brings life and peace.&quot;
            </h2>
            <div className="space-y-4 text-xs sm:text-sm text-accf-muted leading-relaxed">
              <p>
                Across centuries of West, Central, and North African history, the Kolanut has served as the sacred token of welcome, reconciliation, and sovereign treaties. No major alliance was sealed, and no royal guest was received without the ceremonial breaking of the Kolanut.
              </p>
              <p>
                In the 21st century, ACCF digitizes and universalizes this noble ancient tradition. Every digital chair reserved, every leaf planted on the Kolanut Tree, and every seat taken at the 2-Kilometre Peace Table represents a personal commitment to the solidarity and flourishing of our 54 nations.
              </p>
            </div>
            <div className="pt-2">
              <Link
                href="/membership/checkout"
                className="inline-flex items-center gap-2 px-6 py-3 rounded bg-accf-green text-accf-ivory font-bold text-xs uppercase tracking-wider hover:bg-accf-green-light transition-colors"
              >
                Reserve Your Digital Chair →
              </Link>
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-accf-line-dark">
            <img
              src="https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800&auto=format&fit=crop&q=80"
              alt="African Culinary Heritage"
              className="w-full h-[450px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-accf-charcoal/80 via-transparent to-transparent p-6 flex flex-col justify-end">
              <span className="text-xs font-mono uppercase tracking-wider text-accf-gold font-bold">
                Abuja 2026 Continental Flagship
              </span>
              <span className="font-serif text-lg text-accf-ivory">
                Hosted by Afrigreen &amp; Heritage Concepts Limited
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

