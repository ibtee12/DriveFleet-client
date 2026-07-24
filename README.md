# DriveFleet - Premium Car Rental & Fleet Management Platform

[![Live Site](https://img.shields.io/badge/Live_Site-DriveFleet-2563eb?style=for-the-badge&logo=vercel)](https://drivefleet-client.vercel.app)

**DriveFleet** is a full-stack, recruiter-grade Car Rental Platform that enables users to seamlessly explore available vehicles, book rides, list personal cars for rental, and manage active bookings with secure authentication and modern UI/UX design.

---

## 🌟 Key Features

- **Dynamic Fleet Showcase & Search**: Browse luxury sedans, electric supercars, and SUVs with instant real-time search (using MongoDB `$regex`) and category filtering (`$in` operator).
- **Secure Authentication & JWT Cookie Protection**: Complete user authentication powered by Firebase (Email/Password & Google Sign-In) combined with HTTPOnly JWT cookies for protected API routes.
- **Full Vehicle CRUD Operations**: Vehicle owners can list new cars, update rental rates/descriptions/availability, and safely delete listings with a sweetalert confirmation modal.
- **Smart Booking System with Counter**: Instant vehicle booking system supporting chauffeur options, special notes, and automatic atomic `bookingCount` increments using MongoDB `$inc`.
- **Aesthetic Modern UI & Dark/Light Theme Toggle**: Built with Framer Motion animations, glassmorphism design, custom toasts, responsive mobile drawers, and recruiter-friendly styling.

---

## 🛠 Tech Stack

- **Client**: React 18, Vite, Tailwind CSS, Lucide Icons, Framer Motion, Axios, SweetAlert2, React Hot Toast, Firebase Auth.
- **Server**: Node.js, Express.js, MongoDB Driver, JSON Web Tokens (JWT), Cookie Parser, CORS.

---

## 🚀 Live Links & Repositories

- **Client Repository**: [GitHub Client Code](https://github.com/<your-username>/DriveFleet-client)
- **Server Repository**: [GitHub Server Code](https://github.com/<your-username>/DriveFleet-server)
- **Live Demo Site**: [DriveFleet Application](https://drivefleet-client.vercel.app)
