const Comment = require('../models/comment');
const Post = require('../models/post');
module.exports.create = function(req, res)
{
    // console.log(req.body.post);
    Post.findById(req.body.post, function(err, post)
    {
        // console.log('before if ',post);
        if(err)
        {
            console.log('Error in comment controller');
            console.log('post :  ',post);
            // console.log(err);
        }
        if(post)
        {
            console.log('inside if');
            Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            }, function(err, comment)
            {
                //handle error
                if(err)
                {
                    console.log(`Error in creating comment ${err}`);
                    return;
                }

                post.comments.push(comment);
                post.save();
                res.redirect('/');
            });
        }
    });
}