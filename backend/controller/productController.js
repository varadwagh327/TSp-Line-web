import Products from "../models/productSchema.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";

export const getAllProducts = catchAsyncErrors(async(req, res, next) => {
    const product = await Products.find();
    res.status(200).json({
        success: true,
        product,
    });
});