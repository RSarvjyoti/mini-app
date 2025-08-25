const express = require("express");
require("dotenv").config();
const cors = require("cors");
const connectDB = require("./src/config/db");

const app = express();

const PORT = process.env.PORT || 9080
const DB_URL = process.env.MONGO_URL

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send("This is a home route");
});

app.listen(PORT, () =>{
    connectDB(DB_URL);
    console.log(`Server is runnig at http://localhost:${PORT}`);
});