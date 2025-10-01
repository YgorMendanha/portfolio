import { ItemShopCard } from "@/app/[lang]/projects/shop/components/card";
import { getDictionary } from "../getDictionary";

export function SectionsForPageShopDetails({
  lang,
}: {
  lang: "en" | "pt";
}): ItemShopCard[] {
  const dict = getDictionary(lang);
  return [
    {
      id: "pages",
      title: dict.pagesTitle,
      items: [
        {
          title: dict.homeTitle,
          desc: dict.homeDesc,
          img: "/prints/products_home.png",
        },
        {
          title: dict.categoriesTitle,
          desc: dict.categoriesDesc,
          img: "/prints/category.png",
        },
        {
          title: dict.productTitle,
          desc: dict.productDesc,
          img: "/prints/single_product.png",
        },
      ],
      img: "/prints/products_home.png",
    },
    {
      id: "checkout",
      title: dict.checkoutTitle,
      items: [
        {
          title: dict.guestCheckoutTitle,
          desc: dict.guestCheckoutDesc,
        },
        {
          title: dict.simpleFormsTitle,
          desc: dict.simpleFormsDesc,
        },
        {
          title: dict.popularMethodsTitle,
          desc: dict.popularMethodsDesc,
        },
      ],
      img: "/prints/checkout.png",
    },
    {
      id: "mobile",
      title: dict.mobileTitle,
      items: [
        {
          title: dict.whyMobileTitle,
          desc: dict.whyMobileDesc,
          img: "/prints/home_mobile.png",
        },
        {
          title: dict.howMobileTitle,
          desc: dict.howMobileDesc,
          img: "/prints/checkout_mobile.png",
        },
      ],
      img: "/prints/home_mobile.png",
    },
    {
      id: "speed",
      title: dict.speedTitle,
      items: [
        {
          title: dict.impactTitle,
          desc: dict.impactDesc,
          img: "/metrics/metric_shop.png",
          link: "https://pagespeed.web.dev/analysis/https-store-ygormendanha-com-pt/7tg64xawqn?form_factor=desktop",
        },
        {
          title: dict.whatWeDoTitle,
          desc: dict.whatWeDoDesc,
          img: "/metrics/metric_shop_page_product.png",
          link: "https://pagespeed.web.dev/analysis/https-store-ygormendanha-com-pt-shop-1/py6hh4og95?form_factor=desktop",
        },
      ],
      img: "/metrics/metric_shop.png",
      link: "https://pagespeed.web.dev/analysis/https-store-ygormendanha-com-pt/7tg64xawqn?form_factor=desktop",
    },
  ];
}
