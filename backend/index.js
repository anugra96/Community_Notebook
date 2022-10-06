const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const noteRoute = require("./routes/notes");

dotenv.config();


mongoose.
    connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(()=>{
        console.log("MONGODB CONNECTED!")
    })
    .catch((err) => console.log(err));

    app.use(function (req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        res.setHeader('Access-Control-Allow-Credentials', true);
        next();
        });

app.use(express.json());
app.use("/api/note/", noteRoute);




app.listen(5000, ()=> {
    console.log("BACKEND SERVER RUNNING");
});