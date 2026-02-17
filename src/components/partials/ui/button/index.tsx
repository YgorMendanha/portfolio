"use client";

import Link from "next/link";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

type ButtonProps = {
  href?: string;
  target?: string;
  variant?: "primary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  href,
  variant = "primary",
  size = "md",
  icon,
  target,
  children,
  className,
  ...props
}: ButtonProps) {
  
  // Base: Adicionei transição suave e removi o hover:opacity-95 em favor de cores mais sólidas
  const base = "inline-flex items-center justify-center gap-2 rounded-xl font-bold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 active:scale-95 disabled:opacity-50 disabled:pointer-events-none";

  const variants = {
    // Primary: Ciano vibrante (Chama atenção imediata)
    primary: "bg-cyan-light text-black-purple shadow-[0_0_20px_rgba(0,194,255,0.2)] hover:shadow-[0_0_25px_rgba(0,194,255,0.4)] hover:-translate-y-0.5",
    
    // Ghost: Totalmente integrado ao fundo escuro
    ghost: "bg-white/5 text-white border border-white/10 hover:bg-white/10 hover:border-white/20",
    
    // Outline: Para ações secundárias com cor da marca
    outline: "bg-transparent border-2 border-purple-bright text-white hover:bg-purple-bright/10"
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const classes = twMerge(
    clsx(base, variants[variant], sizes[size], className)
  );

  const content = (
    <>
      {children}
      {icon && <span className="transition-transform group-hover:translate-x-1">{icon}</span>}
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        target={target}
        rel={target === "_blank" ? "noopener noreferrer" : undefined}
        className={classes}
      >
        {content}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {content}
    </button>
  );
}