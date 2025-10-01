"use client";
import Link, { LinkProps } from "next/link";
import { useParams } from "next/navigation";
import { CSSProperties, ReactNode } from "react";

interface customProps extends LinkProps {
  children: ReactNode;
  className?: string;
  id?: string;
  target?: string;
  rel?: string;
  style?: CSSProperties;
}

export function CustomLink(props: customProps) {
  const { children, className, style } = props;
  const params = useParams();

  return (
    <Link
      {...props}
      className={className || ""}
      style={{ ...style }}
      href={
        params.lang === "en" ? `/${params.lang}${props.href}` : `${props.href}`
      }
    >
      {children}
    </Link>
  );
}
