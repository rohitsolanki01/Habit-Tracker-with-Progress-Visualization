# Habit Tracker with Progress Visualization

> Full-stack MERN habit tracker: track daily habits, mark completion, and visualize progress with charts.

---

## Table of Contents

* [Project Overview](#project-overview)
* [Features](#features)
* [Tech Stack](#tech-stack)
* [Architecture](#architecture)
* [Getting Started](#getting-started)

  * [Prerequisites](#prerequisites)
  * [Environment Variables](#environment-variables)
  * [Install & Run](#install--run)
* [API Endpoints](#api-endpoints)
* [Data Models (Example)](#data-models-example)
* [Frontend Structure](#frontend-structure)
* [Testing](#testing)
* [Deployment](#deployment)
* [Roadmap / Ideas](#roadmap--ideas)
* [Contributing](#contributing)
* [License](#license)
* [Contact](#contact)

---

## Project Overview

This project is a **Habit Tracker with Progress Visualization**. Users can create and manage habits, mark them as completed for specific dates, and view progress using charts (weekly/monthly views, streaks, completion rates). The goal is a clean, responsive web app that teaches authentication, CRUD operations, time-based tracking, and charting.

---

## Features

* User authentication (Register / Login) using JWT
* Create, Read, Update, Delete habits
* Mark habit completion for specific dates
* View completion history per habit
* Visualize progress with charts (Chart.js or Recharts)
* Calculate streaks and completion rates
* Responsive UI with light/dark mode
* Optional: reminders, habit categories, export data

---

## Tech Stack

* Frontend: React (Vite), Tailwind CSS
* Backend: Node.js, Express
* Database: MongoDB (Mongoose)
* Auth: JWT
* Charts: Chart.js or Recharts
* Optional: Framer Motion for animations

---

## Architecture

```
habit-tracker/
├── backend/            # Express API
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── server.js
├── frontend/           # React app (Vite)
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.jsx
└── README.md
```

---

## Getting Started

### Prerequisites

* Node.js (v18+ recommended)
* npm or yarn
* MongoDB (Atlas or local)

### Environment Variables (example `.env` for backend)

```
PORT=5000
MONGO_URI=mongodb+srv://<user>:<pass>@cluster0.mongodb.net/habit-tracker?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_here
```

### Install & Run

**Backend**

```bash
cd backend
npm install
npm run dev      # or npm start (use nodemon for dev)
```

**Frontend**

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173` (or whichever port Vite uses) for the frontend and `http://localhost:5000` for the API.

---

## API Endpoints (example)

> Base: `/api`

**Auth**

* `POST /api/auth/register` — Register a user
* `POST /api/auth/login` — Login (returns JWT)

**Habits** (authenticated)

* `GET /api/habits` — Get all habits for user
* `POST /api/habits` — Create a new habit
* `GET /api/habits/:id` — Get single habit with progress
* `PUT /api/habits/:id` — Update habit
* `DELETE /api/habits/:id` — Delete habit

**Progress**

* `POST /api/habits/:id/complete` — Mark habit completed for a date (body: `{ date: 'YYYY-MM-DD' }`)
* `DELETE /api/habits/:id/complete` — Unmark completion for a date (body: `{ date: 'YYYY-MM-DD' }`)

---

## Data Models (Example)

**User**

```js
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { timestamps: true });
```

**Habit**

```js
const HabitSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  description: { type: String },
  frequency: { type: String, enum: ['daily','weekly','custom'], default: 'daily' },
  completedDates: [{ type: Date }],
  createdAt: { type: Date, default: Date.now }
});
```

---

## Frontend Structure (suggested)

```
src/
├── components/
│   ├── AuthForm.jsx
│   ├── HabitCard.jsx
│   ├── AddHabitForm.jsx
│   └── ProgressChart.jsx
├── pages/
│   ├── Dashboard.jsx
│   ├── HabitPage.jsx
│   └── Settings.jsx
├── context/
│   └── AuthContext.jsx
└── App.jsx
```

Key UX pieces:

* Dashboard: summary cards + charts
* Habit list: quick toggle for today
* Habit detail: calendar or list of completed dates

---

## Testing

* Unit-test backend controllers with Jest & Supertest
* Test React components with React Testing Library

---

## Deployment

* Backend: deploy to Render, Heroku, Railway, or DigitalOcean App Platform
* Frontend: Vercel, Netlify, or GitHub Pages (if static)
* Use environment variables on the host and enable HTTPS

---

## Roadmap / Ideas

* Push/Email reminders
* Habit categories & icons
* Social / sharing features (leaderboard)
* CSV export / import
* Dark mode + accessibility improvements

---

## Contributing

1. Fork the repo
2. Create a feature branch `feature/your-feature`
3. Commit your changes and open a PR

Please follow the code style and include tests where relevant.

---

## License

MIT © Your Name

---

## Contact

Created by **Your Name** — open to feedback. Replace contact info in this README with your email or GitHub handle.
