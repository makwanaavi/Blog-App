import mongoose from "mongoose";

const ConnectDB = async () => {
    await mongoose.connect('mongodb+srv://blogapp:makwanaavi73@cluster0.ijtqjgr.mongodb.net/blog-app')
    console.log("---------- MongoDB connected successfully -----------");
}

export default ConnectDB;