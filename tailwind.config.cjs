module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        morton: ['Morton', 'sans-serif'],
        neopixel: ['Neopixel', 'sans-serif'],
        pixelify: ['Pixelify Sans', 'sans-serif'],
      },
      
    },
  },
  plugins: [],
}
