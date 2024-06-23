import express from 'express';
import { addRequestMessages } from '../controllers/messages.controllers.js';

const router = express.Router();

// Route to add a product with multiple image uploads
router.get('/', addRequestMessages)
router.post('/', addRequestMessages)
// router.get('/request-details/:id', getReqestDeatilsById)
// router.post('/create-request', upload.array('images', 10), createRequestProduct); // Adjust the second parameter for the maximum number of images allowed

export default router;
