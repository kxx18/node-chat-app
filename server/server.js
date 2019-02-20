const express = require('express');
const path = require('path');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
//middleware to serve publicPath
app.use(express.static(publicPath));

app.listen(3000, ()=>{
    console.log(`Server is up on port ${port}`);
})

