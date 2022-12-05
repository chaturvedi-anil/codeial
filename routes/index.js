const express=require('express');
const router=express.Router();
const homeController=require('../controllers/home_controller');

console.log('router loaded');
//for home page
router.get('/', homeController.home);
//for any request with /users routes, i will give control to /routes/users
router.use('/users', require('../routes/users'));
//for any request to /posts routes
router.use('/posts', require('../routes/posts'));
module.exports=router;