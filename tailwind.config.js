/** @type {import('tailwindcss').Config} */
import flowbite from "flowbite/react/tailwind";

export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    flowbite, // Agrega esto
  ],
};
