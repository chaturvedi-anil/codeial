const User=require('../models/user');
module.exports.profile=function(req, res)
{
    return res.render('users', {
        title: "Users"
    });
}

module.exports.signIn=function(req, res)
{
    return res.render('user_sign_in',
    {
        title:"User SignIN"
    });
}
module.exports.signUp=function(req, res)
{
    return res.render('user_sign_up',
    {
        title:"User SignUP"
    });
}

module.exports.create=function(req, res)
{
    if(req.body.password != req.body.confirm_password)
    {
        return res.redirect('back')
    }

    User.findOne({email: req.body.email}, function(err, user)
    {
        if(err){ console.log('error in finding user in signing up'); return;}

        if(!user)
        {
            User.create(req.body, function(err, user)
            {
                if(err){ console.log('error in creating user in signing up'); return;}
            });
            return res.redirect('/users/sign-in');
        }
        else
        {
            return res.redirect('back');
        }
    });
}

module.exports.createSession=function(req, res)
{
    //find user
    User.findOne({email: req.body.email}, function(err, user)
    {
        if(err){ console.log('error in finding user in signing in'); return;}
        
        //handle user found
        if(user)
        {
            //handle user password which doesn't match
            if(user.password != req.body.password)
            {
                return res.redirect('back');
            }
            //handle session creation
            res.cookie("user_id", user.id);
            return res.redirect('/users/profile');
        }
        else
        {
            //handle user not found
            return res.redirect('back');
        }
    });
}