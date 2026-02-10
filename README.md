# JobSync

JobSync is a centralized job application tracking system that helps users manage, organize, and monitor their job search in one place.

Instead of juggling confirmations from LinkedIn, Indeed, company websites, and email threads, JobSync provides a single dashboard where all applications can be viewed, updated, and tracked efficiently.

---

## 🚀 Overview

JobSync allows users to:

- Manually log job applications
- Automatically import applications from Gmail
- Capture job applications using a Chrome extension
- Track application statuses across multiple platforms
- Manage notes and application details in one centralized dashboard

The goal is to streamline the job search process by eliminating manual tracking across spreadsheets, email threads, and various job boards.

---

## ✨ Core Features

### 📊 Application Dashboard
- View all logged applications in one interface
- Filter and sort by status, company, or date
- Update application status (Applied, Interviewing, Offer, Rejected)
- Edit or delete job entries

### 📝 Manual Job Entry
Users can log job applications with structured fields:

- Company
- Job Title
- Location
- Job URL
- Application Status
- Date Applied
- Job Type
- Salary Range
- Notes
- Source

### 📧 Gmail Integration
- Secure Google OAuth authentication
- Fetch job application confirmation emails
- Parse relevant metadata
- Automatically create job entries
- Prevent duplicate entries

### 🌐 Chrome Extension
- Detect job information directly from job boards
- Capture structured job data when applying
- Send data securely to backend API
- Automatically log applications

---

## 🛠 Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- Axios / Fetch API

### Backend
- Node.js
- Express

### Database
- PostgreSQL

### Authentication
- Google OAuth 2.0

### Integrations
- Gmail API
- Chrome Extension (Manifest v3)

---

## 🗂 Data Model

Each job entry follows this schema:

- id
- userId
- company
- jobTitle
- location
- jobUrl
- applicationStatus
- dateApplied
- jobType
- salaryRange
- notes
- source
- createdAt
- updatedAt

This structure ensures consistency, scalability, and clean API design.

---

## 🏗 Architecture

JobSync follows a modular full-stack architecture:

- RESTful API for job CRUD operations
- Secure authentication and protected routes
- Structured database schema
- Clean separation between frontend, backend, and browser extension
- Scalable design for future integrations

---

## 🔮 Future Improvements

- Advanced filtering and analytics
- Notification system
- Multi-platform browser extension support
- Enhanced parsing logic for additional job platforms

