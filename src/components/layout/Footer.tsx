import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin, Youtube, Mail, MapPin, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative border-t border-border/60 bg-card mt-24">
      <div className="absolute inset-x-0 top-0 gold-divider" />
      <div className="container-wide py-16">
        <div className="grid md:grid-cols-4 gap-12">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-gold flex items-center justify-center shadow-gold">
                <span className="font-display text-2xl font-bold text-primary-foreground">P</span>
              </div>
              <div>
                <div className="font-display text-xl text-gradient-gold">Pragathi Alumni</div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Est. 2009 Initiative</div>
              </div>
            </Link>
            <p className="mt-5 text-sm text-muted-foreground leading-relaxed">
              The official alumni network of Pragathi High School, Centenary Colony, Peddapalli — uniting generations of dreamers.
            </p>
            <div className="flex gap-3 mt-6">
              {[Facebook, Instagram, Linkedin, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social"
                  className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display text-lg text-primary mb-4">Explore</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {[
                ["Home", "/"],
                ["Alumni Directory", "/directory"],
                ["Events & Reunions", "/events"],
                ["News & Stories", "/news"],
                ["Gallery", "/gallery"],
              ].map(([label, to]) => (
                <li key={to}>
                  <Link to={to} className="hover:text-primary transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg text-primary mb-4">Engage</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {[
                ["Register Now", "/register"],
                ["Job Board", "/careers"],
                ["Give Back", "/give-back"],
                ["Contact", "/contact"],
              ].map(([label, to]) => (
                <li key={to}>
                  <Link to={to} className="hover:text-primary transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg text-primary mb-4">Reach Us</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex gap-3"><MapPin size={16} className="text-primary mt-0.5 shrink-0" /> Centenary Colony, Peddapalli, Telangana 505172</li>
              <li className="flex gap-3"><Mail size={16} className="text-primary mt-0.5 shrink-0" /> alumni@pragathischool.in</li>
              <li className="flex gap-3"><Phone size={16} className="text-primary mt-0.5 shrink-0" /> +91 98XXX XXXXX</li>
            </ul>
          </div>
        </div>

        <div className="gold-divider mt-14 mb-6" />
        <div className="flex flex-col md:flex-row gap-3 justify-between items-center text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Pragathi High School Alumni Association. All rights reserved.</p>
          <p className="font-display italic text-primary/80">Initiated with love by the Batch of 2009</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
