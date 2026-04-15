import { useCallback } from "react";
import { Link } from "react-router-dom";
import { TrendingUp, AlertCircle, MessageSquarePlus } from "lucide-react";
import { useRevealOnScroll } from "../../shared/hooks/useRevealOnScroll";
import { Footer } from "../../shared/component/Footer";
import { Navigation } from "../../shared/component/Navigation";

function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-700 py-20 sm:py-24 md:py-28">
      
      <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-blue-400 opacity-30 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-indigo-500 opacity-30 blur-3xl" />

      <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        
        <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
          Predict Regret, Make Smarter Decisions
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-base text-blue-100 sm:text-lg md:text-xl">
          Leverage AI-powered regret prediction and real-time decision feedback
          to avoid future disappointment. Analyze potential outcomes, understand
          emotional impact, and make choices you won’t regret.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link to="/dashboard" className="rounded-xl bg-white px-6 py-3 text-sm font-semibold text-blue-600 shadow-md transition hover:scale-105 hover:bg-gray-100">
            Start Predicting →
          </Link>


        </div>
      </div>
    </section>
  );
}


const FEATURES = [
  {
    id: "prediction",
    title: "Decision prediction",
    description:
      "Predict the outcomes of your decisions before you make them.",
    image:
      "https://images.unsplash.com/photo-1717501219621-7b860d789a2e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80",
    gradient: "from-blue-500 to-cyan-500",
    Icon: TrendingUp,
  },
  {
    id: "regret",
    title: "Regret analysis",
    description:
      "Understand emotional and psychological impact to minimize future regret.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80",
    gradient: "from-purple-500 to-pink-500",
    Icon: AlertCircle,
  },
  {
    id: "feedback",
    title: "Decision feedback",
    description:
      "Get real-time insights and recommendations to refine your choices.",
    image:
      "https://images.unsplash.com/photo-1758873268174-1f1d6a919a2c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80",
    gradient: "from-orange-500 to-red-500",
    Icon: MessageSquarePlus,
  },
];

const STATS = [
  { value: "50K+", label: "Users satisfied" },
  { value: "95%", label: "Regret avoided" },
  { value: "100K+", label: "Predictions made" },
  { value: "24/7", label: "Live support" },
];


function FeatureCard({ title, description, image, gradient, Icon }) {
  const handleImageError = useCallback((e) => {
    e.currentTarget.style.opacity = "0";
  }, []);

  return (
    <article
      data-reveal
      className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
    >
      <div className="relative h-44 overflow-hidden sm:h-48">
        <img
          src={image}
          alt={title}
          loading="lazy"
          onError={handleImageError}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-60`} />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-xl">
            <Icon className="h-7 w-7 text-gray-900" />
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </article>
  );
}

function StatCard({ value, label }) {
  return (
    <div
      data-reveal
      className="rounded-xl border border-gray-100 bg-white p-5 text-center shadow-md transition hover:-translate-y-1 hover:shadow-lg"
    >
      <p className="text-2xl font-bold text-blue-600 sm:text-3xl md:text-4xl">
        {value}
      </p>
      <p className="mt-1 text-xs text-gray-500 sm:text-sm">{label}</p>
    </div>
  );
}


export function Home() {
  const cardsRef = useRevealOnScroll();
  const statsRef = useRevealOnScroll();

  return (
<div className="relative overflow-x-hidden overflow-y-hidden">
        <Navigation />

      {/* HERO */}
      <Hero />

      {/* Reveal Animation */}
      <style>{`
        [data-reveal] {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.5s ease, transform 0.5s ease;
        }
        [data-reveal].reveal-visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>

      {/* FEATURES */}
      <section className="bg-gradient-to-b from-white to-gray-50 py-14 sm:py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <header className="mb-12 text-center md:mb-16">
            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
              Core features for regret-free decisions
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-gray-600">
              Comprehensive tools to predict and optimize decisions
            </p>
          </header>

          <div
            ref={cardsRef}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {FEATURES.map((feature) => (
              <FeatureCard key={feature.id} {...feature} />
            ))}
          </div>

          <div
            ref={statsRef}
            className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-4"
          >
            {STATS.map((stat) => (
              <StatCard key={stat.label} {...stat} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}