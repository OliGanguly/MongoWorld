

// I learned CRUD using mongooDb , mongoose , mongoose Connect with db, schema Type validation in mongoose , mongoose Vlidation , NPM validation 
const mongoose= require("mongoose")
var validator = require('validator');
 const server = '127.0.0.1:27017';
 const database='mongooseDemo'
 //it returns a promise - connection
mongoose.connect(`mongodb://${server}/${database}`).then(()=>{
    console.log('Database connection successful');
}).catch((err)=>
{
    console.error('Database connection error');
})
//Defining a Schema
//Unique  option  is not a validator-interview , it is a helper for building MongoDb unique indexes
//mongoDB with Vlidation
/*
Schema Type validation from mongoose 
https://mongoosejs.com/docs/schematypes.html
*/
const playListSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        lowercase:true,
        trim:true,
        minlength:[2,'put your message'],
        maxlength:20
    },
    
    //validate in mongoose
    // phone: {
    //     type: String,
    //     validate: {
    //       validator: function(v) {
    //         return /\d{3}-\d{3}-\d{4}/.test(v);
    //       },
    //       message: props => `${props.value} is not a valid phone number!`
    //     },
    // validator:{ 
        // validate:(v)=>v.length<0,
        // message:"your custom message" 
        //  }
    //     required: [true, 'User phone number required']
    //   },
    ctype:{
       type:String,
       enum:["frontend","Backend"], // I want ctyep only front/backend nothing else
       lowercase:true,
    },
    videos:{
        type:Number,
        //custome validation , what u write - get value
        validate(value){
         if(value<0){
            throw new Error('Videos count should not Negative')
         }
        }
    },
    author:String,
    //npm validation
    emailId:{
        type:String,
        required:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
               throw new Error("INvalid email")
            }
        },
        message:"email not valid"
    },
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
        emailId:"oli@go",
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
const createDocumentsWithValidation= async ()=>{
    try{
        const mongoPlayList = new playList({
            name:"MongoDB",
            ctype:"frontEnd",
            videos:2,
            author:"oli",
            emailId:"oli@gmail.com",
            active:true,
            //default value
            date:"2023-01-23"
        })
      
        // me time and wait
         const result = await playList.insertMany(mongoPlayList);   
        console.log(result);

    }catch(err){
        console.log(err)
    }
    }
    createDocumentsWithValidation();

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
    //    find({ $and: [{ctype:"Backend"},{author:"oli"}]})
    // find({ctype:"Backend"}).select({name:1}).sort()
    console.log(data)
    }
    // getDocLogical()
// ------------------------------------------------------------------------------------------------------------------------------

// sorthing and count Query

const getSortedData=async () =>{
    // const data = await playList.find().count();
    const data = await playList.find().sort({name:-1})
    console.log(data);
}
// getSortedData()
// ---------------------------------------------------------------------------------------------------------------------------------

 //recieve id async(_id)
const updateDocument=async()=>{
    //updateOne({_id}:{$set:{name:'updated Name'}})
const data = await playList.updateOne({name:'Node js'},{$set:{name:"Node Updated js"}});
const allData = await playList.find();
console.log(allData);
}
// updateDocument();
// updateDocument(67890567890fghjkl); pass id

// ------------------------------------------------------------------------------------------------------------------------------------

 



  






