# 🚀 JobSync – Job Application Tracker

JobSync is a full-stack job application tracking platform that helps users manage their job search with structured tracking, analytics, and visual insights.

This project was built as a production-style MVP using a modern full-stack JavaScript stack.

---

## ✨ Features

- 🔐 User Authentication (Register / Login)
- 🔑 JWT-based protected routes
- 📋 Create, update, delete job applications
- 📊 Dashboard with application statistics
- 🥧 Pie chart visualization by application status
- 📈 Application funnel (conversion tracking)
- 🗂 Filter and organize job entries
- 🌙 Responsive UI (dark/light mode compatible)

---

## 🛠 Tech Stack

### Frontend
- React (Vite)
- Chart.js (Data visualization)
- Modern CSS / Flexbox layout

### Backend
- Node.js
- Express
- Prisma ORM
- JWT Authentication
- PostgreSQL

### Database
- PostgreSQL (Neon in production)

### Deployment
- Vercel (Frontend)
- Render (Backend)

---

## 📂 Project Structure

```
jobsync/
│
├── client/         # React frontend (Vite)
│
├── server/         # Express backend
│   ├── routes/
│   ├── middleware/
│   ├── prisma/
│
└── README.md
```

---

## ⚙️ Environment Variables

Create a `.env` file inside the `server/` folder:

```
DATABASE_URL=your_postgres_connection_string
JWT_SECRET=your_secret_key
```

Create a `.env` file inside the `client/` folder:

```
VITE_API_URL=http://localhost:5000
```

---

## 🧪 Running Locally

### 1️⃣ Clone the repo

```bash
git clone https://github.com/yourusername/jobsync.git
cd jobsync
```

### 2️⃣ Install backend dependencies

```bash
cd server
npm install
npx prisma generate
npx prisma migrate dev
npm run dev
```

### 3️⃣ Install frontend dependencies

```bash
cd client
npm install
npm run dev
```

Frontend runs on:
```
http://localhost:5173
```

Backend runs on:
```
http://localhost:5000
```

---

## 📊 Dashboard Metrics

The dashboard visualizes:

- Total Applications
- Applied
- Interviewing
- Offers
- Rejected
- Application Funnel Conversion Rates

These insights help users understand their job search performance and identify bottlenecks.

---

## 🔒 Authentication Flow

- Passwords are hashed before storage
- JWT tokens are issued on login
- Protected routes require valid Bearer token
- Tokens stored client-side and attached via custom `authFetch`

---

## 🚀 Deployment

Production stack:

- Frontend deployed on Vercel
- Backend deployed on Render
- PostgreSQL hosted on Neon

Environment variables must be configured in both deployment platforms.

---

## 📈 Future Improvements

- Email verification
- Password reset flow
- Resume version tracking
- AI-powered resume feedback
- Chrome extension for auto-importing jobs
- Advanced analytics & conversion insights

---

## 🧠 Why This Project?

Job searching is stressful and unstructured. JobSync turns the process into a trackable system with measurable progress.

This project demonstrates:

- Full-stack architecture
- Secure authentication
- Database modeling with Prisma
- API design
- Data visualization
- Deployment workflow

---

## 👤 Author

Built by Abdoul Ba  