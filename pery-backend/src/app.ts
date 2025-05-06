import express from 'express';
import cors from 'cors';
import introductionRouter from './routes/introduction';
import userRouter from './routes/user';
import { logger } from './utils/logger';

const app = express();

// CORS setup
const allowedOrigins = [
  'http://localhost:5173',        
  'https://your-frontend.vercel.app'
];

app.use(cors({
  origin: (origin, callback) => {
    // allow no origin (like curl/postman) or match from list
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

app.use(express.json());
app.use('/introduction', introductionRouter);
app.use('/user', userRouter);

app.use((err: any, req: express.Request, res: express.Response, _next: express.NextFunction) => {
    logger.error({
      err,
      path: req.path,
      method: req.method,
      status: err.status || 500,
      message: err.message
    }, 'Unhandled error');
  
    res.status(err.status || 500).json({
      message: err.message || 'Internal Server Error'
    });
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});
