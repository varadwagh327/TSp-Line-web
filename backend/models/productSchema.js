import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    name: String,
    category: String,
    title: String,
});
const Product = mongoose.model("Product", productSchema);

export default Product;