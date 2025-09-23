export function customEvent({
  eventName,
  linkText,
}: {
  eventName: string;
  linkText: string;
}): void {
  if (typeof (window as any).gtag === "function") {
    (window as any).gtag("event", eventName, {
      link_text: linkText,
      page_location: window.location.href,
    });
    // console.log(`Evento GA4 enviado: ${eventName}`);
  } else {
    console.warn(
      "gtag não encontrado. Certifique-se de que GA4 está instalado."
    );
  }
}
