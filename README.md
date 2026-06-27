# 🏠 Real Estate Lead Management Mini Dashboard

A mini CRUD dashboard for managing buyer enquiry leads, built for the **Fute Services** practical test.

---

## 🛠️ Tech Stack

| Layer        | Technology                          |
|--------------|--------------------------------------|
| **Frontend** | React (Vite) — plain CSS, no UI framework |
| **Backend**  | Node.js + Express.js                |
| **Database** | MongoDB (Mongoose)                  |

---

## 📂 Folder Structure

```
backend/
  config/db.js          → MongoDB connection
  models/Lead.js         → Lead schema (validation rules live here)
  controllers/           → business logic (CRUD + stats + login)
  routes/                → URL endpoints, point to controllers
  server.js              → app entry point

frontend/src/
  components/             → reusable pieces (SummaryCard, LeadForm, LeadDetails)
  pages/                  → Login.jsx, Dashboard.jsx
  services/api.js         → all fetch() calls to backend, in one place
```

---

## 🚀 Setup Instructions

### 1. MongoDB
Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (takes ~2 min), or use a local MongoDB instance.
Copy your connection string.

### 2. Backend
```bash
cd backend
npm install
cp .env.example .env
# edit .env and paste your MONGO_URI
npm run dev          # starts on http://localhost:5000
```

### 3. Frontend
```bash
cd frontend
npm install
npm run dev           # starts on http://localhost:3000
```

### 4. Login Credentials
| Field    | Value                       |
|----------|------------------------------|
| Email    | `admin@futeservices.com`     |
| Password | `admin123`                   |

---

## 📡 API Endpoints

| Method | Endpoint                  | Description                                                   |
|--------|----------------------------|-----------------------------------------------------------------|
| POST   | `/api/auth/login`          | Login                                                          |
| GET    | `/api/leads`                | Get all leads (supports `?search=&status=&unitType=&sortBy=`) |
| GET    | `/api/leads/:id`            | Get one lead                                                   |
| POST   | `/api/leads`                | Create lead                                                    |
| PUT    | `/api/leads/:id`            | Update lead                                                    |
| DELETE | `/api/leads/:id`            | Delete lead                                                    |
| GET    | `/api/leads/stats/summary`  | Dashboard counts                                               |

---

## 🔄 Architecture / Data Flow

1. React calls functions in `services/api.js`, which hit Express routes.
2. Routes forward the request to a controller function.
3. Controllers talk to MongoDB through the Mongoose `Lead` model (which enforces validation).
4. JSON response flows back to React, which updates state and re-renders the table/cards.

---

## ✨ Bonus Features Implemented

1. **Lead Details Page** — clicking "View" opens a modal with full lead info.
2. **Export CSV** — button exports the currently visible/filtered leads to a `.csv` file.
3. **Basic Analytics** — `/api/leads/stats/summary` returns live counts per status, shown as dashboard summary cards.

---

## ⚠️ Known Incomplete / Not Implemented

- Authentication is a dummy check + a fake base64 token, **not** real JWT (mentioned as acceptable in the test for time reasons). To make it production-ready: install `jsonwebtoken`, sign a real token on login, and add an Express middleware that verifies the token on protected routes.
- No automated tests written due to time constraints.
- Mobile responsiveness is basic (table scrolls horizontally on small screens) — could be improved with a card-based layout on mobile.

---

## 📸 Screenshots

> Add your screenshots to a folder named `screenshots/` at the project root, then they'll render below automatically on GitHub.

| | |
|---|---|
| **Login Page** <br> ![Login](screenshots/login.png) | **Dashboard Overview** <br> ![Dashboard](screenshots/dashboard.png) |
| **Lead Details Modal** <br> ![Lead Details](screenshots/lead-details.png) | **Add/Edit Lead Form** <br> ![Lead Form](screenshots/lead-form.png) |
| **Summary Cards / Analytics** <br> ![Summary](screenshots/summary.png) | **CSV Export** <br> ![Export](screenshots/export.png) |

---

## 🧪 Backend Quick Test (cURL)

```bash
# 1. Health check
curl http://localhost:5000/

# 2. Login - wrong password (should fail)
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@futeservices.com","password":"wrongpass"}'

# 3. Login - correct credentials (copy "token" from response)
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@futeservices.com","password":"admin123"}'

# 4. Leads WITHOUT token (should fail)
curl http://localhost:5000/api/leads

# 5. Verify token
curl http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer $TOKEN"

# 6. Get all leads (needs real MongoDB connected)
curl http://localhost:5000/api/leads \
  -H "Authorization: Bearer $TOKEN"

# 7. Create a lead (needs real MongoDB connected)
curl -X POST http://localhost:5000/api/leads \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"name":"Ravi Kumar","email":"ravi@example.com","phone":"9876543210","property":"Green Valley Residency","unitType":"2 BHK","budget":"75 Lakhs","source":"Website","status":"New"}'

# 8. Dashboard stats
curl http://localhost:5000/api/leads/stats/summary \
  -H "Authorization: Bearer $TOKEN"

# 9. Search
curl "http://localhost:5000/api/leads?search=Ravi" \
  -H "Authorization: Bearer $TOKEN"

# 10. Update (replace LEAD_ID with the _id from step 7)
curl -X PUT http://localhost:5000/api/leads/LEAD_ID \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"status":"Contacted"}'

# 11. Delete
curl -X DELETE http://localhost:5000/api/leads/LEAD_ID \
  -H "Authorization: Bearer $TOKEN"

# 12. Invalid token (should fail)
curl http://localhost:5000/api/leads \
  -H "Authorization: Bearer garbage.invalid.token"
```