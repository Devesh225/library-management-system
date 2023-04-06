import express from "express";
import dotenv from "dotenv";
import organisationRoutes from "./routes/organisationRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import otherRoutes from "./routes/otherRoutes.js";
import errorMiddleware from "./middlewares/error.js";
import cookieParser from "cookie-parser";

dotenv.config({
    path: "./config/config.env",
});

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/v1", userRoutes);
app.use("/api/v1", organisationRoutes);
app.use("/api/v1", bookRoutes);
app.use("/api/v1", paymentRoutes);
app.use("/api/v1", otherRoutes);

app.use(errorMiddleware);

export default app;
