import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Usermodel from "../models/Usermodel.js";
import Transaction from "../models/Transaction.js";

//const router=express.Router()

const login = async (req, res) => {

    const { email, password } = req.body
    if (!email || !password) {
        return res.status(400).json({ message: 'Please fill all fields' })
    }
    try {
        const user = await Usermodel.findOne({ email: email })
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!user) {
            return res.status(400).json({ message: 'User does not exist' })
        }
        
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid password' })
        }
        const payload = {userId: user._id}
        
        const token=jwt.sign(payload, process.env.secretKey)
        res.status(200).json({ Jsonwebtoken:token,message: 'Login successful',userDetails:{name:user.name,email:user.email,number:user.number} })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' })
    }


}

const signup=async (req,res)=>{

   const {name,email,password,number}=req.body
    if(!name || !email || !password || !number){
        return res.status(400).json({message:'Please fill all fields'})
    }
    const existingUser=await Usermodel.find({email:email})
    if(existingUser.length>0){
        return res.status(400).json({message:'User already exists'})
    }
    try {
        const hashCount=10
        const hashedPassword=await bcrypt.hash(password,hashCount)
        const user=await Usermodel.create({
            name,
            email,
            password: hashedPassword,
            number
        })
        res.status(201).json({message:'User created successfully'})
    } catch (error) {
        
        return res.status(500).json({message:'Internal server error'})
        
    }

}

const home=async (req,res)=>{
    const userId = req.userId; // Get userId from the request object
    try {
        const transactions = await Transaction.find({ userId: userId });
        console.log('transactions in home ', transactions);
        
        res.status(200).json({transactionsList:transactions});
    } catch (error) {
        console.error('Error fetching transactions:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
    
}

const createTransaction=async (req,res)=>{
    
    const userId = req.userId; // Get userId from the request object
    const {name,amount,type,tag,date} = req.body;
    try{
       const transaction=await Transaction.create({name,amount,type,tag,date,userId})
       return res.status(200).json({message:'Transaction created successfully'}) 
    }catch (error) {
        console.error('Error creating transaction:', error);
        return res.status(500).json({message:'Internal server error'})
    }
    
}

const statsDashboard=async (req,res)=>{
    const userId = req.userId; // Get userId from the request object
    try {
        const tranGroupedByDate = await Transaction.aggregate([{ $match: { userId: userId } },
            { $group: { _id: "$date" ,amount:{$sum:"$amount"}} },])

        const expenses=await Transaction.aggregate([{$match:{userId: userId,type:'expense'}},
            {$group:{_id:"$tag",amount:{$sum:"$amount"}}}])    

        //console.log('transactions in statsDashboard ', tranGroupedByDate, expenses);
        res.status(200).json({transactionsList:tranGroupedByDate, expensesList:expenses});    
    } catch (error) {
        console.error('Error fetching transactions:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

const userDetails=async (req,res)=>{
    const userId=req.userId
    try{
        const user=await Usermodel.findOne({_id:userId})
        
        const userDetails={name:user.name,email:user.email,number:user.number}
        return res.status(200).json({userDetails:{...userDetails}})
    }catch(error){
        console.log(`error fetching user :${error}`)
        return res.status(500).json({ message: 'Internal server error' });
    }
    

}
export {login,signup,home,createTransaction, statsDashboard,userDetails}
