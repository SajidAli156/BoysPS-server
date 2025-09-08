import express from 'express';

import { createProperty, deleteProperty, getAllProperties } from '../controllers/property.controllers.js'
import { isAuthenticated, isCustomerAuthenticated } from '../middlewares/auth.js';



const router = express.Router();


router.post('/createProperty',isAuthenticated,createProperty);
router.delete('/deleteProperty/:id',isAuthenticated,deleteProperty);
// router.put('/updateProperty/:id',isAuthenticated,updateProperty);
// router.get('/getProperty/:id',isAdminAuthenticated,getProperty);
router.get('/getAllProperties', isCustomerAuthenticated, getAllProperties);



export default router;


