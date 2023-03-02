import express from 'express';
import dotenv from 'dotenv';
import organisationRoutes from './routes/organisationRoutes.js';
import userRoutes from './routes/userRoutes.js'
import errorMiddleware from './middlewares/error.js';

dotenv.config({
    path: "./config/config.env"
});

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/api/v1", organisationRoutes);
app.use("/api/v1", userRoutes);

app.use(errorMiddleware);

export default app;