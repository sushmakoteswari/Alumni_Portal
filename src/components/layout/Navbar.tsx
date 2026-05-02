import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", label: "Home" },
  { to: "/register", label: "Register" },
  { to: "/directory", label: "Directory" },
  { to: "/events", label: "Events" },
  { to: "/news", label: "News" },
  { to: "/gallery", label: "Gallery" },
  { to: "/careers", label: "Careers" },
  { to: "/give-back", label: "Give Back" },
  { to: "/contact", label: "Contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [location.pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-background/85 backdrop-blur-md border-b border-border/60 py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="container-wide flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <img
            src="/logo.png"
            alt="Pragathi Educational Society — Centenary Colony"
            width={44}
            height={44}
            className="h-10 w-10 sm:h-11 sm:w-11 shrink-0 object-contain rounded-full ring-1 ring-border/50 shadow-elegant"
            decoding="async"
          />
          <div className="hidden sm:block">
            <div className="font-display text-lg leading-tight text-gradient-gold">Pragathi Alumni</div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Centenary Colony</div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-7">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                cn(
                  "text-sm tracking-wide gold-link transition-colors",
                  isActive ? "text-primary" : "text-foreground/80"
                )
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Link
            to="/register"
            className="px-5 py-2.5 rounded-full bg-gradient-gold text-primary-foreground text-sm font-medium shadow-gold hover:scale-105 transition-transform"
          >
            Join Network
          </Link>
        </div>

        <button
          className="lg:hidden text-foreground"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-background/95 backdrop-blur-md border-t border-border/60 mt-3 animate-fade-in">
          <nav className="container-wide py-6 flex flex-col gap-4">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                className={({ isActive }) =>
                  cn(
                    "text-base py-2 border-b border-border/40",
                    isActive ? "text-primary" : "text-foreground/85"
                  )
                }
              >
                {l.label}
              </NavLink>
            ))}
            <Link
              to="/register"
              className="mt-2 px-5 py-3 rounded-full bg-gradient-gold text-primary-foreground text-sm font-medium text-center shadow-gold"
            >
              Join Network
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
