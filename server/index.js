const express = require("express");
const cors = require('cors');

require('dotenv').config()
const connectDB = require('./config/db')

const fileUploadRoutes = require('./routes/fileUploadRoutes')

const app = express();

app.use(express.json())
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}))

app.use('/api/fileupload', fileUploadRoutes)

connectDB();
app.listen(4000, () => {
  console.log("Server is running");
});
