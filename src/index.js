const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const { connectDB } = require("./config/db");
const errorHandler = require("./middleware/error");

dotenv.config();
const app = express();

// CORS
const allowedOrigins = [
  "https://easybill-plus-main.vercel.app",
  "http://localhost:3000"
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.options("*", cors());

app.get("/", (_req, res) => {
  res.send("🚀 EasyBill API backend is live!");
});



// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ ok: true, time: new Date().toISOString() });
});

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/customers", require("./routes/customers"));
app.use("/api/bills", require("./routes/bills"));
app.use("/api/statements", require("./routes/statements"));

// Error handler
app.use(errorHandler);

// Connect DB once
connectDB();

// 🚀 Important: DO NOT call app.listen()
// Export for Vercel
module.exports = app;
