import express from "express";
import { db } from "./firebase.js"

const server = express();
const PORT = 8080;

server.use(express.json());

server.get("/api/health", (req, res) => {
    res.send("Server's working");
})

server.post('/api/locations', async (req, res) => {
    const { name, category, isOpen } = req.body;

    const docRef = await db.collection("locations").add({
        name,
        category,
        isOpen,
        createdAt: new Date(),
    })


    return res.status(201).json({
        id: docRef.id,
        name,
        category,
        isOpen,
    });
})

server.listen(PORT, () => {
    console.log("Server running at ", PORT);
})