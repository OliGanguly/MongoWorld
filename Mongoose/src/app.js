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

// create and insert...
const createDocument = async ()=>{
try{
    const reactPlayList = new playList({
        name:"React js",
        ctype:"Frontend",
        videos:1,
        author:"oli",
        active:true,
        //default value
        date:"2023-01-23"
    })
    //take some time and wait
     const result = await reactPlayList.save();   
}catch(err){
    console.log(err)
}
}
createDocument();



