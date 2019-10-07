/* Import mongoose and define any variables needed to create the schema */
var mongoose = require('mongoose'), 
    Schema = mongoose.Schema;

/* Create your schema for the data in the listings.json file that will define how data is saved in your database
     See https://mongoosejs.com/docs/guide.html for examples for creating schemas
     See also https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications
  */
var movieSchema = new Schema({
  /* Your code for a schema here */ 
  //Check out - https://mongoosejs.com/docs/guide.html
  "title" : {type: String, required: true},
  "year" : {type: Number, required: true},
  "summary" :{type: String, required: true},
  created_at : Date,
  updated_at : Date
});

/* Create a 'pre' function that adds the updated_at (and created_at if not already there) property 
   See https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications
*/
movieSchema.pre('save', function(next) {
  /* your code here */
  var currentDate = new Date();
  this.updated_at = currentDate;
  if (!this.created_at){
    this.created_at = currentDate;}
  next();
});

/* Use your schema to instantiate a Mongoose model */
//Check out - https://mongoosejs.com/docs/guide.html#models
var Movie = mongoose.model('Movie', movieSchema);

/* Export the model to make it avaiable to other parts of your Node application */
module.exports = Movie;
