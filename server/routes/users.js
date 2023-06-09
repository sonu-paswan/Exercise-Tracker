const router = require('express').Router();
let User = require('../models/user.model');

// this endpoint handles http get request
router.route('/').get((req,res)=>{
    
    User.find()
    .then(users=> res.json(users))
    .catch(err=>res.status(400).json('Error: '+ err));

});

// this endpoint handles http post request 
router.route('/add').post((req,res)=>{
    const username = req.body.username;

    const newUser=new User({username});

    newUser.save()
    .then(()=>res.json("user added"))
    .catch(err=>res.status(400).json('Error '+ err));
});

module.exports = router;