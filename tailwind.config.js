/** @type {import('tailwindcss').Config} */
export default {
  content: [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
],
theme: {
  extend: {
    colors: {
      primary: {
        100: '#002253',
        90: '#063375',
        80: '#0F4797',
        70: '#1B5CB9',
        60: '#2C74DB',
        50: '#16ABF8',
        40: '#6AA7FF',
        30: '#96C1FF',
        20: '#C1DAFF',
        10: '#ECF3FF',
      },
      alert: {
        10: '#78350F',
        9: '#92400E',
        8: '#B45309',
        7: '#D97706',
        6: '#F59E0B',
        5: '#FBBF24',
        4: '#FCD34D',
        3: '#FDE68A',
        2: '#FEF3C7',
        1: '#FFFBEB',
      },
      success: {
        10: '#064E3B',
        9: '#065F46',
        8: '#047857',
        7: '#059669',
        6: '#10B981',
        5: '#34D399',
        4: '#6EE7B7',
        3: '#A7F3D0',
        2: '#D1FAE5',
        1: '#ECFDF5',
      },
      danger: {
        10: '#881337',
        9: '#9F1239',
        8: '#BE123C',
        7: '#E11D48',
        6: '#ED4C5C',
        5: '#FB7185',
        4: '#FDA4AF',
        3: '#FECDD3',
        2: '#FFE4E6',
        1: '#FFF1F2',
      },
    },
  },
},
plugins: [],
}

