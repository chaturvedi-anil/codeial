const Post = require('../models/post');
const User = require('../models/user');

module.exports.home=function(req, res)
{  
    //populate the user of each post
    Post.find({})
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    })
    .exec(function(err, posts)
    {
        if(err)
        {
            console.log('Error in home controller');
            return;
        }
        
        // find all the user and send to views
        User.find({}, function(err, users)
        {
            if(err)
            {
                console.log('Error in finding user in home controller');
                return;
            }

            return res.render('home',{
                title: "Codeial | Home",
                posts: posts,
                all_users: users
            });
        });
        
    });
}