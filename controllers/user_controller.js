const User=require('../models/user');

// user profile  
module.exports.profile = function(req, res){
    User.findById(req.params.id, function(err, user){
        return res.render('user', {
            title: 'User Profile',
            profile_user: user
        });
    });

}

//user profile update controller 
module.exports.update = function(req, res){
    if(req.user.id == req.params.id){
        User.findByIdAndUpdate(req.params.id, req.body, function(err, user){
            return res.redirect('back');
        });
    }else{
        return res.status(401).send('Unauthorized');
    }
}

//signIn 
module.exports.signIn=function(req, res)
{
    if(req.isAuthenticated())
    {
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in',
    {
        title:"User SignIN"
    });
}

//signup 
module.exports.signUp=function(req, res)
{
    if(req.isAuthenticated())
    {
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_up',
    {
        title:"User SignUP"
    });
}

//get the signup data
module.exports.create= async function(req, res)
{
    try
    {
        if(req.body.password != req.body.confirm_password)
        {
            return res.redirect('back')
        }

        let user = await User.findOne({email: req.body.email});
        if(!user)
        {
            await User.create(req.body);
            return res.redirect('/users/sign-in');
        }
        else
        {
            return res.redirect('back');
        }
    }
    catch(err)
    {
        console.log('Error ', err);
        return;
    }
}

//sign in and create a session for the user
module.exports.createSession=function(req, res)
{
    req.flash('success', 'Logged in Succesfully');
    return res.redirect('/');
}

//sign out
module.exports.destroySession = function(req, res)
{
    //logout function always required callback function
    req.logout(function(err) 
    {
        if (err) { return next(err); }
        req.flash('success', 'You have logged out!');
        res.redirect('/');
    });
}

