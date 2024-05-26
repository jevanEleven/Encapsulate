import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                "primary-500": "#1E1E1E",
                "secondary-500": "#FEFEFE",
                "tertiary-500": "#FF3333",
            },
            backgroundImage: {
                grainy: "url(/textures/grainy-blue.png)",
            },
        },
    },
    plugins: [],
};
export default config;
