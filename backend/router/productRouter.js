import express from "express";
import {getAllProducts} from "../controller/productController.js";
import {isUserAuthenticated} from "../middlewares/auth.js";

const router = express.Router();

router.get("/getall", isUserAuthenticated, getAllProducts);

export default router;