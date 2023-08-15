const mongoose= require("mongoose")
 const server = '127.0.0.1:27017';
 const database='mongooseDemo'
 //it returns a promise
mongoose.connect(`mongodb://${server}/${database}`).then(()=>{
    console.log('Database connection successful');
}).catch((err)=>
{
    console.error('Database connection error');
})
//Defining a Schema\
const playListSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    ctype:String,
    videos:Number,
    author:String,
    active:Boolean,
    date:{
        type:Date,
        default:Date.now
    }
})
// a mongoose model is wrapper of mongoose schema
// A mongoose schema defines the structure of the  document , default values , validators etc
// Mongoose model provides interface to a database for creating , querying , updating , deleting record

/*
3. Exporting a Model
We need to call the model constructor on the 
Mongoose instance and pass it the name 
of the collection and a reference to the schema definition.

*/
const playList = new mongoose.model('PlayList',playListSchema)


const createDocument = async ()=>{
try{
    const reactPlayList = new playList({
        name:"spring Boot",
        ctype:"Backend",
        videos:1,
        author:"oli",
        active:true,
        //default value
        date:"2023-01-23"
    })
    
    // me time and wait
     const result = await reactPlayList.save();   
}catch(err){
    console.log(err)
}
}
// createDocument();

const createDocuments= async ()=>{
    try{
        const springBootPlayList = new playList({
            name:"spring Boot",
            ctype:"Backend",
            videos:1,
            author:"oli",
            active:true,
            //default value
            date:"2023-01-23"
        })
        const mongoPlayList = new playList({
            name:"Mongo DB",
            ctype:"Db",
            videos:2,
            author:"oli",
            active:true,
            //default value
            date:"2023-01-23"
        })
        const Express = new playList({
            name:"Express js",
            ctype:"Backend",
            videos:2,
            author:"oli",
            active:true,
            //default value
            date:"2023-01-23"
        })
        
        // me time and wait
         const result = await playList.insertMany([springBootPlayList,mongoPlayList,Express]);   


    }catch(err){
        console.log(err)
    }
    }
    //create multiple doc
    // createDocuments();
// --------------------------------------------------------------------------------------------------------------
    //Read data from mongoDB
    const getDocument= async ()=>{
        //select for only name
     const result = await playList.find({ctype:"Backend"})
     .select({name:true});
     console.log(result)
    }
    // getDocument()

// --------------------------------------------------------------------------------------------------------------------
 
// Query operator - comparison const data = await playList.
//   find({videos:2});
//   find({videos:{$gt:1}});

  const getDoc = async ()=>{
  const data = await playList.
//   find({videos:{$gt:1}});
// $nin - not in
     find({ctype:{$in : ["Backend","Fronend"]}})
  console.log(data)
  }
//   getDoc();

// -------------------------------------------------------------------------------------------------------------------------
//  Logical Operator
// 
const getDocLogical = async ()=>{
    const data = await playList.
    //    find({ $or: [{ctype:"Backend"},{author:"oli"}]})
       find({ $and: [{ctype:"Backend"},{author:"oli"}]})
    console.log(data)
    }
    getDocLogical()
// ------------------------------------------------------------------------------------------------------------------------------



  






