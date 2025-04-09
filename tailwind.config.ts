
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				neonRed: '#ff003c',
				neonPink: '#ff00aa',
				darkBg: '#0a0a0a',
				cyberBlue: '#0FA0CE',
				promptRed: '#ff5555',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				}
			},
			fontFamily: {
				'cyber': ['VT323', 'monospace'],
				'share-tech': ['Share Tech Mono', 'monospace'],
				'ibm': ['IBM Plex Mono', 'monospace'],
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				scanline: {
					'0%': { transform: 'translateY(0)' },
					'100%': { transform: 'translateY(100vh)' }
				},
				blink: {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0' }
				},
				typing: {
					from: { width: '0' },
					to: { width: '100%' }
				},
				'blink-caret': {
					'from, to': { borderColor: 'transparent' },
					'50%': { borderColor: '#ff003c' }
				},
				pulse: {
					'0%': { opacity: '0.6' },
					'50%': { opacity: '1' },
					'100%': { opacity: '0.6' }
				},
				'glitch-anim-1': {
					'0%': { clip: 'rect(32px, 9999px, 78px, 0)' },
					'20%': { clip: 'rect(65px, 9999px, 119px, 0)' },
					'40%': { clip: 'rect(16px, 9999px, 101px, 0)' },
					'60%': { clip: 'rect(91px, 9999px, 132px, 0)' },
					'80%': { clip: 'rect(3px, 9999px, 80px, 0)' },
					'100%': { clip: 'rect(88px, 9999px, 145px, 0)' }
				},
				'glitch-anim-2': {
					'0%': { clip: 'rect(122px, 9999px, 156px, 0)' },
					'20%': { clip: 'rect(43px, 9999px, 96px, 0)' },
					'40%': { clip: 'rect(145px, 9999px, 198px, 0)' },
					'60%': { clip: 'rect(12px, 9999px, 65px, 0)' },
					'80%': { clip: 'rect(98px, 9999px, 154px, 0)' },
					'100%': { clip: 'rect(76px, 9999px, 199px, 0)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'scanline': 'scanline 4s linear infinite',
				'blink': 'blink 1s infinite',
				'typing': 'typing 3.5s steps(40, end)',
				'blink-caret': 'blink-caret 0.75s step-end infinite',
				'pulse': 'pulse 2s infinite',
				'glitch-1': 'glitch-anim-1 2s infinite linear alternate-reverse',
				'glitch-2': 'glitch-anim-2 2s infinite linear alternate-reverse'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
