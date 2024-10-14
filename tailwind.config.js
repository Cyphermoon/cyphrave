/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: ["light", "dark", "cupcake", "retro", {
      cyphrave: {
        "primary": "#110f0e",
        "secondary": "#d1d5db",
        "accent": "#d97706",
        "neutral": "blue",
        "base-100": "#fff",
        "info": "#0000ff",
        "success": "#00ff00",
        "warning": "#00ff00",
        "error": "#ff0000",
      }
    }],
  },
  plugins: [
    // eslint-disable-next-line no-undef
    require('daisyui'),
  ],
}

