import { ReactNode } from "react";

interface Props {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
}

const PageHero = ({ eyebrow, title, description, children }: Props) => {
  return (
    <section className="relative pt-36 pb-16 md:pt-44 md:pb-20 overflow-hidden">
      <div className="absolute inset-0 bg-radial-gold opacity-60" />
      <div className="absolute inset-x-0 bottom-0 gold-divider" />
      <div className="container-narrow relative text-center">
        {eyebrow && (
          <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.3em] uppercase text-primary mb-5 animate-fade-in">
            <span className="w-8 h-px bg-primary/60" /> {eyebrow} <span className="w-8 h-px bg-primary/60" />
          </div>
        )}
        <h1 className="font-display text-4xl md:text-6xl font-light leading-[1.1] animate-fade-in-up">
          <span className="text-gradient-gold">{title}</span>
        </h1>
        {description && (
          <p className="mt-6 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.15s" }}>
            {description}
          </p>
        )}
        {children && <div className="mt-8 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>{children}</div>}
      </div>
    </section>
  );
};

export default PageHero;
