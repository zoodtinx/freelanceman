/** @type {import('tailwindcss').Config} */

export default {
   darkMode: ['class'],
   content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
   safelist: [
      'bg-primary',
      'text-secondary',
      {
         pattern:
            /bg-theme-(red|green|blue|yellow|mint|teal|orange|purple|pink|turquoise|magenta|olive|maroon|beige|coral|lavender|peach|bronze|taupe|lilac|zinc)/,
      },
   ],
   theme: {
      extend: {
         animation: {
            shake: 'shake 0.3s ease-in-out',
         },
         keyframes: {
            shake: {
               '0%, 100%': { transform: 'translateX(0)' },
               '25%': { transform: 'translateX(-2px)' },
               '50%': { transform: 'translateX(2px)' },
               '75%': { transform: 'translateX(-2px)' },
            },
         },
         screens: {
            sm: { min: '390px', max: '833px' }, // iPhone 14 Pro range
            md: { min: '834px', max: '1439px' }, // iPad Pro 11 range
            lg: { min: '1440px' }, // MacBook 16 and above
         },
         fontFamily: {
            sans: ['Lexend'],
            thai: ['PrachasornNeue'],
         },
         borderRadius: {
            lg: 'var(--radius)',
            md: 'calc(var(--radius) - 2px)',
            sm: 'calc(var(--radius) - 4px)',
         },
         colors: {
            theme: {
               red: 'var(--freelanceman-theme-red)',
               green: 'var(--freelanceman-theme-green)',
               blue: 'var(--freelanceman-theme-blue)',
               yellow: 'var(--freelanceman-theme-yellow)',
               mint: 'var(--freelanceman-theme-mint)',
               teal: 'var(--freelanceman-theme-teal)',
               orange: 'var(--freelanceman-theme-orange)',
               purple: 'var(--freelanceman-theme-purple)',
               pink: 'var(--freelanceman-theme-pink)',
               turquoise: 'var(--freelanceman-theme-turquoise)',
               magenta: 'var(--freelanceman-theme-magenta)',
               olive: 'var(--freelanceman-theme-olive)',
               maroon: 'var(--freelanceman-theme-maroon)',
               beige: 'var(--freelanceman-theme-beige)',
               coral: 'var(--freelanceman-theme-coral)',
               lavender: 'var(--freelanceman-theme-lavender)',
               peach: 'var(--freelanceman-theme-peach)',
               bronze: 'var(--freelanceman-theme-bronze)',
               taupe: 'var(--freelanceman-theme-taupe)',
               lilac: 'var(--freelanceman-theme-lilac)',
               zinc: 'var(--freelanceman-theme-zinc)',
            },
            ui: {
               red: 'var(--freelanceman-ui-red)',
               green: 'var(--freelanceman-ui-green)',
               blue: 'var(--freelanceman-ui-blue)',
               yellow: 'var(--freelanceman-ui-yellow)',
            },
            status: {
               active: 'var(--freelanceman-status-active)',
               onhold: 'var(--freelanceman-status-onhold)',
               completed: 'var(--freelanceman-status-completed)',
               cancelled: 'var(--freelanceman-status-cancelled)',
            },

            deadline: {
               soon: 'var(--freelanceman-deadline-soon)',
               past: 'var(--freelanceman-deadline-past)',
            },

            document: {
               invoice: 'var(--freelanceman-document-invoice)',
               quotation: 'var(--freelanceman-document-quotation)',
               receipt: 'var(--freelanceman-document-receipt)',
            },
            constant: {
               primary: 'hsl(var(--freelanceman-constant-primary))',
               secondary: 'hsl(var(--freelanceman-constant-secondary))',
               tertiary: 'hsl(var(--freelanceman-constant-tertiary))',
               quartenary: 'hsl(var(--freelanceman-constant-quartenary))',
            },
            background: 'hsl(var(--background))',
            foreground: 'hsl(var(--foreground))',
            primary: {
               DEFAULT: 'hsl(var(--primary))',
               foreground: 'hsl(var(--primary-foreground))',
            },
            secondary: {
               DEFAULT: 'hsl(var(--secondary))',
               foreground: 'hsl(var(--secondary-foreground))',
            },
            tertiary: 'hsl(var(--tertiary))',
            quaternary: 'hsl(var(--quaternary))',
            header: {
               DEFAULT: '#F8F8F8',
               dark: '#262626',
            },
            card: {
               DEFAULT: 'hsl(var(--card))',
               foreground: 'hsl(var(--card-foreground))',
            },
            popover: {
               DEFAULT: 'hsl(var(--popover))',
               foreground: 'hsl(var(--popover-foreground))',
            },
            muted: {
               DEFAULT: 'hsl(var(--muted))',
               foreground: 'hsl(var(--muted-foreground))',
            },
            accent: {
               DEFAULT: 'hsl(var(--accent))',
               foreground: 'hsl(var(--accent-foreground))',
            },
            destructive: {
               DEFAULT: 'hsl(var(--destructive))',
               foreground: 'hsl(var(--destructive-foreground))',
            },
            border: 'hsl(var(--border))',
            input: 'hsl(var(--input))',
            ring: 'hsl(var(--ring))',
            chart: {
               1: 'hsl(var(--chart-1))',
               2: 'hsl(var(--chart-2))',
               3: 'hsl(var(--chart-3))',
               4: 'hsl(var(--chart-4))',
               5: 'hsl(var(--chart-5))',
            },
         },
         fontSize: {
            DEFAULT: '14px',
            '2xl': '33px',
            xl: '25px',
            lg: '19px',
            md: '16px',
            base: '14px', // Customize the base font size
            sm: '12px',
         },
         borderOpacity: {
            10: '0.1',
            20: '0.2',
            95: '0.95',
         },
      },
   },
   plugins: [
      require('tailwindcss-animate'),
      function ({ addBase }) {
         addBase({
            'html[lang="en"]': { fontFamily: 'Lexend' },
            'html[lang="th"]': { fontFamily: 'PrachasornNeue' },
         });
      },
   ],
};
