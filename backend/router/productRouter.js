import express from "express";
import {getAllProducts} from "../controller/productController.js";
import {isAuthenticated} from "../middlewares/auth.js";

const router = express.Router();

router.get("/getall", isAuthenticated, getAllProducts);

export default router;