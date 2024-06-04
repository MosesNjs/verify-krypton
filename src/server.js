import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import mainRouter from './routes/main.route.js';
import connectDB from './configs/mongoose.config.js';
import { DOCS_URL } from './configs/env.config.js';

const app = express();
const port = process.env.PORT || 6900;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('common'));

// API version prefix
app.use('/api/v1', mainRouter);
app.use('/api/v1/docs', (req, res) => {
  res.redirect(301, DOCS_URL)
});

// Middleware for error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  return res.status(500).json({ message: err.message });
});

app.listen(port, () => {
  console.log(`Server active on port ${port}`);
  connectDB();
});
