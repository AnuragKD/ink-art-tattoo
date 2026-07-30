import dotenv from "dotenv";
import app from "./app.js";
import { connectDB } from "./config/db.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
      console.log("🚀 Ink Art Tattoo Studio API");
      console.log(`🌐 Server : http://localhost:${PORT}`);
      console.log(`📦 Environment : ${process.env.NODE_ENV || "development"}`);
      console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    });
  } catch (error) {
    console.error("❌ Failed to start server");
    process.exit(1);
  }
};

startServer();