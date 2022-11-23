const express=require('express');
const cookieparser=require('cookie-parser');
const port=8000;
const app=express();
const expressLayouts=require('express-ejs-layouts');
const db=require('./config/mongoose');
//used for session cookies
const session = require('express-session');
//used for passport authentication
const passport=require('passport');
const passportLocal=require('./config/passport-local-startegy');
//used for storing session cookie in mongo store 
const MongoStore = require('connect-mongo');

app.use(express.urlencoded());

app.use(cookieparser());

//setup for static files
app.use(express.static('./assets'));

//using this for layout wrapper
app.use(expressLayouts);

//extract styles and script form sub pages to layout 
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//setup view engine and set directory to view engine
app.set('view engine', 'ejs');
app.set('views', './views')

//for the session
app.use(session(
    {
        name: 'codeial',
        //TODO change the secret before deployment in produnction mode
        secret: 'blahsomething',
        saveUninitialized: false,
        resave: false,
        cookie:{
            maxAge: (1000 * 60 * 100)
        },
        //mongo store is used to store the session cookie in the db
        store: MongoStore.create(
            {
                //db table url
                mongoUrl: 'mongodb://localhost/codeial_development',
                autoRemove: 'disabled'
            },
            function(err)
            {
                console.log(err || 'connect-mongo setup ok');
            }
        )
    }
));

//passport 
app.use(passport.initialize());
app.use(passport.session());

//after adding this line code is giving error
app.use(passport.setAuthenticatedUser);

//uses express router
app.use('/', require('./routes'));

app.listen(port, function(err)
{
    if(err)
    {
        console.log(`Error in connecting to server ${err}`);
    }
    console.log(`Server running in port number ${port}`);
});
