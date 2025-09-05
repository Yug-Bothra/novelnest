/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        heartbeatGlow: {
          '0%,100%': { boxShadow: '0 0 40px rgba(140,0,0,0.3)' },
          '50%': { boxShadow: '0 0 50px rgba(160,0,0,0.5)' },
        },
        eerieGlow: {
          '0%': { opacity: '0.4' },
          '50%': { opacity: '0.7' },
          '100%': { opacity: '0.9' },
        },
        bloodDrip: {
          '0%': { height: '0', opacity: '0' },
          '30%': { opacity: '1' },
          '100%': { height: '30%', opacity: '0.6' },
        },
      },
      animation: {
        heartbeatGlow: 'heartbeatGlow 5s infinite alternate',
        eerieGlow: 'eerieGlow 6s infinite alternate',
        bloodDrip: 'bloodDrip 10s ease-in infinite',
      },
    },
  },
  plugins: [],
};
