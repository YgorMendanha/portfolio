

import Script from "next/script";

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_TRACKING!;

export function GoogleAnalytics(): any {
  return (
    <>
      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${String(
          GA_TRACKING_ID
        )}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
           window.dataLayer = window.dataLayer || [];
           function gtag(){dataLayer.push(arguments);}
           gtag('js', new Date());
         
           gtag('config', '${String(GA_TRACKING_ID)}');
             `,
        }}
      />
    </>
  );
}

export const GAPageview = (url: URL) => {
  window.gtag("config", GA_TRACKING_ID, {
    page_path: url,
  });
};

type GTagEvent = {
  action: string;
  label: string;
};

export const GAEvent = ({ action, label }: GTagEvent) => {
  window.gtag("event", action, {
    event_category: "general",
    event_label: label,
  });
};
