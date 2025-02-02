import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
  userId: { 
    type: String, 
    required: [true,'Id is required'], 
    unique: true 
  }, 
  password: {
    type: String, 
    required: [true,'Password is required'] 
  },
});

export const Admin = mongoose.model("Admin", AdminSchema);

