import express from 'express';
import cors from 'cors';
import authMiddleware from "./middleware/authMiddleware";
import authRoutes from "./routes/authRoutes";
import blogRoutes from "./routes/blogRoutes";
import intakeRoutes from "./routes/intakeRoutes";
import prisma from './prismaClient';
const app = express();
const port = process.env.PORT && !isNaN(Number(process.env.PORT))
    ? parseInt(process.env.PORT)
    : 10000;

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
    origin: ['http://localhost:3000', 'https://www.puretidenori.co.uk', 'https://puretidenori.co.uk'],
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
  
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  
  });
}

startServer().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});

