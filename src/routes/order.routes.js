import express from 'express';
import { placeOrder } from '../controllers/order.controllers.js';

const router = express.Router();

// router.get('/', addRequestMessages)
router.post('/', placeOrder)
// router.get('/request-details/:id', getReqestDeatilsById)
// router.post('/create-request', upload.array('images', 10), createRequestProduct); // Adjust the second parameter for the maximum number of images allowed

export default router;
