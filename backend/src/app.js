import express from 'express';
import cors from 'cors';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import { connectToSocket } from './controllers/socketManager.js';
import userRoutes from './routes/user.routes.js'
// import dotenv from "dotenv"
// dotenv.config();

const app = express();
const server = createServer(app);
const io = connectToSocket(server);

app.set("port",process.env.PORT || 3000);
app.use(cors());
app.use(express.json({limit: "40kb"}));
app.use(express.urlencoded({limit:"40kb", extended: true }));
app.use("/api/v1/users",userRoutes);

app.get("/home", (req, res) => {
    res.json({"message": "Server is running" });
});



const start = async () => {
        const connectionDB = await mongoose.connect("mongodb+srv://vedgawali:syncera123@syncera.zty2qz3.mongodb.net/?retryWrites=true&w=majority&appName=Syncera");
        console.log(`Connected to MongoDB: ${connectionDB.connection.host}`);
        app.listen(app.get("port"), () => {
        console.log(`Server is running on port ${app.get("port")}`);
        }
        );
}

start();