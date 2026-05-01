/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#7C3AED",
          50: "#f5f3ff",
          100: "#ede9fe",
          200: "#ddd6fe",
          300: "#c4b5fd",
          400: "#a78bfa",
          500: "#8b5cf6",
          600: "#7c3aed",
          700: "#6d28d9",
          800: "#5b21b6",
          900: "#4c1d95",
          950: "#2e1065",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.foreground'),
            a: {
              color: theme('colors.brand.600'),
              textDecoration: 'none',
              '&:hover': {
                color: theme('colors.brand.700'),
                textDecoration: 'underline',
              },
            },
            'h1, h2, h3, h4': {
              color: theme('colors.foreground'),
              fontWeight: '700',
              letterSpacing: '-0.025em',
            },
            p: {
              lineHeight: '1.8',
            },
            img: {
              borderRadius: '8px',
              width: '100%',
              maxWidth: '800px',
              marginLeft: 'auto',
              marginRight: 'auto',
              display: 'block',
            },
          },
        },
        dark: {
          css: {
            color: theme('colors.gray.300'),
            a: {
              color: theme('colors.brand.400'),
              '&:hover': {
                color: theme('colors.brand.300'),
              },
            },
            'h1, h2, h3, h4, strong': {
              color: theme('colors.gray.100'),
              fontWeight: '700',
            },
            code: {
              color: theme('colors.gray.200'),
              backgroundColor: theme('colors.gray.800'),
            },
            blockquote: {
              color: theme('colors.gray.300'),
              borderLeftColor: theme('colors.gray.700'),
            },
          },
        },
      }),
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
  ],
};
