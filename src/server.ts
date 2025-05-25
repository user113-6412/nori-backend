import express from 'express';
import cors from 'cors';
import authMiddleware from "./middleware/authMiddleware";
import authRoutes from "./routes/authRoutes";
import blogRoutes from "./routes/blogRoutes";
import intakeRoutes from "./routes/intakeRoutes";
import prisma from './prismaClient';
const app = express();
const PORT = process.env.PORT || 5510;

// Test database connection
async function testConnection() {
  try {
    await prisma.$connect();
    console.log('Successfully connected to database');
  } catch (error) {
    console.error('Failed to connect to database:', error);
    process.exit(1);
  }
}

// Middleware
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(express.json());


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/intake', authMiddleware as express.RequestHandler, intakeRoutes);
app.use('/api/blog', blogRoutes);

// Start server
async function startServer() {
  await testConnection();
  
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Test the server by visiting: http://localhost:${PORT}`);
  });
}

startServer().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});

