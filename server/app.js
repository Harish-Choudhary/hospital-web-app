const express = require('express');
const db =require('./db/db');
require('dotenv').config();
const auth =require('./router/auth/auth.router');
const cors  = require('cors');
const app = express();

app.use(express.json());
//giving permissions to frontend to make requests
app.use(cors({
    origin:"http://localhost:3000",
    credentials: true
}))
const PORT = process.env.PORT || 5000;

db.getConnection((err,conn)=>{
    if(err)
    {
        throw err;
    }
    else
    {
        console.log('connection succesful');
    }
})

app.use("/auth/",auth);


app.listen(PORT,()=>{
    console.log(`listening at port ${PORT}`);
});