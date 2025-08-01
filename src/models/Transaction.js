import { Schema,model } from "mongoose";

const transactionSchema = new Schema({
    name: { type: String, required: true },
    amount: { type: Number, required: true },
    type: { type: String, enum: ['income', 'expense'], required: true },
    tag:{type: String, required: true},
    date: { type: Date, default: Date.now },
    userId: { type:String , required: true }
},{timestamps: true})

const Transaction = model('Transaction', transactionSchema);
export default Transaction;

