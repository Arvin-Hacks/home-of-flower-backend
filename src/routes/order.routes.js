import express from 'express';
import { placeOrder,getOrderDetails,getOrders } from '../controllers/order.controllers.js';

const router = express.Router();

router.get('/', getOrders)
router.post('/', placeOrder)
router.get('/order-details/:id', getOrderDetails)
// router.post('/create-request', upload.array('images', 10), createRequestProduct); // Adjust the second parameter for the maximum number of images allowed

export default router;
