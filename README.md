# CleanNest Home Services — MERN Stack Web Application

A full-featured, realistic local business website and management platform for **CleanNest Home Services**, a professional cleaning service company based in **Ahmedabad, Gujarat, India**.

Built with the **MERN Stack** (MongoDB, Express.js, React.js, Node.js), Tailwind CSS, and REST API architecture.

---

## 🌟 Features Overview

### 🏡 Public Business Website
- **Home Page**: Dynamic hero section, popular cleaning services listing, why choose us cards, step-by-step process, customer testimonials, Ahmedabad coverage areas, and FAQ accordion.
- **About Us**: Company history, mission & vision, quality assurance metrics, and leadership team overview.
- **Services Catalog & Detail Pages**: Comprehensive listing with search and category filters (`Home Cleaning`, `Specialized Cleaning`, `Commercial & Office`). Dynamic service pages (`/services/:slug`) featuring package tiers, included/excluded checklists, process steps, service FAQs, and instant booking CTA.
- **Pricing & Packages Page**: Transparent package comparison (Basic, Standard, Premium) with clear size/condition disclaimers.
- **Interactive Multi-Step Booking System**: Real-time slot availability check against MongoDB to prevent duplicate bookings, property type selection, room size, date picker, Ahmedabad address input, and unique Booking ID generation (`CN-2026-XXXX`).
- **Contact & Enquiries**: Working contact form saving enquiries to MongoDB, helpline details, and office location in Ahmedabad.
- **Reviews & Feedback**: Approved customer reviews display with rating filters. Logged-in users can write and submit new reviews.
- **Blog & Articles**: Knowledge articles and cleaning guides for Ahmedabad homes (`/blog/:slug`).
- **User Authentication**: Secure Register, Login, and JWT session handling with bcrypt password hashing.

### 👤 Customer Dashboard (`/dashboard`)
- **Bookings Overview**: View all past and upcoming reservations with real-time status badges (`Pending`, `Confirmed`, `In Progress`, `Completed`, `Cancelled`).
- **Booking Cancellation**: Self-service cancellation for pending/confirmed bookings.
- **Booking Details Modal**: Complete reference summary, address, date, time slot, and amount.
- **Profile & Address Manager**: Update name, phone number, street address, locality in Ahmedabad, and password.

### 🛡️ Admin Dashboard (`/admin`)
- **Real-Time Analytics Metrics**: Total Revenue (₹), Total Bookings, Pending Requests, Completed Jobs, Registered Customers, Total Enquiries, and Reviews.
- **Manage Bookings**: View, search, filter, and update booking status (`Pending` ➔ `Confirmed` ➔ `In Progress` ➔ `Completed` ➔ `Cancelled`).
- **Manage Services**: Add new cleaning service, edit pricing/duration/images, and delete existing services.
- **Manage Users**: View customer accounts list, role badges, and registration dates.
- **Manage Reviews**: Inspect and approve/delete customer reviews.
- **Manage Enquiries**: View customer messages and update status (`New`, `In Progress`, `Resolved`).
- **Manage Articles**: Publish, edit, or remove hygiene articles.

---

## 🔑 Demo Access Credentials

To test the application without creating a new user:

| Account Type | Email | Password | Access Level |
| :--- | :--- | :--- | :--- |
| **Admin Account** | `admin@cleannest.in` | `Admin@123456` | Full Admin Dashboard (`/admin`) |
| **Customer Account** | `rahul.patel@gmail.com` | `Customer@123456` | Customer Dashboard (`/dashboard`) |

*(Note: The Login page also features one-click demo buttons to auto-fill credentials!)*

---

## 🛠️ Technology Stack

- **Frontend**: React.js 18, Vite, React Router DOM v6, Axios, Tailwind CSS, Lucide Icons
- **Backend**: Node.js, Express.js, Mongoose, JSON Web Tokens (JWT), BcryptJS, CORS, Dotenv
- **Database**: MongoDB (Local or Atlas instance)

---

## 📂 Project Structure

```
CleanNest_Home/
├── client/
│   ├── src/
│   │   ├── components/       # Navbar, Footer, HeroSection, ServiceCard, TestimonialCard, etc.
│   │   ├── context/          # AuthContext provider
│   │   ├── pages/            # Home, About, Services, ServiceDetails, Booking, Admin, etc.
│   │   ├── services/         # Axios API instance
│   │   ├── App.jsx           # App routing
│   │   ├── main.jsx          # React entry point
│   │   └── index.css         # Tailwind & custom CSS
│   └── package.json
├── server/
│   ├── config/               # MongoDB connection (db.js)
│   ├── controllers/          # Auth, Service, Booking, Review, Contact, Article, Admin
│   ├── middleware/           # JWT protect & admin role check
│   ├── models/               # User, Service, Booking, Review, Contact, Article schemas
│   ├── routes/               # REST API endpoints
│   ├── utils/                # Database seed script (seed.js)
│   ├── app.js                # Express app setup
│   ├── server.js             # Server startup
│   ├── .env                  # Environment configuration
│   └── package.json
├── .env.example
└── README.md
```

---

## 🚀 Quick Start & Installation

### 1. Prerequisites
- **Node.js**: v18+ installed
- **MongoDB**: Running locally on `mongodb://127.0.0.1:27017`

### 2. Backend Setup
```bash
cd server
npm install
npm run seed     # Populate database with 8 services, sample bookings, reviews, and admin user
npm run dev      # Starts Express server on http://localhost:5000
```

### 3. Frontend Setup
In a new terminal window:
```bash
cd client
npm install
npm run dev      # Starts Vite React app on http://localhost:5173
```

---

## 🌐 API Endpoints Summary

- `POST /api/auth/register` — Register new customer
- `POST /api/auth/login` — Login user & return JWT
- `GET /api/auth/me` — Get current logged-in user
- `GET /api/services` — Fetch active cleaning services
- `GET /api/services/:slug` — Fetch single service details
- `GET /api/bookings/check-availability` — Check time slot availability
- `POST /api/bookings` — Create new booking
- `GET /api/bookings/my-bookings` — Get logged-in user's bookings
- `GET /api/admin/stats` — Admin dashboard analytics
- `GET /api/admin/bookings` — Admin list all bookings
- `PUT /api/admin/bookings/:id/status` — Update booking status
- `GET /api/reviews` — Fetch customer reviews
- `POST /api/reviews` — Submit new review
- `POST /api/contact` — Submit customer enquiry
