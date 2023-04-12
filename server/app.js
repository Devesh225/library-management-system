import express from "express";
import dotenv from "dotenv";
import organisationRoutes from "./routes/organisationRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import otherRoutes from "./routes/otherRoutes.js";
import errorMiddleware from "./middlewares/error.js";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config({
    path: "./config/config.env",
});

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    cors({
        origin: process.env.FRONTEND_URL,
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE"],
    })
);

app.use("/api/v1", userRoutes);
app.use("/api/v1", organisationRoutes);
app.use("/api/v1", bookRoutes);
app.use("/api/v1", paymentRoutes);
app.use("/api/v1", otherRoutes);

app.use(errorMiddleware);

export default app;
