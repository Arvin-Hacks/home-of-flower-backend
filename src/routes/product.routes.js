import express from 'express';
import { addProduct, getAllProduct, getProductDetailsById } from '../controllers/product.controller.js';
import { upload } from '../middlewares/multer.middleware.js';

const router = express.Router();

// Route to add a product with multiple image uploads
router.get('/',getAllProduct)
router.get('/product-details/:id',getProductDetailsById)
router.post('/add-product', upload.array('images', 10), addProduct); // Adjust the second parameter for the maximum number of images allowed

export default router;
