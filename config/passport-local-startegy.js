const passport = require('passport');
const LocalStategy = require('passport-local');

const User = require('../models/user');

//authentication using passport
passport.use(new LocalStategy(
    {
        usernameField: 'email'
    },
    function(email, password, done)
    {
        //find a user and establish the identity
        User.findOne({email: email}, function(err,user)
        {
            if(err)
            {
                console.log('Error in finding user in  ---> passport');
                return done(err);
            }
            if(!user || user.password != password)
            {
                console.log('Invalid usermame/ Password');
                return done(null, false);
            }
            return done(null, user);
            
        });
    }
));

//serializing the user for which key is to be kept in the cookies
passport.serializeUser(function(user,done)
{
    done(null, user.id);
});


//deserializing the user from the key in the cookies

passport.deserializeUser(function(id, done)
{
    User.findById(id, function(err, user)
    {
        if(err)
        {
            console.log('Error in finding user in  ---> passport');
            return done(err);
        }

        return done(null, user);
    });
});

//check if user is authenticated or not
passport.checkAuthentication = function(req, res, next)
{
    //if the user is signed in, then pass on the request to the next function(controler's action)
    if(req.isAuthenticated())
    {
        return next();
    }

    //if user is not signin the 
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function(req, res, next)
{
    if(req.isAuthenticated())
    {
        //res.user contains the current signed in user from the session cookie and we are just sending this to the local for the views
        res.locals.user = req.user;
    }
    next();
}

//exporting the passport 
module.exports = passport;