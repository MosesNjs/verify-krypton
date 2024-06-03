import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import mainRouter from './routes/main.route.js';
import connectDB from './configs/mongoose.config.js';

const app = express();
const port = process.env.PORT || 6900;

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('common'));

// API version prefix for all routes 
app.use('/api/v1', mainRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  return res.status(500).json({ message: err.message });
});

app.listen(port, () => {
  console.log(`Server active on port ${port}`);
  connectDB();
});
