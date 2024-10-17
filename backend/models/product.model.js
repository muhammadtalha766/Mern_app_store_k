import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,  // Corrected the image field type
    required: true,
  }
}, {
  timestamps: true,  // Moved to the correct place
});

const Product = mongoose.model("Product", productSchema);

export default Product;
