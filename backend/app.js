import express from "express";
import { config } from "dotenv";
import cors from "cors";
import fileUpload from "express-fileupload";
import cookieParser from "cookie-parser";
import { dbConnection } from "./database/dbConnection.js";
import messageRouter from "./router/messageRouter.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import userRouter from "./router/userRouter.js";
import userRoutersEmail from "./router/userRoutesEmail.js";
import productRouter from "./router/productRouter.js";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import googleLoginRouter from "./router/googleLoginRouter.js"

const app = express();
config({path: "./config/config.env"});

// Validate environment variables
import './config/validateEnv.js';

// CORS configuration — allow frontend origin
const corsOptions = {
    origin: 'https://tsp-line-web-solutions.onrender.com',
    credentials: true,
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Origin', 'X-Requested-With'],
    optionsSuccessStatus: 200,
};

// Apply CORS to all routes
app.use(cors(corsOptions));

// Handle preflight requests explicitly
app.options('*', cors(corsOptions));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(helmet());

const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
app.use(limiter);

app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
    })
);

app.use("/api/v1/product", productRouter)
app.use("/api/v1/message", messageRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/user/Email", userRoutersEmail);
app.use("/api/user/googleLogin", googleLoginRouter);

dbConnection();

app.use(errorMiddleware);

export default app;