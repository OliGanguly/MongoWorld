const express = require("express");
require("./db/connection")
const  Student = require("./models/Students")
const app = express();
const port = process.env.PORT || 3000
/*
express.json() nuild in middleware in express to recognize the incomeing request object in a JSON object
app.use(express.json())
*/
app.use(express.json())
//create a route
app.get("/",(req,res)=>{
    res.send("start");
    })
  // app.post("/student/create",(req,res)=>{
  //   const user = new Student(req.body)
  //   user.save().then(()=>{
  //     res.status(201).send(user)
  //   }).catch((error)=>{
  //    res.status(400).send(error);
  //   })
  // })

  app.post("/student/create",async (req,res)=>{
    try{
      const user = new Student(req.body)
      //return a promise
      const p_resutlt = await user.save()
      res.status(201).send(p_resutlt);
    }catch(e){
    res.status(400).send(e)
    }

  })
//Get all students
  app.get("/student",async(req,res)=>{
    try{
      const data = await Student.find();
      res.status(200).send(data)
    }catch(e){
    res.status(400).send(e)
    }
  })
  //get By id
 app.get("/student/:id",async(req,res)=>{
 try{
  const _id = req.params.id
  const data = await Student.find({_id});
  if(!data){
    res.status(404).send() 
  }else{
    res.status(200).send(data)
  }
 }catch(e){
  res.status(400).send(e)
 }
 })

 //delete
 app.delete("/student/delete/:id",async(req,res)=>{
  try{
  // const _id = req.params.id;
  const data = await Student.findByIdAndDelete(req.params.id)
  if(!data){
    res.status(404).send()
  }else{
    res.status(200).send(data)
  }
  }catch(e){
    res.status(400).send(e)
  }
 })
//update
 app.patch("/student/update/:id",async(req,res)=>{
  try{
  _id = req.params.id;
  const data = await Student.findByIdAndUpdate(_id,req.body)
   res.status(200).send(data)
  }catch(e){
    res.status(400).send(e)
  }
 })

  app.listen(port,()=>{
    console.log(`Connection is setup at ${port}`);
  })

  
