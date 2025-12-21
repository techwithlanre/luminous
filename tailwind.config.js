tailwind.config = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Space Grotesk', 'sans-serif'],
      },
      colors: {
        primary: '#FF4D00', // The vibrant orange from the screenshot
        secondary: '#FFFFFF', // White
        accent: '#FF4D00', // Orange as accent
        dark: '#000000', // Pure Black background
        'dark-lighter': '#0a0a0a', // Slightly lighter black for contrast
        'surface': '#111111', // Card background
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
}