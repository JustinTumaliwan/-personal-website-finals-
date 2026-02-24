# 🏎️ JT24: High-Performance F1 Portfolio

Welcome to the paddock! This is a full-stack, high-performance personal portfolio designed with an immersive F1 telemetry dashboard aesthetic. It features dynamic scroll-spy crossfading backgrounds, buttery-smooth scrolling, interactive interactive components, and a live "Pit Wall" guestbook connected to a cloud database.

Built as a Web Programming Finals Project for Asia Pacific College (IT242).

## ⚙️ The Power Unit (Tech Stack)

**Chassis (Frontend):**
* React 18 + Vite
* Tailwind CSS (Styling & Custom UI)
* Framer Motion (Staggered reveals & Lando Norris-style fan cards)
* Lenis (@studio-freight/react-lenis) for premium smooth scrolling
* Lucide React (Telemetry iconography)

**Engine & Fuel (Backend & Database):**
* NestJS (REST API)
* Supabase (PostgreSQL Database)
* Hosted on Render (API) and Vercel (Frontend)

## 🚦 Key Features
* **Dynamic Crossfading:** The background image smoothly transitions based on the active section in the viewport.
* **Off-Track Activities:** Interactive, fanning 6-card spread that lifts and reveals on hover.
* **Audio Telemetry:** Embedded custom tracklist that links directly to official Spotify previews with animated EQ bars.
* **Live Pit Radio (Guestbook):** A fully operational POST/GET transmission system allowing visitors to leave live messages stored in Supabase.

## 🏆 Inspirations & References
This dashboard's aggressive, high-contrast UI and smooth interactive elements were heavily inspired by the official websites of Formula 1 drivers:
* **[Lando Norris Official Website](https://landonorris.com/)** - Reference for the smooth scrolling, bold typography, and the interactive fanning card effect.
* **[Charles Leclerc Official Website](https://www.charlesleclerc.com/)** - Reference for the sleek, dark-mode telemetry aesthetic and seamless transitions.
* **[Gemini AI Co-Pilot Log](https://gemini.google.com/share/a3dddab53ef5)** - A massive shoutout to Gemini for assisting as the race engineer on this build, helping to navigate complex React 19 downgrades, Lenis scroll configurations, and full-stack deployment troubleshooting. 

## 🔧 Constructor Details
**Justin Neil G. Tumaliwan** Full-Stack Developer | Asia Pacific College  
*Engineered to Build.*

---

### Local Pit Stop (How to run locally)
1. Clone the repository.
2. Navigate to the frontend: `cd f1-portfolio-frontend`
3. Install dependencies: `npm install --legacy-peer-deps`
4. Start the engine: `npm run dev`
