var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

//Using the Schema costructor, create a new LawmakerSchema object similar to a Sequelize model.
var CommentSchema = new Schema({
body: {
    type: String
},
author: {
    type: String
},
createdAt: {
    type: Date,
    default: Date.now
// custom method for time
}
});

//This creates our model from the CommentChema using Mongoose's model method
var Comment = mongoose.model("Comment", CommentSchema);

//Export the Comment Model
module.exports = Comment;
