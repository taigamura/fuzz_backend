// =================================================================================
// 
// Modules
// 
// =================================================================================

const express = require("express");
const app = express()
const mongoose = require("mongoose");

require('dotenv').config()
app.use(express.json());

// =================================================================================
// 
// MongoDB
// 
// =================================================================================

const uri = process.env.ATLAS_URI;
mongoose.connect(uri);

const connection = mongoose.connection;

// once the connection is open, this logs
connection.once('open', () => {
    console.log('MongoDB connection established succeessfully');
});

// =================================================================================
// 
// Current Page
// 
// =================================================================================

app.get("/", (req, res) => {
    res.send("Hello, World!");
});

// =================================================================================
// 
// Routes
// 
// =================================================================================

const port = process.env.PORT || 3000;

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

app.use('/index', indexRouter);
app.use('/users', usersRouter);

app.listen(port, () => {
    console.log(`server running at: ${port}`)
});