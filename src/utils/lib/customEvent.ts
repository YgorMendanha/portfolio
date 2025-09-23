declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export function sendEventGA<T extends Record<string, any>>({
  name,
  params,
}: {
  name: string;
  params?: T;
}) {
  if (typeof window === "undefined") return;
  window.gtag?.("event", name, params);
}
