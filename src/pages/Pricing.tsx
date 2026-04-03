import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { GradientButton } from "@/components/ui/gradient-button";
import { CheckCircle2, ArrowRight } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "रु 0",
    period: "Forever",
    features: ["3 images per day", "Standard quality", "PNG download", "Community support"],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Pro",
    price: "रु 299",
    period: "/month",
    features: ["100 images per month", "HD quality", "Priority processing", "PNG download", "Email support"],
    cta: "Pay with eSewa",
    popular: true,
  },
  {
    name: "Business",
    price: "रु 799",
    period: "/month",
    features: ["Unlimited images", "Ultra HD quality", "Priority processing", "Batch processing", "API access", "Dedicated support"],
    cta: "Pay with eSewa",
    popular: false,
  },
];

const Pricing = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Choose Your <span className="gradient-text">Plan</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Start free, upgrade anytime. Pay securely with eSewa.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`glass-card p-8 relative flex flex-col ${
                  plan.popular ? "gradient-border glow-effect" : ""
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 text-xs font-bold rounded-full bg-gradient-to-r from-fuchsia-600 to-blue-600">
                    MOST POPULAR
                  </span>
                )}
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <p className="text-4xl font-extrabold mb-1">
                  {plan.price}
                  <span className="text-base font-normal text-muted-foreground">{plan.period !== "Forever" ? plan.period : ""}</span>
                </p>
                {plan.period === "Forever" && <p className="text-sm text-muted-foreground mb-6">Forever free</p>}
                {plan.period !== "Forever" && <p className="text-sm text-muted-foreground mb-6">Billed monthly</p>}
                <ul className="space-y-3 text-sm mb-8 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-success shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link to={plan.popular ? "#" : "/editor"}>
                  <GradientButton
                    variant={plan.popular ? "gradient" : "outline"}
                    className="w-full"
                  >
                    {plan.cta} {plan.popular && <ArrowRight className="ml-2 w-4 h-4" />}
                  </GradientButton>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Pricing;
