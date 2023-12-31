
## What is MongoDB? 

[Documentation](https://www.mongodb.com/docs/manual/?_ga=2.175368928.336937418.1692031645-255943059.1691768684)

MongoDB is a document database designed for ease of application development and scaling.

## Mongo vs mongod
"mongo" is a command line shell that connects to a specific instance of mongod.

"mongod" ->Mongo Daemon its basically the host process for the database, which performs all operations, its actuall a database.

## SQL VS MONGODB
Database -> Tables -> Records
Database -> Collections -> Documents


SQL---------MONGO

database = database

table    =  Collections

rows     =  documents(BSON)

columns  = fields

SQL - uses SQL to query database
NoSql - uses BSON to query database

![mongo](https://github.com/OliGanguly/MongoWorld/assets/82031303/b6742aea-8836-4482-a81c-c1a6bc10e1d3)


## Connect in cmd
 add C:\Program Files\MongoDB\Server\6.0\bin in env path

```bash
  open cmd
  mongosh
```
    
## What is MongoDB Compass?

[Documentation](https://www.mongodb.com/docs/compass/current/?_ga=2.142888567.336937418.1692031645-255943059.1691768684)

MongoDB Compass is a powerful GUI for querying, aggregating, and analyzing your MongoDB data in a visual environment.

Compass is free to use and source available, and can be run on macOS, Windows, and Linux.

# Commands

{shows dbs} shows the available databases

{use 'db_name'} switches to the database 'db_name' if it already exists or creates it if it doesn't

{db.dropDatabase()} drops the current database

{db.createCollection('collection_name')} creates a new collection named 'collection_name'

{show collections} to show all the collections in the current db

{db.createCollection('collection_name', {capped : true, size : 10000, max: 100}, {autoIndexID : false})} will create a collection with some upper limit of size and number of documents in the collection, autoIndexID to false will tell mongoDB to not create the default index on the _ id field in this collection.
By default mongoDB creates an index on the _ id field in a collection.

{db.collection_name.drop()} to drop the collection

{db.collection_name.insertOne({key value pairs here})} inserts a document into the collection named 'collection_name'

{
db.collection_name.insertOne({
name:"OLi",
age:23,
gpa:4.5,
isFullTime:true,
registrationDate:new Date("2023-01-02T00:00:00)
graduationDate:null 
stujects:["Java","javascript","python"],
address:{
street:"123 fake street",
city:"brampton",
zip:56666
}
})
}

{db.collection_name.insertMany([{key value pairs here}, {key value pairs here}, {key value pairs here}])} inserts many documents into the collection named 'collection_name'

{db.collection_name.find()} lists all the documents of the collection named 'collection_name'

{db.collection_name.find().sort({key value pairs})} to sort all the listed documents wrt to key value pairs provided.
Ex - 
db.students.find().sort({name : 1}) sorts the documents in alphb. order
db.students.find().sort({name : -1}) sorts the documents in reverse alphb. order

{db.collection_name.find().limit(x)} 
Ex-db.students.find().limit(2)
limits the documents listed to a number x, i.e., total documents lisited will be x

{db.collection_name.find({query}, {projection})} 
- {query} -> filters the documents wrt the query provided, query is just a document or a collection of key value pairs
- {projection} -> is used to show only some specific fields of all the documents after filtering, projection is just a document or a collection of key value pairs
Ex -
db.students.find({}, {id:false,name:true, gpa:true})
No filters given, but attributes to be listed are given

{db.collection_name.updateOne({filter}, {update})}
- {query} -> filters the documents to select the document whose data to update
- {update} -> actually updates the document 
Ex - 
db.students.updateOne({name: "Sam"}, {$ set : {age : 20}})
Instead of updating an attribute with $ set, an attribute can also be remove using $ unset
Ex - 
db.students.updateOne({name: "Sam"}, {$ unset : {age : ""}})

{db.collection_name.updateMany({query}, {update})}
- {query} -> same as updateOne()
- {update} -> same as updateOne()
Ex -
db.students.updateMany({}, {$ set : {fulltime: false}})
Updates everyone's fulltime attribute to false
Similarly $ unset can be used here

Ex - 
db.students.updateMany({fulltime : {$ exists:false}}, {$ set : {fulltime: true}})

{db.collection_name.deleteOne({query})}
- {query} -> filters the document to select the document to delete

{db.collection_name.deleteMany({query})}
- {query} -> filters the document to select all the documents to delete

{db.collection_name.find({name : {$ ne : 'NAME'}})} 
to find all the documents whose name attribute is not equal to 'NAME'

{db.collection_name.find({gpa : {$ lt: value}})}
to find all the documents whose gpa attribute's value is less than 'value'

Comparision Operators -
ne -> not equal
lt -> less than
lte -> less than equals to
gt -> greater than
gte -> greater than equals to

{db.collection_name.find({gpa : {$ gte : 3, $ lte : 4}})}
to find all the documents whose gpa attribute's value is between 3 and 4

{db.collection_name.find({name : {$ in : ['value 1', 'value 2', 'value n']}})}
to find all the documents whose name attribute's value is one of 'value 1', 'value 2', 'value n'
$ in -> in
$ nin -> not in

db.students.find({ $ and : [{fullTime:true}, {age : {$ gte : 18}  }]  }, {_ id:false, name:true, age:true})
to find all the documents where the value of fullTime attribute is true and age is less than or equal to 'value'

Logical Operators - 
$ and
$ or
$ nor

$ not 

db.collection_name.find({age : {$ not: {$ gte : value}}})
to find all the documents where the value of the age attribute is not greater than or equal to 'value', i.e., is less than 'value'

Indexes -

{db.collection_name.find({name:'value'}).explain('executionStats')}
to get info about the execution of the query

{db.collection_name.createIndex({name : 1})}
will return the name of the index created.
Index will be created on the 'name' field

{db.collection_name.getIndexes()}
will return all the indexes created for the collection

{db.collection_name.dropIndex("name_of_index")}
to drop the index

Some Examples -
db.students.find({ gpa : {$ gte:5, $ lte:9}, fullTime : { $ exists: true } }, {_ id:false, name:true, gpa: true})

db.students.find({name : {$ ne : "Sam"}}, {_ id:false,name:true, gpa:true}).sort({gpa:-1}).limit(3)

Complex -> 
 db.students.find({ $ and : [{fullTime:true}, {age : {$ gte : 18}  }], $ or : [{name : { $ in : ["Sam", "Patric"] }  }, {age: { $ gte : 10 }  }]  }, {_ id:false, name:true, age:true})
