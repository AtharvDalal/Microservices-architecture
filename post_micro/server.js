import express from "express";
import cors from 'cors'

import "dotenv/config"

const app = express()

const PORT = process.env.PORT || 4001;

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.get('/', (req,res)=> {
    return res.json({message:"server is working"})
})

//Routes




app.listen(PORT, ()=> console.log(` server is running on PORT ${PORT}`))