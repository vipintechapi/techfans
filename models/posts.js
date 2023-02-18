const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
    {
        title: {
            type: String,
        },
        categoryId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'catogories',
        },
        shortDesc: {
            type: String,
        },
        html: {
            type: String,
        },
        image: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

const Post = mongoose.model('posts', postSchema);

module.exports = Post;
