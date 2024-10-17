import express from "express";
import { deleteProduct, getProduct, createProduct, updateProduct } from "../controller/product.controller.js";

const router = express.Router();

router.get("/", getProduct);
router.post("/", createProduct);
// app.put("api/products/:id", async (req, res) => {
//   const { id } = req.params;

//   const product = req.body;

//   if(!mongoose.Types.ObjectId.isValid(id)) {
//     return res.status(404).json({ success: false, message: "Invalid Product Id" });
//   }

//   try {
//     const updateProduct = await Product.findByIdAndUpdate(id, product, { new: true});
//     res.status(200).json({ success: true, data: updateProduct });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// });
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;