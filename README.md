# Sasnaka Sansada Talent Show Portal

A premium, cinematic registration and entry submission portal for the Sasnaka Sansada Talent Show. Featuring a high-end "2.5D" theatre aesthetic with immersive animations and a seamless user journey.

## 🎭 Features

- **Cinematic Theatre Experience**: Immersive animations with curtains, spotlights, and floating dust (Framer Motion).
- **Advanced Category Navigation**: Staggered "orchestra-like" UI for viewing performance categories (Singing, Dancing, Acting, etc.).
- **Smart User Journey**: 
  - **See Details**: Learn about prizes, rules, and categories.
  - **Register**: Quick and elegant registration form.
  - **Flexible Entry**: Choice to "Upload Talent Now" or "Upload Later".
- **Database Integration**: Full backend integration with Neon PostgreSQL via Prisma ORM.
- **Mobile Responsive**: Perfectly optimized for all screen sizes, maintaining a premium feel on mobile.

## 🚀 Tech Stack

- **Frontend**: Next.js 15, React 19, Framer Motion, Lucide React
- **Styling**: Vanilla CSS (Modern custom design system)
- **Database**: Prisma ORM, Neon (PostgreSQL)
- **Language**: TypeScript

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+
- A Neon PostgreSQL account (or any PostgreSQL instance)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yasiru2003/sasnaka_ar-_project.git
   cd sasnaka_ar-_project
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL="your_postgresql_connection_string"
   ```

4. Initialize the database:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. Run the development server:
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) to see the result.

## 📱 Mobile Preview
Designed to feel like a premium app on mobile devices with touch-friendly interactions and a responsive layout.

---
Built with ❤️ for Sasnaka Sansada.
