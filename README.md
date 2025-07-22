# PureTideNori - Iodine Tracker & Blog Platform

A modern web app for tracking your daily nori (seaweed) intake and sharing your journey through personal blog posts. Built for health-conscious users who want to monitor their iodine consumption and connect with a like-minded community.

---

## Features

- **User Authentication**: Secure signup and login with JWT-based sessions
- **Personal Blog**: Create, edit, and manage private or public blog posts
- **Nori Intake Tracker**: Interactive calendar to log and visualize daily nori sheet consumption
- **Public Blog Feed**: Browse posts shared by the community
- **Responsive UI**: Clean, mobile-friendly design with Tailwind CSS

---

## Tech Stack

### Frontend
- **Next.js 14** (App Router, TypeScript)
- **Tailwind CSS** for styling
- **React Context** for authentication state
- **Fetch API** for backend communication

### Backend
- **Node.js** with **Express** (TypeScript)
- **PostgreSQL** (managed via Render)
- **Prisma ORM** for database access
- **JWT** for authentication
- **CORS** for secure cross-origin requests

---

## Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL database (e.g., Render, Supabase, or local)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd <repository-url>/frontend or cd <repository-url>/backend
   ```

2. **Install dependencies**
   ```bash
   # Frontend
   cd frontend
   npm install
   
   # Backend
   cd ../backend
   npm install
   ```

3. **Set up environment variables**

   Create `.env` files in both frontend and backend directories:

   **Backend (.env)**
   ```env
   DATABASE_URL=postgresql://<user>:<password>@<host>:<port>/<db>
   JWT_SECRET=your_jwt_secret_here
   PORT=10000
   NODE_ENV=development
   ```

   **Frontend (.env.local)**
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:10000/api
   ```

4. **Run database migrations**
   ```bash
   cd backend
   npx prisma migrate dev
   ```

5. **Start the development servers**
   ```bash
   # Backend (Terminal 1)
   cd backend
   npm run dev
   
   # Frontend (Terminal 2)
   cd frontend
   npm run dev
   ```

6. **Open your browser**
   - Frontend: http://localhost:3000
   - Backend: http://localhost:10000

---

## API Endpoints

### Auth
- `POST /api/auth/signup` — Register a new user
- `POST /api/auth/login` — Login and receive JWT

### Blog
- `GET /api/blog/public` — Get all public blogs
- `GET /api/blog/public/:id` — Get a single public blog by ID
- `GET /api/blog` — Get all blogs for the logged-in user (private)
- `POST /api/blog` — Create a new blog (auth required)
- `PUT /api/blog/:id` — Update a blog (auth required)
- `DELETE /api/blog/:id` — Delete a blog (auth required)

### Intake Tracker
- `GET /api/intake` — Get all intake records for the logged-in user
- `POST /api/intake` — Create a new intake record
- `PUT /api/intake/:id` — Update an intake record
- `DELETE /api/intake/:id` — Delete an intake record

All endpoints (except public blog routes and signup/login) require an `Authorization: Bearer <token>` header.

---

## Project Structure

```
nori-app-node/
├── frontend/
│   ├── app/
│   │   ├── (home)/
│   │   ├── blog/
│   │   ├── board/                # Private blog dashboard
│   │   ├── nori-tracker/         # Intake tracker calendar
│   │   ├── components/           # UI components (PrivateBlogs, PublicBlogs, etc.)
│   │   ├── context/              # Auth context
│   │   └── ...
│   ├── public/
│   ├── globals.css
│   └── ...
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   │   ├── authRoutes.ts
│   │   │   ├── blogRoutes.ts
│   │   │   └── intakeRoutes.ts
│   │   ├── middleware/
│   │   │   └── authMiddleware.ts
│   │   ├── prismaClient.ts
│   │   └── server.ts
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── migrations/
│   └── ...
└── README.md
```

---

## Environment Variables

| Variable            | Description                        | Required |
|---------------------|------------------------------------|----------|
| `DATABASE_URL`      | PostgreSQL connection string        | Yes      |
| `JWT_SECRET`        | JWT secret for authentication       | Yes      |
| `PORT`              | Backend server port                 | No (10000)|
| `NODE_ENV`          | Node environment                    | No       |
| `NEXT_PUBLIC_API_URL` | Frontend API base URL             | Yes      |

---

## Features in Detail

### User Authentication
- Secure registration and login with hashed passwords (bcrypt)
- JWT-based session management
- Auth middleware for protected routes

### Blog Platform
- Create, edit, and delete personal blog posts
- Toggle privacy: share posts publicly or keep them private
- Browse public blog feed
- Responsive, accessible UI

### Nori Intake Tracker
- Calendar interface to log daily nori sheet consumption
- Edit or update intake for any day
- Visual feedback for tracked days
- Personalized to each user

---

## Development

### Code Conventions
- TypeScript throughout (frontend & backend)
- Function names prefixed with `fn` in frontend React components
- Consistent error handling and status codes
- Modular route and middleware structure

### Adding New Features
1. Create new route in `backend/src/routes/`
2. Add controller logic or extend route handler
3. Update frontend components as needed

---

## Deployment

### Frontend (Vercel recommended)
1. Connect GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Backend (Render/Railway recommended)
1. Connect GitHub repository
2. Set environment variables
3. Configure build command: `npm install && npx prisma migrate deploy`
4. Set start command: `npm start`

---

## License

MIT License - see LICENSE file for details.

---

## Support

For support, email viktorasjarm@gmail.com or create an issue in the repository.
