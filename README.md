# 🏎️ DriveFleet Client — Frontend Web Application

[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.2-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38BDF8?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Firebase](https://img.shields.io/badge/Firebase_Auth-v10-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)

The frontend of **DriveFleet** is a modern, responsive single-page web application built using **React 18**, **Vite**, **Tailwind CSS**, and **Framer Motion**. It delivers a luxury rental agency user interface featuring real-time vehicle exploration, dynamic price estimations, interactive booking modals, and dark/light theme switching.

---

## 🌟 Key Features

- **Dynamic Fleet Exploration**: Real-time vehicle keyword search (`$regex`) and category filtering (`$in`) with instant price/date sorting.
- **Interactive Booking Modal**: Date range selection, automatic cost calculation, chauffeur options, and special requests.
- **Fleet Owner CRUD Dashboard**: Form validation for listing new cars, inline modal editing, and SweetAlert2 confirmation dialogs for safe deletion.
- **Theme Customization**: Dark/Light mode toggle powered by Tailwind CSS dark variant and local storage persistence.
- **Authentication Flow**: Integration with Firebase Authentication (Email/Password & Google Sign-In) combined with HTTPOnly JWT token exchanges.
- **Fluid UI Animations**: Micro-interactions, slide-in drawers, modal popups, and smooth page transitions using Framer Motion.

---

## 🛠 Tech Stack

- **Core Library**: React 18
- **Build Tool**: Vite 5
- **Styling & Icons**: Tailwind CSS, PostCSS, Autoprefixer, Lucide React
- **Routing**: React Router v6
- **State & Auth**: React Context API (`AuthProvider`), Firebase Auth SDK
- **HTTP Client**: Axios (configured with `withCredentials: true`)
- **UI Notifications**: SweetAlert2 & React Hot Toast

---

## 📁 Folder Structure

```text
client/
├── src/
│   ├── components/         # Reusable layout & UI components
│   │   ├── BookingModal.jsx
│   │   ├── CarCard.jsx
│   │   ├── EditCarModal.jsx
│   │   ├── Footer.jsx
│   │   ├── LoadingSpinner.jsx
│   │   ├── Navbar.jsx
│   │   └── ThemeToggle.jsx
│   ├── firebase/           # Firebase initialization
│   │   └── firebase.config.js
│   ├── pages/              # Application view routes
│   │   ├── AddCar.jsx
│   │   ├── CarDetails.jsx
│   │   ├── ExploreCars.jsx
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── MyAddedCars.jsx
│   │   ├── MyBookings.jsx
│   │   ├── NotFound.jsx
│   │   └── Register.jsx
│   ├── providers/          # React Context API providers
│   │   └── AuthProvider.jsx
│   ├── routes/             # BrowserRouter config & PrivateRoute wrapper
│   │   ├── PrivateRoute.jsx
│   │   └── Routes.jsx
│   ├── App.jsx             # Main layout shell
│   ├── main.jsx            # Entry point
│   └── index.css           # Global Tailwind CSS definitions
├── .env.example            # Environment setup sample
├── tailwind.config.js       # Design system tokens
├── vite.config.js          # Vite config
└── package.json
```

---

## ⚡ Getting Started Locally

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the root of the `client` directory:

```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
VITE_API_URL=http://localhost:5000
```

### 3. Run Development Server
```bash
npm run dev
```

Visit `http://localhost:5173` in your browser.

---

## 🚀 Available Scripts

- `npm run dev`: Starts Vite local development server with HMR.
- `npm run build`: Compiles production-ready bundle.
- `npm run preview`: Previews production build locally.
- `npm run lint`: Runs ESLint code quality check.
