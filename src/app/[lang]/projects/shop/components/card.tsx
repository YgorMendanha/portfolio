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
  } lg:col-span-2`;

  const imageWrapperClasses = `order-2 ${
    imageOnRight ? "lg:order-2" : "lg:order-1"
  } flex justify-center`;

  return (
    <article
      key={item.id}
      id={item.id}
      className="bg-white p-6 rounded-2xl shadow-sm grid grid-cols-1 lg:grid-cols-3 gap-6 items-center"
    >
      <div className={clsx("h-full", textClasses)}>
        <h2 className="text-xl font-semibold mb-auto">{item.title}</h2>

        {item.items?.length ? (
          <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {item.items.map((it) => (
              <li
                key={it.title}
                className="p-3 bg-light-gray rounded-lg cursor-pointer hover:bg-gray-lightest transition"
                onPointerEnter={() => swapTo(it)}
                onFocus={() => swapTo(it)}
                tabIndex={0}
                aria-label={`${it.title}: ${it.desc}`}
              >
                <div className="font-medium">{it.title}</div>
                <div className="text-sm text-slate-700 mt-1">{it.desc}</div>
                {it.img && <FiEye className="mt-auto ml-auto" />}
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      <div className={imageWrapperClasses}>
        <div className="w-full max-w-[400px] h-[400px] relative rounded-lg overflow-hidden shadow">
          {front.src && (
            <ImageZoomModal imageUrl={front.src} link={front.link}>
              <Image
                key={front.key}
                src={front.src!}
                alt={`Ilustração ${item.title}`}
                fill
                sizes="(max-width: 480px) 400px, 400px"
                className={`transition-opacity duration-[${TRANSITION_MS}ms] ease-in-out object-contain ${
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
              sizes="(max-width: 480px) 400px, 400px"
              className={`transition-opacity duration-[${TRANSITION_MS}ms] ease-in-out object-contain absolute top-0 left-0 ${
                back.visible ? "opacity-100" : "opacity-0"
              }`}
            />
          )}
        </div>
      </div>
    </article>
  );
}
