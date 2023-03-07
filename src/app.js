// load express module
const express = require("express");
const app = express()

app.get("/", (req, res) => {
    res.send("Hello, World!");
});

app.listen(3000, () => {
    console.log('server running at 3000')
});


const indexRouter = require('./routes/index');

app.use('/index', indexRouter);