import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { GradientButton } from "@/components/ui/gradient-button";
import { Link } from "react-router-dom";
import { Image, Zap, ArrowUpRight } from "lucide-react";

const Dashboard = () => {
  const credits = 3;
  const used = 1;
  const plan = "Free";

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="glass-card p-6">
              <p className="text-sm text-muted-foreground mb-1">Credits Remaining</p>
              <p className="text-3xl font-extrabold gradient-text">{credits - used}</p>
              <p className="text-xs text-muted-foreground mt-1">of {credits} daily</p>
            </div>
            <div className="glass-card p-6">
              <p className="text-sm text-muted-foreground mb-1">Images Processed</p>
              <p className="text-3xl font-extrabold">{used}</p>
              <p className="text-xs text-muted-foreground mt-1">today</p>
            </div>
            <div className="glass-card p-6">
              <p className="text-sm text-muted-foreground mb-1">Current Plan</p>
              <p className="text-3xl font-extrabold">{plan}</p>
              <Link to="/pricing" className="text-xs text-primary hover:underline flex items-center gap-1 mt-1">
                Upgrade <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          <div className="flex gap-4">
            <Link to="/editor">
              <GradientButton>
                <Image className="mr-2 w-5 h-5" /> Open Editor
              </GradientButton>
            </Link>
            <Link to="/pricing">
              <GradientButton variant="outline">
                <Zap className="mr-2 w-5 h-5" /> Get More Credits
              </GradientButton>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
