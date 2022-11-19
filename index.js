const express=require('express');
const port=8000;
const app=express();
const expressLayouts=require('express-ejs-layouts');


app.use(expressLayouts);

//uses express router
app.use('/', require('./routes'));

//setup view engine and set directory to view engine
app.set('view engine', 'ejs');
app.set('views', './views')


app.listen(port, function(err)
{
    if(err)
    {
        console.log(`Error in connecting to server ${err}`);
    }
    console.log(`Server running in port number ${port}`);
});
