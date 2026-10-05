# DNA INSIGHT - DNA Sequence Pattern Analysis Platform

![DNA Insight Banner](https://via.placeholder.com/1200x400?text=DNA+INSIGHT)

An interactive, production-ready full-stack platform for understanding and analyzing DNA sequence pattern matching using the **Knuth-Morris-Pratt (KMP)** and **Rabin-Karp** algorithms.

Built for advanced software engineering and biological analysis.

---

## 🚀 Features

### Core Algorithms (DAA Focus)
- **Knuth-Morris-Pratt (KMP)**: Implementation utilizing LPS array (O(N+M) time complexity).
- **Rabin-Karp**: Implementation utilizing a Rolling Hash function to match patterns efficiently.
- **Performance Analysis**: Generate large-scale dynamic datasets to chart and compare real execution times dynamically.
- **Interactive Visualizations**: DNA pattern highlighting, algorithm comparison matrix, and educational learning center.

### Software Engineering (Full-Stack Features)
- **Secure Authentication**: JWT-based stateless authentication stored in HTTP-only cookies. Passwords encrypted using bcrypt.
- **User Dashboard**: Personalized statistics, tracking total analyses and most-used algorithms.
- **Private History**: Every analysis run by a user is saved securely to their account in MongoDB.
- **Responsive UI**: Built with React, Tailwind CSS, Framer Motion, and Lucide Icons.

---

## 🛠️ Technology Stack

**Frontend:**
- React (Vite)
- Tailwind CSS v4
- Framer Motion (Animations)
- Recharts (Data Visualization)
- React Router (Protected Routing)
- Axios & React Hot Toast

**Backend:**
- Node.js & Express.js
- MongoDB & Mongoose (ODM)
- JSON Web Tokens (JWT) & bcrypt
- Helmet & Express Rate Limit (Security)

---

## 📂 Project Structure

```text
dna-sequence-analyzer/
├── frontend/
│   ├── src/
│   │   ├── components/      # Reusable UI components & ProtectedRoute
│   │   ├── context/         # AuthContext for global state
│   │   ├── pages/           # Dashboard, Analyzer, History, Algorithms, Home, Auth
│   │   ├── services/        # Axios API configurations
│   │   ├── App.jsx          # Router and Navbar
│   │   └── index.css        # Tailwind v4 configuration
├── backend/
│   ├── algorithms/          # Core KMP and Rabin-Karp implementations
│   ├── controllers/         # Logic for auth, analysis, history, performance
│   ├── middleware/          # JWT protect, admin, error handlers
│   ├── models/              # Mongoose schemas (User, AnalysisHistory, etc.)
│   ├── routes/              # Express API route definitions
│   └── server.js            # Express application entry point
└── README.md
```

---

## ⚙️ Environment Variables

### Backend (`backend/.env`)
Create a `.env` file in the `backend` directory:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

### Frontend (`frontend/.env`)
Create a `.env` file in the `frontend` directory:
```env
VITE_API_URL=http://localhost:5000/api
```

---

## 🚀 Local Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/dna-insight.git
   cd dna-insight
   ```

2. **Setup Backend:**
   ```bash
   cd backend
   npm install
   npm run dev
   ```

3. **Setup Frontend:**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

4. **Access the application:**
   Open `http://localhost:5173` in your browser.

---

## ☁️ Deployment Guide

### Frontend (Vercel)
1. Push your code to GitHub.
2. Import the `frontend` directory as a new project in Vercel.
3. Add the Environment Variable `VITE_API_URL` pointing to your production backend (e.g., `https://your-backend.onrender.com/api`).
4. Deploy!

### Backend (Render / Heroku)
1. Deploy the `backend` directory as a Web Service.
2. Add all backend environment variables (`MONGODB_URI`, `JWT_SECRET`, `CLIENT_URL` pointing to Vercel).
3. Ensure `NODE_ENV=production`.

---

## 🔒 Security Measures Implemented
- **CORS Configuration**: Restricted to `CLIENT_URL` with credentials enabled.
- **HTTP-Only Cookies**: JWTs are stored in secure cookies preventing XSS attacks.
- **Password Hashing**: `bcrypt` with salt rounds.
- **Helmet.js**: Sets secure HTTP headers.
- **Mongoose Validation**: Prevents NoSQL injection and malformed data.

---

*Note: This platform is not intended for actual medical or biological diagnosis.*
