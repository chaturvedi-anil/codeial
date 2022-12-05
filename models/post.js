const mongoose=require('mongoose');

const postSchema=new mongoose.Schema({
    content:
    {
        type:String,
        required:true
    },
    user:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    //include the arrays of ids of all comments in this post Schema itself
    comment:
    [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
},
{
    timestamps: true
});

//creating model for user post
const Post = mongoose.model('Post', postSchema);

module.exports = Post;