import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Verdana', 'ui-sans-serif', 'system-ui', 'custom-font'], // Include the custom font here
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      customFont: {
        'custom-font': ['url("../media/Verdana/Verdana.ttf") format("truetype")'], // Define the custom font here
      },
    },
  },
  plugins: [],
};
export default config;