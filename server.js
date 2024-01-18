require('dotenv').config();


const express = require('express');
const path = require('path');
const cors = require('cors');
const { configDotenv } = require('dotenv');

const app = express();
app.use(cors());
app.use(express.json());


app.use(require("./src/user/Routes/userRoutes"));

// Include post routes
app.use(require('./src/post/Routes/postRoutes'));

app.listen(3600, () => {
    console.log("Server is running on port 3600");
});
