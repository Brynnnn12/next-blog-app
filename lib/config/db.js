import mongoose from "mongoose";

export const ConnectDB = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/db_blogs');
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};

