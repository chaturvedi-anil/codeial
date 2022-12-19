const Post = require('../models/post');
const User = require('../models/user');

//using async await (this is best method to use)
module.exports.home = async function(req, res)
{
    try{
        let posts = await Post.find({})
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        });

        let users = await User.find({});

        return res.render('home',{
            title: "Codeial | Home",
            posts: posts,
            all_users: users
        });
    }
    catch(err)
    {
        console.log('Error' , err);
        return;
    }
}

//using promise (2nd)
//let post= Post.find({}).populate('comments').exec();
// post.then();

// this code will produce call back hell thats why this is not good code
// module.exports.home=function(req, res)
// {  
//     //populate the user of each post
//     * 1st call back here *
//     Post.find({})
//     .populate('user')
//     .populate({
//         path: 'comments',
//         populate: {
//             path: 'user'
//         }
//     })
//     * 2nd call back here *
//     .exec(function(err, posts)
//     {
//         if(err)
//         {
//             console.log('Error in home controller');
//             return;
//         }
        
//         // find all the user and send to views
//         * 3rd call back here *
//         User.find({}, function(err, users)
//         {
//             if(err)
//             {
//                 console.log('Error in finding user in home controller');
//                 return;
//             }

//             return res.render('home',{
//                 title: "Codeial | Home",
//                 posts: posts,
//                 all_users: users
//             });
//         });
        
//     });
// }