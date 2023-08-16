const mongoose = require('mongoose')
const server = '127.0.0.1:27017';
const database='studentApi'
 mongoose.connect(`mongodb://${server}/${database}`).then(()=>{
    console.log("connection Successfull");
}).catch((e)=>{
console.log("Not connected");
})
// mongoose.model("students",mongoConnect)