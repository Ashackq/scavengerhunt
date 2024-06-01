const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const app = express();
const Routes = require("./routes/route.js");
const connectDB = require("./db.js"); // Import the database connection function

dotenv.config();

const PORT = process.env.PORT || 5000;

app.use(express.json({ limit: '10mb' }));
app.use(cors());

// Connect to MongoDB
connectDB();

app.use('/', Routes);

app.listen(PORT, () => {
    console.log(`Server started at port no. ${PORT}`);
});
