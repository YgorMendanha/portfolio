import { JSX } from "react";
import { getDictionary } from "../getDictionary";
import {
  FiShoppingCart,
  FiCode,
  FiBarChart2,
  FiSearch,
  FiPieChart,
  FiLayout,
  FiShield,
  FiFeather,
} from "react-icons/fi";

export type ServiceCard = {
  id: string;
  title: string;
  short: string;
  bullets: string[];
  icon?: JSX.Element;
  url?: string;
};

export function ServicesForPage({ lang }: { lang: "en" | "pt" }) {
  const dict = getDictionary(lang);

  const mainServices: ServiceCard[] = [
    {
      id: "ecommerce",
      title: dict.ecommerceTitle,
      short: dict.ecommerceShort,
      bullets: dict.ecommerceBullets,
      icon: <FiShoppingCart className="w-6 h-6" aria-hidden />,
      url: "/services/shop",
    },
    {
      id: "custom-apps",
      title: dict.customAppsTitle,
      short: dict.customAppsShort,
      bullets: dict.customAppsBullets,
      icon: <FiCode className="w-6 h-6" aria-hidden />,
      url: "/services/custom",
    },
  ];

  const complementaryServices: ServiceCard[] = [
    {
      id: "cro",
      title: dict.croTitle,
      short: dict.croShort,
      bullets: dict.croBullets,
      icon: <FiBarChart2 className="w-6 h-6" aria-hidden />,
    },
    {
      id: "seo",
      title: dict.seoTitle,
      short: dict.seoShort,
      bullets: dict.seoBullets,
      icon: <FiSearch className="w-6 h-6" aria-hidden />,
    },
    {
      id: "analytics",
      title: dict.analyticsTitle,
      short: dict.analyticsShort,
      bullets: dict.analyticsBullets,
      icon: <FiPieChart className="w-6 h-6" aria-hidden />,
    },
    {
      id: "integrations",
      title: dict.integrationsTitle,
      short: dict.integrationsShort,
      bullets: dict.integrationsBullets,
      icon: <FiLayout className="w-6 h-6" aria-hidden />,
    },
    {
      id: "maintenance",
      title: dict.maintenanceTitle,
      short: dict.maintenanceShort,
      bullets: dict.maintenanceBullets,
      icon: <FiShield className="w-6 h-6" aria-hidden />,
    },
    {
      id: "ux",
      title: dict.uxTitle,
      short: dict.uxShort,
      bullets: dict.uxBullets,
      icon: <FiFeather className="w-6 h-6" aria-hidden />,
    },
  ];

  return { mainServices, complementaryServices };
}
