const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    image: {
        type: String, // Assuming the image will be stored as a URL
        required: true
    },
    description: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    typeOfBlog: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: false
    }
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;