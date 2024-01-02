import { fontFamily, typography } from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
const config = {
	darkMode: ["class"],
	content: ["./src/**/*.{html,js,svelte,md,ts}"],
	safelist: ["dark"],
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px"
			}
		},
		extend: {
			colors: {
				// 边框
				border: "hsl(var(--border) / <alpha-value>)",
				// 输入
				input: "hsl(var(--input) / <alpha-value>)",
				// 环
				ring: "hsl(var(--ring))",
				// 背景
				background: "hsl(var(--background) / <alpha-value>)",
				// 前景
				foreground: "hsl(var(--foreground) / <alpha-value>)",
				// 主要
				primary: {
					DEFAULT: "hsl(var(--primary) / <alpha-value>)",
					foreground: "hsl(var(--primary-foreground) / <alpha-value>)"
				},
				// 次要
				secondary: {
					DEFAULT: "hsl(var(--secondary) / <alpha-value>)",
					foreground:
						"hsl(var(--secondary-foreground) / <alpha-value>)"
				},
				// 警告
				destructive: {
					DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
					foreground:
						"hsl(var(--destructive-foreground) / <alpha-value>)"
				},
				// 混色
				muted: {
					DEFAULT: "hsl(var(--muted) / <alpha-value>)",
					foreground: "hsl(var(--muted-foreground) / <alpha-value>)"
				},
				// 强调
				accent: {
					DEFAULT: "hsl(var(--accent) / <alpha-value>)",
					foreground: "hsl(var(--accent-foreground) / <alpha-value>)"
				},
				// 弹窗
				popover: {
					DEFAULT: "hsl(var(--popover) / <alpha-value>)",
					foreground: "hsl(var(--popover-foreground) / <alpha-value>)"
				},
				// 卡片
				card: {
					DEFAULT: "hsl(var(--card) / <alpha-value>)",
					foreground: "hsl(var(--card-foreground) / <alpha-value>)"
				},
				// 牛油果
				avocado: {
					50: '#f4f9f4', // 最浅的牛油果绿色
					100: '#e6f2e7',
					200: '#c1dfc3',
					300: '#9bcc9e',
					400: '#4fa74e', // 中等深度的牛油果绿色
					500: '#038d1e', // 标准的牛油果绿色
					600: '#027f1b',
					700: '#025816',
					800: '#013912',
					900: '#01250e', // 最深的牛油果绿色
				},
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)"
			},
			fontFamily: {
				sans: ["Inter", ...fontFamily.sans]
			},
			typography: (theme) => ({
				DEFAULT: {
					css: {
						'p code, li code': {
							color: theme('colors.primary.foreground'),
							backgroundColor: theme('colors.avocado.200'),
							padding: '0.125rem 0.25rem',
							margin: '0.125rem 0.125rem',
							borderRadius: '0.25rem'
						},
						"code::before": {
							content: '""',
						},
						"code::after": {
							content: '""',
						},
						ul: {
							listStyleType: 'none',
						},
						'ul > li': {
							position: 'relative',
						},
						'ul > li::before': {
							content: '"•"',
							position: 'absolute',
							left: '-0.5rem',
						},
					},
				},
				dark: {
					css: {
						'p code, li code': {
							color: theme('colors.primary.foreground'),
							backgroundColor: theme('colors.avocado.800'),
							padding: '0.125rem 0.25rem',
							borderRadius: '0.25rem'
						},
					}
				}
			}),
		}
	},
	plugins: [require('@tailwindcss/typography')]
};

export default config;


/*
1、颜色
- 浅色：text-foreground/60
- 内容：text-foreground/70
- 标题：text-foreground/80

2、大小
- 标题：text-base md:text-lg lg:text-xl
- 正文：prose-p
- 小内容：text-sm
*/