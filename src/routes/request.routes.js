import express from 'express';
import { upload } from '../middlewares/multer.middleware.js';
import { createRequestProduct, getAllRequestedProduct, getReqestDeatilsById } from '../controllers/request.controller.js';

const router = express.Router();

// Route to add a product with multiple image uploads
router.get('/', getAllRequestedProduct)
router.get('/request-details/:id', getReqestDeatilsById)
router.post('/create-request', upload.array('images', 10), createRequestProduct); // Adjust the second parameter for the maximum number of images allowed

export default router;
