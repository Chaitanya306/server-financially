import express from "express";
import {login,signup,home,createTransaction,statsDashboard} from '../routes/routes.js'
import auth from '../auth/auth.js';

const router=express.Router()

router.get('/financeApp',auth,home)
router.get('/statsDashboard',auth,statsDashboard)
router.post('/financeApp/login',login)
router.post('/financeApp/signup',signup)
router.post('/financeApp/createTransaction',auth,createTransaction)

export {router}




