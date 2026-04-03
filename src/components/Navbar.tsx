import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="SnapCut AI" className="h-8 w-8 rounded-lg" />
          <span className="text-lg font-bold">
            SnapCut <span className="gradient-text">AI</span>
          </span>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <Link to="/#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</Link>
          <Link to="/pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Pricing</Link>
          <Link to="/editor" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Editor</Link>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/login" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Log in</Link>
          <Link
            to="/register"
            className="text-sm font-semibold px-4 py-2 rounded-xl bg-gradient-to-r from-fuchsia-600 via-violet-600 to-blue-600 text-foreground hover:scale-105 transition-transform"
          >
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
