import express from 'express';
import { registerCustomer, loginCustomer, logOutCustomer, deleteCustomer, getParticularCustomer,  } from '../controllers/user.controllers.js';
import {  isAuthenticated, isCustomerAuthenticated } from '../middlewares/auth.js';
import { createContactUs, getAllContactUs, updateContactUs } from '../controllers/contactUs.controllers.js';
import { getAllComplaints } from '../controllers/contactUs.controllers.js';
import rateLimit from 'express-rate-limit';

const router = express.Router();


let limiter = rateLimit({
  max: 50,
  windowMs: 15 * 60 * 1000,
  message: 'We have received too many requests from this Address. Please try after 15 min.'
})

router.post('/register',limiter,registerCustomer)
router.post('/login',limiter,loginCustomer);
router.get('/logout',isCustomerAuthenticated,logOutCustomer);




router.delete('/deleteCustomerDetails',isCustomerAuthenticated,deleteCustomer);

router.get('/getCustomer',isCustomerAuthenticated,getParticularCustomer);


router.post('/createMessage', isCustomerAuthenticated,createContactUs);
router.get('/getMessages',isAuthenticated,getAllContactUs);
router.get('/getAllMessages',isAuthenticated,getAllComplaints);
router.put('/updateContactUs/:messageId',isAuthenticated,updateContactUs);
export default router;