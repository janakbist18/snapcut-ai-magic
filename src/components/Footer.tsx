import logo from "@/assets/logo.png";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t border-border/50 bg-background/80 py-12">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <img src={logo} alt="SnapErase" className="h-8 w-8 rounded-lg" />
            <span className="font-bold">SnapErase <span className="gradient-text">AI</span></span>
          </div>
          <p className="text-sm text-muted-foreground">
            Remove backgrounds instantly with AI. Fast, simple, and beautiful.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Product</h4>
          <div className="space-y-2 text-sm text-muted-foreground">
            <Link to="/editor" className="block hover:text-foreground transition-colors">Editor</Link>
            <Link to="/pricing" className="block hover:text-foreground transition-colors">Pricing</Link>
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Company</h4>
          <div className="space-y-2 text-sm text-muted-foreground">
            <a href="#" className="block hover:text-foreground transition-colors">About</a>
            <a href="#" className="block hover:text-foreground transition-colors">Contact</a>
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Legal</h4>
          <div className="space-y-2 text-sm text-muted-foreground">
            <Link to="/privacy-policy" className="block hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link to="/terms-conditions" className="block hover:text-foreground transition-colors">Terms & Conditions</Link>
            <Link to="/refund-cancellation" className="block hover:text-foreground transition-colors">Refund & Cancellation</Link>
            <Link to="/shipping-delivery" className="block hover:text-foreground transition-colors">Shipping & Delivery</Link>
            <Link to="/contact-us" className="block hover:text-foreground transition-colors">Contact Us</Link>
          </div>
        </div>
      </div>
      <div className="mt-8 pt-8 border-t border-border/50 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} SnapCut AI Magic. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
