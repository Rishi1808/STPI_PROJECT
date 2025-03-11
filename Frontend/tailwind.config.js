/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {

      fontFamily: { 
        adobe: ["your-adobe-font-name", "sans-serif"], // Replace with your actual font name from Adobe Fonts
      },
    },
  },
  plugins: [],
}

