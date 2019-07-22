var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
var LawmakersSchema = new Schema({
  // `title` is required and of type String
  name: {
    type: String,
    unique: true
  },
  // `link` is required and of type String
  link: {
    type: String
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment"
    }
  ]
});

// This creates our model from the above schema, using mongoose's model method
var Lawmakers = mongoose.model("Lawmakers", LawmakersSchema);

// Export the Article model
module.exports = Lawmakers;
