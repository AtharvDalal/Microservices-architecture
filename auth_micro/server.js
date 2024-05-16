import express from "express";
import cors from 'cors'
import Routes from "./routes/index.js";
import "dotenv/config"

const app = express()

const PORT = process.env.PORT || 4000;

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.get('/', (req,res)=> {
    return res.json({message:"server is working"})
})

//Routes

app.use(Routes);


app.listen(PORT, ()=> console.log(` server is running on PORT ${PORT}`))