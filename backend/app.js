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

// CORS configuration — allow specific frontend origins and handle preflight
const allowedOrigins = process.env.FRONTEND_URL
    ? process.env.FRONTEND_URL.split(',').map(url => url.trim())
    : ["https://tsp-line-web-solutions.onrender.com"];

app.use(
    cors({
        origin: function (origin, callback) {
            // Allow requests with no origin (like mobile apps or curl)
            if (!origin) return callback(null, true);
            if (allowedOrigins.indexOf(origin) === -1) {
                return callback(new Error('CORS policy: Origin not allowed'), false);
            }
            return callback(null, true);
        },
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
        credentials: true,
        allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Origin', 'X-Requested-With'],
        optionsSuccessStatus: 200,
    })
);

// Ensure preflight (OPTIONS) requests are answered for all routes
app.options('*', cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            return callback(new Error('CORS policy: Origin not allowed'), false);
        }
        return callback(null, true);
    },
    credentials: true,
}));

// Extra safety: explicitly set CORS headers when origin is allowed
app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (!origin) return next();
    if (allowedOrigins.includes(origin)) {
        res.header('Access-Control-Allow-Origin', origin);
        res.header('Access-Control-Allow-Credentials', 'true');
        res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
        if (req.method === 'OPTIONS') return res.sendStatus(200);
    }
    return next();
});

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