"use client";

import { ImageZoomModal } from "@/components/partials/ImageZoomModal";
import clsx from "clsx";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FiEye } from "react-icons/fi";

export interface ItemShopCard {
  id: string;
  title: string;
  items?: {
    title: string;
    desc: string;
    img?: string;
    link?: string;
  }[];
  img?: string;
  link?: string;
}

export function CardChangeImg({
  item,
  index,
}: {
  item: ItemShopCard;
  index: number;
}) {
  const TRANSITION_MS = 300;

  const [front, setFront] = useState<{
    src?: string;
    key: number;
    link?: string;
  }>({
    src: item.img,
    key: 0,
  });
  const [back, setBack] = useState<{
    src?: string;
    key: number;
    visible: boolean;
    link?: string;
  } | null>(null);

  const rafsRef = useRef<number[]>([]);
  const timeoutRef = useRef<number | null>(null);
  const preloadTokenRef = useRef(0);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      rafsRef.current.forEach((r) => cancelAnimationFrame(r));
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, []);

  useEffect(() => {
    setFront({ src: item.img, key: Date.now(), link: item.link });
    setBack(null);
  }, [item.img]);

  function clearPending() {
    rafsRef.current.forEach((r) => cancelAnimationFrame(r));
    rafsRef.current = [];
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }

  function preloadImage(src: string, token: number) {
    return new Promise<boolean>((resolve) => {
      const img = new window.Image();
      img.src = src;
      if (img.complete) {
        resolve(preloadTokenRef.current === token && mountedRef.current);
        return;
      }
      const onLoad = () => {
        img.removeEventListener("load", onLoad);
        img.removeEventListener("error", onErr);
        resolve(preloadTokenRef.current === token && mountedRef.current);
      };
      const onErr = () => {
        img.removeEventListener("load", onLoad);
        img.removeEventListener("error", onErr);
        resolve(false);
      };
      img.addEventListener("load", onLoad);
      img.addEventListener("error", onErr);
    });
  }

  async function swapTo(it: {
    title: string;
    desc: string;
    img?: string;
    link?: string;
  }) {
    if (!it.img) return;
    if (front.src === it.img && !back) return;

    preloadTokenRef.current += 1;
    const myToken = preloadTokenRef.current;

    clearPending();

    const ok = await preloadImage(it.img, myToken);
    if (!ok || preloadTokenRef.current !== myToken || !mountedRef.current) {
      return;
    }

    const key = Date.now();
    setBack({ src: it.img, key, visible: false, link: it.link });

    const raf1 = requestAnimationFrame(() => {
      const raf2 = requestAnimationFrame(() => {
        setBack((prev) => (prev ? { ...prev, visible: true } : prev));
      });
      rafsRef.current.push(raf2);
    });
    rafsRef.current.push(raf1);

    timeoutRef.current = window.setTimeout(() => {
      setFront({ src: it.img, key, link: it.link });
      setBack(null);
      timeoutRef.current = null;
      rafsRef.current = [];
    }, TRANSITION_MS + 30);
  }

  const imageOnRight = index % 2 === 1;

  const textClasses = `order-1 ${
    imageOnRight ? "lg:order-1" : "lg:order-2"
  } lg:col-span-1`;

  const imageWrapperClasses = `order-2 ${
    imageOnRight ? "lg:order-2" : "lg:order-1"
  } flex justify-center lg:col-span-2`;

  return (
    <article
      key={item.id}
      id={item.id}
      className="bg-white/[0.03] border border-white/10 p-8 rounded-3xl shadow-2xl grid grid-cols-1 lg:grid-cols-3 gap-12 items-center transition-all duration-500 hover:bg-white/[0.05]"
    >
      <div className={clsx("h-full flex flex-col justify-center", textClasses)}>
        <h2 className="text-2xl font-bold text-white mb-2">{item.title}</h2>
        <div className="w-12 h-1 bg-yellow mb-6 rounded-full" />

        {item.items?.length ? (
          <ul className="grid grid-cols-1 gap-4">
            {item.items.map((it) => {
              const isActive = front.src === it.img || back?.src === it.img;
              
              return (
                <li
                  key={it.title}
                  className={clsx(
                    "p-4 rounded-xl cursor-pointer transition-all duration-300 border flex flex-col group",
                    isActive 
                      ? "bg-yellow/10 border-yellow/30 shadow-[0_0_15px_rgba(255,204,0,0.1)]" 
                      : "bg-white/5 border-white/5 hover:border-white/20 hover:bg-white/10"
                  )}
                  onPointerEnter={() => swapTo(it)}
                  onFocus={() => swapTo(it)}
                  tabIndex={0}
                  aria-label={`${it.title}: ${it.desc}`}
                >
                  <div className="flex items-center justify-between">
                    <div className={clsx(
                      "font-bold transition-colors",
                      isActive ? "text-yellow" : "text-white"
                    )}>
                      {it.title}
                    </div>
                    {it.img && (
                      <FiEye className={clsx(
                        "transition-colors",
                        isActive ? "text-yellow" : "text-gray-600 group-hover:text-cyan-light"
                      )} />
                    )}
                  </div>
                  <div className="text-sm text-gray-400 mt-1 leading-relaxed">
                    {it.desc}
                  </div>
                </li>
              );
            })}
          </ul>
        ) : null}
      </div>

      <div className={imageWrapperClasses}>
        {/* Moldura de imagem com efeito de monitor em Ciano */}
        <div className="w-full relative rounded-2xl overflow-hidden border border-cyan-light/20 shadow-[0_0_30px_rgba(0,194,255,0.1)] aspect-[4/3] lg:aspect-auto lg:h-[500px] bg-black/40">
          {front.src && (
            <ImageZoomModal imageUrl={front.src} link={front.link}>
              <Image
                key={front.key}
                src={front.src!}
                alt={`Ilustração ${item.title}`}
                fill
                sizes="(max-width: 1024px) 100vw, 800px"
                className={`transition-opacity duration-[${TRANSITION_MS}ms] ease-in-out object-contain p-4 ${
                  back?.visible ? "opacity-0" : "opacity-100"
                }`}
                priority={true}
              />
            </ImageZoomModal>
          )}

          {back?.src && (
            <Image
              key={back.key}
              src={back.src}
              alt={`Ilustração ${item.title}`}
              fill
              sizes="(max-width: 1024px) 100vw, 800px"
              className={`transition-opacity duration-[${TRANSITION_MS}ms] ease-in-out object-contain p-4 absolute top-0 left-0 ${
                back.visible ? "opacity-100" : "opacity-0"
              }`}
            />
          )}
        </div>
      </div>
    </article>
  );
}