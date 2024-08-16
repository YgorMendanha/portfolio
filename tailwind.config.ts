import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [],
  theme: {
    extend: {
      colors: {
        "black-purple": "#19092E",
        purple: "#5E1DAD",
        blueLight: "#42A0ED",
        blue: "#267CC1",
      },
      fontFamily: {
        geo: ["var(--font-kanita)"],
        dos: ["var(--font-dosis)"],
      },
      backgroundImage: {
        "img-finesse": "url('~/public/finesse-store.png')",
        "img-blog": "url('~/public/blog.png')",
        "img-notes": "url('~/public/notes.png')",
      },
    },
  },
};
export default config;
