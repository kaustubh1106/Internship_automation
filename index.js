
const express = require('express')
const internshala = require('./controllers/internshala.js')
const cuvette = require('./controllers/cuvette.js')
const app = express()

require('dotenv').config()

app.get('/hii', (req, res) =>{
  res.send('Hello World')
})

app.get("/internshala",(req,res)=>{
  internshala()
  res.send("please wait")
})
app.get("/cuvette",cuvette)

app.listen(8000,()=>{
  console.log("app running")
})
