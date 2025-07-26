// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'kdrama': "url('https://www.google.com/url?sa=i&url=https%3A%2F%2Fwallpapersok.com%2Fwallpapers%2Fadorable-kdrama-couple-tipbc4z2qc7up9y9.html&psig=AOvVaw25pUZDFVfQST_wG2dBcXnf&ust=1753609536665000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCPi6_eue2o4DFQAAAAAdAAAAABAE')", // 👈 your direct URL here
      },
      colors: {
        lavender: {
          light: '#E6E6FA',
          DEFAULT: '#B57EDC',
          dark: '#8A2BE2',
        },
      },
    },
  },
  plugins: [],
}
