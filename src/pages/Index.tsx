import { Link } from "react-router-dom";
import { GradientButton } from "@/components/ui/gradient-button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Zap,
  Image,
  Download,
  CreditCard,
  Sparkles,
  Shield,
  ArrowRight,
  Upload,
  Wand2,
  CheckCircle2,
} from "lucide-react";

const features = [
  { icon: Zap, title: "Lightning Fast", desc: "AI removes backgrounds in under 5 seconds" },
  { icon: Image, title: "HD Quality", desc: "Crystal clear transparent PNG output" },
  { icon: Download, title: "Instant Download", desc: "Download your image with one click" },
  { icon: Shield, title: "Privacy First", desc: "Images are deleted after processing" },
  { icon: Sparkles, title: "AI Powered", desc: "State-of-the-art deep learning models" },
  { icon: CreditCard, title: "eSewa Payments", desc: "Pay easily with Nepal's eSewa" },
];

const steps = [
  { icon: Upload, title: "Upload", desc: "Drag & drop or browse your image" },
  { icon: Wand2, title: "Process", desc: "AI removes the background instantly" },
  { icon: Download, title: "Download", desc: "Get your transparent PNG image" },
];

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-fuchsia-600/5 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto text-center relative z-10 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card text-sm text-muted-foreground mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            AI-Powered Background Removal
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6">
            Remove Backgrounds{" "}
            <span className="gradient-text">in One Click</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Upload your image and get a clean, transparent background in seconds. 
            Powered by cutting-edge AI — no design skills needed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/editor">
              <GradientButton size="lg">
                Try It Free <ArrowRight className="ml-2 w-5 h-5" />
              </GradientButton>
            </Link>
            <Link to="/pricing">
              <GradientButton size="lg" variant="outline">
                View Pricing
              </GradientButton>
            </Link>
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            3 free images per day · No signup required
          </p>
        </div>
      </section>

      {/* Demo */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="glass-card p-2 glow-effect">
            <div className="relative rounded-xl overflow-hidden bg-secondary h-80 md:h-[400px] flex items-center justify-center">
              <div className="flex items-center gap-4 md:gap-8 w-full px-8">
                <div className="flex-1 rounded-xl bg-muted/30 h-56 md:h-72 flex items-center justify-center border border-border/30">
                  <div className="text-center">
                    <Image className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Original</p>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Wand2 className="w-6 h-6 text-primary animate-pulse" />
                  <ArrowRight className="w-5 h-5 text-muted-foreground" />
                </div>
                <div className="flex-1 rounded-xl h-56 md:h-72 flex items-center justify-center border border-border/30" style={{ backgroundImage: "url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"20\"><rect width=\"10\" height=\"10\" fill=\"%23222\"/><rect x=\"10\" y=\"10\" width=\"10\" height=\"10\" fill=\"%23222\"/><rect x=\"10\" width=\"10\" height=\"10\" fill=\"%23181818\"/><rect y=\"10\" width=\"10\" height=\"10\" fill=\"%23181818\"/></svg>')" }}>
                  <div className="text-center">
                    <CheckCircle2 className="w-12 h-12 text-success mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">No Background</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Why Choose <span className="gradient-text">SnapCut AI</span>?
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-xl mx-auto">
            Professional background removal made simple for everyone
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="glass-card p-6 group hover:scale-[1.02] transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-fuchsia-600/20 via-violet-600/20 to-blue-600/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <f.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            How It <span className="gradient-text">Works</span>
          </h2>
          <p className="text-center text-muted-foreground mb-12">
            Three simple steps to a perfect result
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((s, i) => (
              <div key={s.title} className="text-center group">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-fuchsia-600/20 via-violet-600/20 to-blue-600/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform relative">
                  <s.icon className="w-8 h-8 text-primary" />
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gradient-to-r from-fuchsia-600 to-blue-600 text-xs font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                </div>
                <h3 className="text-lg font-semibold mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Simple <span className="gradient-text">Pricing</span>
          </h2>
          <p className="text-center text-muted-foreground mb-12">
            Start free, upgrade when you need more
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <div className="glass-card p-8">
              <h3 className="text-xl font-bold mb-2">Free</h3>
              <p className="text-3xl font-extrabold mb-1">रु 0</p>
              <p className="text-sm text-muted-foreground mb-6">Forever</p>
              <ul className="space-y-3 text-sm mb-8">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-success" /> 3 images per day</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-success" /> Standard quality</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-success" /> PNG download</li>
              </ul>
              <Link to="/editor">
                <GradientButton variant="outline" className="w-full">Get Started</GradientButton>
              </Link>
            </div>
            <div className="glass-card p-8 gradient-border glow-effect relative">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 text-xs font-bold rounded-full bg-gradient-to-r from-fuchsia-600 to-blue-600">
                POPULAR
              </span>
              <h3 className="text-xl font-bold mb-2">Pro</h3>
              <p className="text-3xl font-extrabold mb-1">रु 299<span className="text-base font-normal text-muted-foreground">/mo</span></p>
              <p className="text-sm text-muted-foreground mb-6">Billed monthly</p>
              <ul className="space-y-3 text-sm mb-8">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-success" /> 100 images per month</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-success" /> HD quality</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-success" /> Priority processing</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-success" /> PNG download</li>
              </ul>
              <Link to="/pricing">
                <GradientButton className="w-full">Upgrade Now</GradientButton>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-3xl text-center">
          <div className="glass-card p-12 glow-effect">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Remove Backgrounds?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
              Join thousands of users who trust SnapCut AI for clean, professional results.
            </p>
            <Link to="/editor">
              <GradientButton size="lg">
                Start for Free <ArrowRight className="ml-2 w-5 h-5" />
              </GradientButton>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
