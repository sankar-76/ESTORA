# ESTORA – Luxury Real Estate Platform

React + TypeScript + Vite + Tailwind CSS v4.

## Run karne ke steps

1. Node.js install karo (v18 ya usse upar): https://nodejs.org
2. Zip extract karo, phir terminal/CMD us folder me kholo:
   ```bash
   cd estora-luxury-real-estate
   npm install
   npm run dev
   ```
3. Browser me kholo: http://localhost:5173

## Production build
```bash
npm run build     # output: dist/
npm run preview   # build ko locally dekhne ke liye
```

## Folder structure
```
src/
├── main.tsx                 # entry point
├── App.tsx                  # router + global state (saved / compare)
├── index.css                # Tailwind import
├── data/properties.ts       # 14 sample properties
├── hooks/useHashLocation.ts # hash-based router hook
├── utils/                   # storage helpers, global styles injection
├── components/              # Icon, Navbar, PropertyCard, Footer
└── pages/                   # Home, Properties, PropertyDetails, Saved,
                             # Compare, ScheduleViewing, About, Contact
```

Note: Fonts (Google Fonts) aur property images (Unsplash) internet se load hote hain.
