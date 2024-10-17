import Product from "../models/product.model.js";
import mongoose from "mongoose";

export const getProduct = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.log("error in fetching products:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
}

export const createProduct = async (req, res) => {
  // res.send("Server is ready");
  // console.log(process.env.MONGO_URI);
  const product = req.body; // user will send this data

  if(!product.name || !product.price || !product.image) {
    return res.status(400).json({ success: false, messege: "Please provide all fields"});
  }

  const newProduct = new Product(product)

  try {
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct});
  } catch (error) {
    console.error("Error in Create product:", error.messege);
    res.status(500).json({ success: false, messege: "Server Error"});
  }
}

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const product = req.body;

  // Validate the product ID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: "Invalid Product ID" });
  }

  try {
    // Attempt to find and update the product
    const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });

    // If no product is found with the given ID, return 404
    if (!updatedProduct) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    // Successfully updated the product
    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    // Handle potential server errors
    res.status(500).json({ success: false, message: "Server Error" });
  }
}

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  // console.log("id:", id);

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: "Invalid Product ID" });
  }

  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ success: true, messege: "Product deleted" });
  } catch (error) {
    console.log("error in deleting product:", error.message);
    res.status(500).json({ success: false, message: "Server Error" })
  }
}