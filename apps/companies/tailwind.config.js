/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  important: "#esay-travel",
  theme: {
    extend: {
       fontFamily: {
         chakra: ["Chakra Petch", "serif"]
       },
       lineHeight:{
         'xs':'18px',
         'sm':'18.2px',
         'md': '20.8px',
         'lg': '36.4px',
       }
    },
    colors:{
      'primary-orange-100': '#D63A00',
      'primary-orange-60' : '#D63A0099',
      'primary-orange-20' : '#D63A0033',
      'secondary-bleu-100': '#0A1952',
      'secondary-bleu-60' : '#0A195299',
      'secondary-bleu-20' : '#0A195233',
      'neutral-100': '#3D3D3D',
      'neutral-60' : '#3D3D3D99',
      'neutral-20' : '#3D3D3D33',
      'white': '#FFFFFF',
      'red-100': '#B02A1E',
      'red-60' : '#B02A1E99',
      'red-20': '#B02A1E33'


    }
  },
  plugins: [],
}

