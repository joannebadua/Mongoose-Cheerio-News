var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

var CommentSchema = new Schema({
body: {
    type: string
},
author: {
    type: string
},
body: {
    type: string
},
createdAt: {
    type: Date,
    default: Date.now
// custom method for time
}
});

var Comment = mongoose.model("Comment", CommentSchema);
module.exports = Comment;
