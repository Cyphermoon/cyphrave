/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: ["light", "dark", "cupcake", "retro"],
  },
  plugins: [
    // eslint-disable-next-line no-undef
    require('daisyui'),
  ],
}

