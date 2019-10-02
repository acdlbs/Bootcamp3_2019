/* Import mongoose and define any variables needed to create the schema */
var mongoose = require("mongoose"),
  Schema = mongoose.Schema;

/* Create your schema for the data in the listings.json file that will define how data is saved in your database
     See https://mongoosejs.com/docs/guide.html for examples for creating schemas
     See also https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications
  */
var listingSchema = new Schema({
  /* Your code for a schema here */

  code: String,
  name: String,
  coordinates: {
    latitude: Number,
    longitude: Number
  },
  address: String
  //Check out - https://mongoosejs.com/docs/guide.html
});

/* Create a 'pre' function that adds the updated_at (and created_at if not already there) property 
   See https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications
*/
listingSchema.pre("save", function(next) {
  //get current date
  if (this.name == null) throw "[DB] name not provided";
  if (this.code == null) throw "[DB] code not provided";
  var currentDate = new Date();

  //change update_at field to current date
  this.update_at = currentDate;

  //if create_at doest exist, add it to field
  if (!this.create_at) {
    this.create_at = currentDate;
  }
  next();
  /* your code here */
});

/* Use your schema to instantiate a Mongoose model */
//Check out - https://mongoosejs.com/docs/guide.html#models
var Listing = mongoose.model("Listing", listingSchema);

/* Export the model to make it avaiable to other parts of your Node application */
module.exports = Listing;
