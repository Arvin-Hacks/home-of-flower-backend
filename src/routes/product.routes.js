import express from "express";
import {
  addProduct,
  deleteProductApi,
  getAllProduct,
  getProductDetailsById,
  updateProductApi,
} from "../controllers/product.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router();

// Route to add a product with multiple image uploads
router.get("/", getAllProduct);
router.get("/product-details/:id", getProductDetailsById);
router.post("/add-product", upload.array("images", 10), addProduct); // Adjust the second parameter for the maximum number of images allowed
router.patch("/:id", updateProductApi);
router.delete("/:id", deleteProductApi);

export default router;
