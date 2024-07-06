const express = require('express');
const app = express();

require('dotenv').config();
const PORT = process.env.PORT || 4000;
const cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(express.json());

const user = require('./routes/user');
app.use('/api/v1',user);

const dbConnect = require('./config/database');
dbConnect();

app.listen(PORT, ()=>{
    console.log(`server started successfully at port ${PORT}`)
})
app.get('/',(req ,res)=>{
   res.send(`<h1>this is homepage </h1>`)
})


