const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config(); //load the config file
connectDB(); // connect to mongodb

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT|| 5000;

app.listen(`Server is running on PORT : ${PORT}`);
