module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563eb', // blue-600
          light: '#3b82f6',  // blue-500
          dark: '#1e40af',   // blue-800
        },
        accent: '#f59e42', // orange-400
        background: '#f8fafc', // gray-50
        card: '#ffffff', // white
        border: '#e5e7eb', // gray-200
        muted: '#64748b', // slate-500
        success: '#22c55e', // green-500
        danger: '#ef4444', // red-500
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        md: '0.5rem',
        lg: '1rem',
        xl: '1.5rem',
        '2xl': '2rem',
        '3xl': '2.5rem',
      },
      boxShadow: {
        card: '0 2px 8px 0 rgba(0,0,0,0.04)',
        glass: '0 8px 32px 0 rgba(31, 38, 135, 0.18)',
        '2xl': '0 12px 48px 0 rgba(31, 38, 135, 0.25)',
        inner: 'inset 0 2px 8px 0 rgba(31, 38, 135, 0.08)',
      },
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        md: '8px',
        lg: '16px',
        xl: '24px',
        '2xl': '40px',
      },
      backgroundImage: {
        'glass-gradient': 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.1) 100%)',
      },
    },
  },
  safelist: [
    'glass',
    'backdrop-blur-xl',
    'bg-white/20',
    'border',
    'border-white/30',
    'shadow-2xl',
    'rounded-2xl',
    'before:absolute',
    'before:inset-0',
    'before:rounded-2xl',
    'before:bg-gradient-to-br',
    'before:from-white/40',
    'before:to-white/10',
    'before:pointer-events-none',
  ],
  plugins: [],
};
