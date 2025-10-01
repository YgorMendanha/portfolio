"use client";

import React, { ReactNode, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { FaExternalLinkAlt } from "react-icons/fa";
import { FiSearch, FiX, FiZoomIn, FiMove } from "react-icons/fi";

type Props = {
  imageUrl: string;
  alt?: string;
  children: ReactNode;
  thumbWrapperClassName?: string;
  link?: string;
  /** se true, o modal vai ocupar toda a tela (sem max-width) */
  fullscreen?: boolean;
};

/** Portal simples e SSR-safe */
function Portal({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;
  return createPortal(children, document.body);
}

export function ImageZoomModal({
  imageUrl,
  alt = "Imagem ampliada",
  children,
  thumbWrapperClassName = "",
  link,
  fullscreen = false,
}: Props) {
  const [open, setOpen] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const pointerRef = useRef<{
    down: boolean;
    startX: number;
    startY: number;
    lastX: number;
    lastY: number;
  } | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  function openModal() {
    setOpen(true);
    setZoomed(false);
    setTranslate({ x: 0, y: 0 });
  }

  function closeModal() {
    setOpen(false);
    setZoomed(false);
    setTranslate({ x: 0, y: 0 });
  }

  useEffect(() => {
    const prev = document.body.style.overflow;
    if (open) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") closeModal();
    }
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    function onPointerDown(e: PointerEvent) {
      if (!zoomed) return;
      (e.target as Element).setPointerCapture(e.pointerId);
      pointerRef.current = {
        down: true,
        startX: e.clientX,
        startY: e.clientY,
        lastX: translate.x,
        lastY: translate.y,
      };
    }

    function onPointerMove(e: PointerEvent) {
      if (!pointerRef.current?.down) return;
      const p = pointerRef.current;
      const dx = e.clientX - p.startX;
      const dy = e.clientY - p.startY;
      setTranslate({ x: p.lastX + dx, y: p.lastY + dy });
    }

    function onPointerUp() {
      if (!pointerRef.current) return;
      pointerRef.current.down = false;
    }

    el.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    return () => {
      el.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, [zoomed, translate]);

  function toggleZoom() {
    setZoomed((z) => !z);
    setTranslate({ x: 0, y: 0 });
  }

  function onDoubleClick() {
    toggleZoom();
  }

  function preventImgDrag(e: React.DragEvent) {
    e.preventDefault();
  }

  return (
    <>
      <div
        className={`absolute inline-block w-full h-full cursor-pointer ${thumbWrapperClassName}`}
        onClick={() => openModal()}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") openModal();
        }}
        role="button"
        tabIndex={0}
        aria-label="Abrir imagem em tela cheia"
      >
        {children}

        <span
          className="absolute bottom-2 right-2 bg-white/90 dark:bg-slate-800/80 p-2 rounded-full shadow-md flex items-center justify-center text-slate-700 dark:text-slate-100"
          title="Ampliar"
          onClick={(e) => {
            e.stopPropagation();
            openModal();
          }}
        >
          <FiSearch className="w-4 h-4" />
        </span>
      </div>

      {open && (
        <Portal>
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
            role="dialog"
            aria-modal="true"
            aria-label="Visualização da imagem em tela cheia"
            onClick={(e) => {
              if (e.target === e.currentTarget) closeModal();
            }}
          >
            {/* Se quiser que ocupe TUDO, passe fullscreen={true} ao usar o componente */}
            <div
              className={`relative w-full ${
                fullscreen ? "h-full" : "max-h-[90vh]"
              } ${
                fullscreen ? "max-w-none" : "max-w-[1200px]"
              } bg-white/90 p-4 rounded-xl`}
            >
              <button
                className="absolute top-3 right-3 z-40 p-2 rounded-md bg-white/90 hover:bg-white text-black-purple shadow cursor-pointer"
                onClick={closeModal}
                aria-label="Fechar"
              >
                <FiX className="w-5 h-5" />
              </button>

              <div className="absolute left-3 bottom-3 z-40 flex gap-2 items-center">
                <button
                  className="p-2 bg-white text-black rounded-md shadow flex items-center gap-2 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleZoom();
                  }}
                  title={zoomed ? "Desativar zoom" : "Ativar zoom"}
                >
                  {zoomed ? (
                    <FiMove className="w-4 h-4" />
                  ) : (
                    <FiZoomIn className="w-4 h-4" />
                  )}
                  <span className="text-xs hidden sm:inline">
                    {zoomed ? "Mover" : "Zoom"}
                  </span>
                </button>

                {link && (
                  <Link
                    target="_blank"
                    rel="noopener noreferrer"
                    href={link}
                    className="p-2 bg-white  text-black rounded-md shadow flex items-center gap-2 cursor-pointer"
                  >
                    <FaExternalLinkAlt className="w-4 h-4" />
                  </Link>
                )}
              </div>

              <div
                ref={containerRef}
                className="w-full h-full bg-black/0 rounded-md overflow-hidden touch-pan-y"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: zoomed
                    ? pointerRef.current?.down
                      ? "grabbing"
                      : "grab"
                    : "zoom-in",
                }}
                onDoubleClick={(e) => {
                  e.stopPropagation();
                  onDoubleClick();
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={imageUrl}
                  alt={alt}
                  draggable={false}
                  width={760}
                  height={760}
                  onDragStart={preventImgDrag}
                  style={{
                    transform: `translate(${translate.x}px, ${
                      translate.y
                    }px) scale(${zoomed ? 2 : 1})`,
                    transition: zoomed
                      ? "transform 150ms linear"
                      : "transform 200ms ease",
                    maxWidth: zoomed ? "none" : "100%",
                    maxHeight: "90vh",
                    objectFit: "contain",
                    userSelect: "none",
                    touchAction: zoomed ? "none" : "manipulation",
                  }}
                />
              </div>
            </div>
          </div>
        </Portal>
      )}
    </>
  );
}
