import { Schema,model } from "mongoose";

const userSchema = new Schema({
  name: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  number: {type: String, required: true}},
  {timestamps: true}
  
);


const Usermodel = model('Usermodel', userSchema);
export default Usermodel;
