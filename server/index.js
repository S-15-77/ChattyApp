const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
require('dotenv').config();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log('MongoDB Connected…');
}).catch((e) => {
    console.log(e.message);
});

const sever = app.listen(process.env.PORT,() => {
    console.log(`Server is running on port: ${process.env.PORT}`);
});