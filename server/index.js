const express = require('express');
const app = express();
const connectDB = require('./config/db')
require('dotenv').config();
const imageRouter = require('./routes/image')
const cors = require('cors')
const fileUpload = require("express-fileupload");
const { cloudinaryconnect } = require('./middleware/cloudinary')

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }))
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp"
}))

cloudinaryconnect();

app.get('/', ()=>{
    console.log('Server running')
})
// app.use('/api/image', imageRouter);

connectDB();
app.listen(process.env.PORT, () => {
    console.log(`Server running on PORT ${process.env.PORT}`);
})