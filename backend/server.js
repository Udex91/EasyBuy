require('dotenv').config(); // Load environment variables

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const userRoute = require("./routes/userRoute")
const errorHandler  = require("./middleware/errorMiddleware");
const productRoute = require("./routes/productRoute");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(
    cors({
        origin: ["http://localhost:3000", "https://easybuy.vercel.app"],
        credentials: true,
    })
)

// Routes
app.use("/api/users", userRoute)
app.use("/api/products", productRoute)

app.get('/', (req, res) => {
    res.send("Home page...");
});

// Ensure environment variable is loading
console.log("Mongo URI:", process.env.MONGO_URI);

// Error Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((err) => console.log("MongoDB Connection Error:", err));
