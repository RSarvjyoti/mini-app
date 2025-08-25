const express = require("express");
require("dotenv").config();
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 9080

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send("This is a home route");
})

app.listen(PORT, () =>{
    console.log(`Server is runnig at http://localhost:${PORT}`);
})