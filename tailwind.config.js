/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/pages/**/*.{js,ts,jsx,tsx}",
      "./src/components/**/*.{js,ts,jsx,tsx}",
      "./src/app/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: "#FF5722",
          secondary: "#2c3e50",
          accent: "#4CAF50",
          background: "#f8f8f8",
        },
      },
    },
    plugins: [],
  }