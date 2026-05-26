import express from "express";

const server = express();
const PORT = 8080;

server.use(express.json());

server.get("/", (req, res) => {
    res.send("Server's working");
})

server.listen(PORT, () => {
    console.log("Server running at ", PORT);
})