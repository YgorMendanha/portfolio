"use client";

import Link from "next/link";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";
type ButtonProps = {
  href?: string;
  target?: string;
  variant?: "primary" | "ghost";
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
  const base =
    "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-100 focus-visible:outline-none focus-visible:ring-2 hover:scale-101 focus-visible:ring-offset-2 active:scale-95 hover:opacity-95";

  const variants = {
    primary:
      "bg-purple-bright text-white shadow-lg focus-visible:ring-purple-bright",
    ghost:
      "bg-white border text-black-purple border-black-purple/50 hover:shadow hover:text-cyan-light focus-visible:ring-cyan-light",
  };

  const sizes = {
    sm: "px-3 py-2 text-sm",
    md: "px-5 py-3 text-base",
    lg: "px-6 py-4 text-lg",
  };

  const classes = twMerge(
    clsx(base, variants[variant], sizes[size], className)
  );

  if (href) {
    return (
      <Link
        href={href}
        target={target}
        rel={target === "_blank" ? "noopener noreferrer" : undefined}
        className={classes}
      >
        {children}
        {icon}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
      {icon}
    </button>
  );
}
