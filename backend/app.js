const express = require('express');
const helmet = require('helmet');

const app = express();
app.use(helmet());
app.use(express.json());

const port = process.env.PORT || 3000;
app.get('/', (req,res)=> {
    res.send("Hello ISA!");
});

module.exports = app;