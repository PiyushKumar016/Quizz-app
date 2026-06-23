import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import chalk from "chalk";
import cors from "cors";
import dotenv from "dotenv";
import { Error404 } from "./src/middleware/error.js";
import { indexRoute } from "./src/api/v1/routes/index.js";
import { connectDB } from "./src/config/db/db-connection.js";
import dns from "dns";

dns.setServers(["8.8.8.8", "8.8.4.4"]);
dotenv.config();

const app = express();
const server = createServer(app);

connectDB();

// ✅ CORS — allow Vercel frontend
app.use(cors({
  origin: process.env.CLIENT_URL || "*",
  credentials: true,
}));

app.use(express.json());
app.use("/api/v1", indexRoute);
app.use(Error404);

// ✅ Socket.io — allow Vercel frontend
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("🟢 User connected:", socket.id);
  socket.on("disconnect", () => {
    console.log("🔴 User disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 3003;
server.listen(PORT, () => {
  console.log(
    chalk.blueBright(
      `🚀 Gyanito Backend Server running at http://localhost:${PORT}`
    )
  );
});