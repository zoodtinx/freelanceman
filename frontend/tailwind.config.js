/** @type {import('tailwindcss').Config} */

export default {
	darkMode: ["class"],
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
    	extend: {
			fontSize: {
				xlhead: '50px',
				head: '35px',
				subhead: '25px',
				minihead: '18px',
				base: '16px', // Customize the base font size
				subbase: '14px'
			 },
			screens: {
				sm: { min: '390px', max: '833px' }, // iPhone 14 Pro range
				md: { min: '834px', max: '1439px' }, // iPad Pro 11 range
				lg: { min: '1440px' },               // MacBook 16 and above
			 },
    		fontFamily: {
    			sans: ['Lexend'],
    			thai: ['PrachasornNeue']
    		},
    		borderRadius: {
    			lg: 'var(--radius)',
    			md: 'calc(var(--radius) - 2px)',
    			sm: 'calc(var(--radius) - 4px)'
    		},
    		colors: {
				background: 'hsl(var(--background))',
    			foreground: 'hsl(var(--foreground))',
    			primary: {
    				DEFAULT: 'hsl(var(--primary))',
    				foreground: 'hsl(var(--primary-foreground))'
    			},
    			secondary: {
    				DEFAULT: 'hsl(var(--secondary))',
    				foreground: 'hsl(var(--secondary-foreground))'
    			},
    			tertiary: 'hsl(var(--tertiary))',
    			card: {
    				DEFAULT: 'hsl(var(--card))',
    				foreground: 'hsl(var(--card-foreground))'
    			},
    			popover: {
    				DEFAULT: 'hsl(var(--popover))',
    				foreground: 'hsl(var(--popover-foreground))'
    			},
    			muted: {
    				DEFAULT: 'hsl(var(--muted))',
    				foreground: 'hsl(var(--muted-foreground))'
    			},
    			accent: {
    				DEFAULT: 'hsl(var(--accent))',
    				foreground: 'hsl(var(--accent-foreground))'
    			},
    			destructive: {
    				DEFAULT: 'hsl(var(--destructive))',
    				foreground: 'hsl(var(--destructive-foreground))'
    			},
    			border: 'hsl(var(--border))',
    			input: 'hsl(var(--input))',
    			ring: 'hsl(var(--ring))',
    			chart: {
    				'1': 'hsl(var(--chart-1))',
    				'2': 'hsl(var(--chart-2))',
    				'3': 'hsl(var(--chart-3))',
    				'4': 'hsl(var(--chart-4))',
    				'5': 'hsl(var(--chart-5))'
    			}
    		},
    		borderOpacity: {
    			'10': '0.1',
    			'20': '0.2',
    			'95': '0.95'
    		}
    	}
    },
	plugins: [require("tailwindcss-animate"), function({ addBase }) {
      addBase({
        'html[lang="en"]': { fontFamily: 'Lexend' },
        'html[lang="th"]': { fontFamily: 'PrachasornNeue' },
      })}],
};
