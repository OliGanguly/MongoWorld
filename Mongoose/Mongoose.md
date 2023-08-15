
##  Mongoose

Establish Connection between Node js and Mongodb
https://www.freecodecamp.org/news/introduction-to-mongoose-for-mongodb-d2a7aa593c57/


Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js.
 It manages relationships between data, provides schema validation, 
 and is used to translate between objects in code and the representation of those objects in MongoDB.

 MongoDB is a schema-less NoSQL document database. It means you can store JSON documents in it, 
 and the structure of these documents can vary as it is not enforced like SQL databases. 
 This is one of the advantages of using NoSQL as it speeds up application development and reduces the complexity of deployments.

 Object Mapping between Node and MongoDB managed via Mongoose

 Nodejs ->mongoose -> MONGO DRIVER ->MonggoDb (Object Mapping with node js)

 MongoDB is a schema-less NoSQL document database. It means you can store JSON documents in it, and the structure of these documents can vary as it is not enforced like SQL databases. This is one of the advantages of using NoSQL as it speeds up application development and reduces the complexity of deployments.

## Terminologies
* Collections
Collections in Mongo are equivalent to tables in relational databases. They can hold multiple JSON documents.
* Documents
Documents are equivalent to records or rows of data in SQL. While a SQL row can reference data in other tables, Mongo documents usually combine that in a document.
* Fields
Fields, also known as properties or attributes, are similar to columns in a SQL table. In the image above, FirstName, LastName, Email, and Phone are all fields.
* Schema
While Mongo is schema-less, SQL defines a schema via the table definition. A Mongoose schema is a document data structure (or shape of the document) that is enforced via the application layer.

```bash
const puppySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: Number
});

const Puppy = mongoose.model('Puppy', puppySchema);
```
    