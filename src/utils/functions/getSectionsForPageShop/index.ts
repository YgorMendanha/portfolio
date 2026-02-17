import { ItemShopCard } from "@/app/[lang]/projects/shop/components/card";

export function SectionsForPageShopDetails({
  lang,
}: {
  lang: "en" | "pt";
}): ItemShopCard[] {
  return [
    {
      id: "pages",
      title: lang === "pt" ? "Páginas essenciais" : "Essential pages",
      items: [
        {
          title: lang === "pt" ? "Home" : "Home",
          desc:
            lang === "pt"
              ? "Ofertas, categorias e caminhos claros facilitam a navegação e a compra."
              : "Offers, categories and clear paths make navigation and purchase easier.",
          img: "/prints/products_home.png",
        },
        {
          title: lang === "pt" ? "Categorias" : "Categories",
          desc:
            lang === "pt"
              ? "Filtros que ajudam o cliente a achar o que procura"
              : "Filters that help customers find what they're looking for",
          img: "/prints/category.png",
        },
        {
          title: lang === "pt" ? "Produto" : "Product",
          desc:
            lang === "pt"
              ? "Fotos reais, preço, benefícios e opções fáceis de escolher"
              : "Real photos, price, benefits and easy-to-select options",
          img: "/prints/single_product.png",
        },
      ],
      img: "/prints/products_home.png",
    },
    {
      id: "checkout",
      title: lang === "pt" ? "Checkout que converte" : "Checkout that converts",
      items: [
        {
          title:
            lang === "pt"
              ? "Checkout sem Barreiras"
              : "Guest checkout (barrier-free)",
          desc:
            lang === "pt"
              ? "O checkout começa sem barreiras — o cliente cria sua conta apenas no momento de finalizar a compra."
              : "The checkout starts without barriers — customers create an account only when completing the purchase.",
        },
        {
          title: lang === "pt" ? "Formulários simples" : "Simple forms",
          desc:
            lang === "pt"
              ? "Validação clara e autofill para acelerar"
              : "Clear validation and autofill to speed up",
        },
        {
          title: lang === "pt" ? "Métodos populares" : "Popular methods",
          desc:
            lang === "pt"
              ? "Cartão, PIX e carteiras; ofereça opções que o cliente usa"
              : "Card, PIX and wallets — offer the payment options your customers use",
        },
      ],
      img: "/prints/checkout.png",
    },
    {
      id: "mobile",
      title: lang === "pt" ? "Projetado para celular" : "Designed for mobile",
      items: [
        {
          title: lang === "pt" ? "Por que" : "Why",
          desc:
            lang === "pt"
              ? "Experiência pensada para o celular — toque ágil, carregamento rápido e navegação fluida."
              : "Experience designed for mobile — quick touch, fast loading and smooth navigation.",
          img: "/prints/home_mobile.png",
        },
        {
          title: lang === "pt" ? "Como" : "How",
          desc:
            lang === "pt"
              ? "Botões grandes, imagens otimizadas, checkout simples"
              : "Large buttons, optimized images, simple checkout",
          img: "/prints/checkout_mobile.png",
        },
      ],
      img: "/prints/home_mobile.png",
    },
    {
      id: "speed",
      title: lang === "pt" ? "Velocidade & performance" : "Speed & Performance",
      items: [
        {
          title: lang === "pt" ? "Impacto" : "Impact",
          desc:
            lang === "pt"
              ? "Páginas lentas perdem clientes — velocidade é conversão"
              : "Slow pages lose customers — speed is conversion",
          img: "/metrics/metric_shop.png",
          link: "https://pagespeed.web.dev/analysis/https-store-ygormendanha-com-pt/7tg64xawqn?form_factor=desktop",
        },
        {
          title: lang === "pt" ? "O que fazemos" : "What we do",
          desc:
            lang === "pt"
              ? "Imagens leves, hospedagem confiável e menos scripts"
              : "Light images, reliable hosting and fewer scripts",
          img: "/metrics/metric_shop_page_product.png",
          link: "https://pagespeed.web.dev/analysis/https-store-ygormendanha-com-pt-shop-1/py6hh4og95?form_factor=desktop",
        },
      ],
      img: "/metrics/metric_shop.png",
      link: "https://pagespeed.web.dev/analysis/https-store-ygormendanha-com-pt/7tg64xawqn?form_factor=desktop",
    },
  ];
}
