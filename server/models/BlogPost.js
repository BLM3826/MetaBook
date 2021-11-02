var mongoose = require('mongoose');

// Define the schema for the blog post
var blogPostSchema = new mongoose.Schema({

    // The title of the blog post
    title: {
        type: String,
        required: true
    },
    // The content of the blog post
    text: {
        type: String,
        required: true
    }
});

// Export the model schema
module.exports = mongoose.model('blogpost', blogPostSchema);

