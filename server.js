import express from 'express'
import dotenv from 'dotenv'
import connection from './connection.js'
import Router from './router.js'
import cors from 'cors'

dotenv.config()
const app = express()

app.use(express.json({limit:'50mb'}))
app.use(cors())

app.use('/api',Router)

connection().then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log(`server created http://localhost:${process.env.PORT}`);
        
    })
}).catch((error)=>{
    console.log(error);
    

})