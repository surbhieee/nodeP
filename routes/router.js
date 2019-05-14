const express = require('express');
const blogController = require("../controller/blogController")
const mongoose = require('mongoose');
//const shortid = require('shortid');

//Importing the model here 
const BlogModel = mongoose.model('blogInfo')
const User = mongoose.model('User')

const middleware = require('./../body-middleware');
//app.use(middleware.checkQueryParameters);

const setRouter = (app) => {
    
    app.get('/getAllBlogs', blogController.getAllBlog);
    app.post('/createBlog', blogController.createBlog);
    app.put('/edit',blogController.editBlog);
    app.post('/deleteBlog',blogController.deleteBlog);

    app.get('/split/name', (req, res) => {
        console.log(req.query.fullName);
    let name = req.query.fullName;
    let splitNameArray = name.split(" ");
    let resObject = {
        "firstName": splitNameArray[0],
        "lastName": splitNameArray[1]
    };
    res.send(resObject);

});// end split name

app.get('/calculate/age', (req, res) => {
    console.log(req.query.dob);
 birthDate = new Date(req.query.dob);
    otherDate = new Date();
    console.log(otherDate);

    var years = (otherDate.getFullYear() - birthDate.getFullYear());

    if (otherDate.getMonth() < birthDate.getMonth() || 
        otherDate.getMonth() == birthDate.getMonth() && otherDate.getDate() < birthDate.getDate()) {
        years--;
    }
let age = {
    age: years
}
res.send((age));
 
});// end calculate age


app.get('/users', (req, res) => {
    User.find()
        .select('-__v -_id')
        .lean()
        .exec((err, result) => {
            if (err) {
                console.log(err);
                res.send(err);
            } else if (result === undefined || result === null || result === '') {
                console.log('No Blog Found');
                res.send("No Blog Found");
            } else {
                res.send(result);
            }
        });
});

app.get('/users/:userId', (req, res) => {
    console.log(req.params);
    User.findOne({"userId": req.params.userId}).exec((err,result) => {
        if(err){
            console.log("err");
            res.send(err);
        }else if (result === undefined || result === null || result === '') {
            console.log('No Blog Found');
                res.send("No Blog Found");
        } else {
            res.send(result);
        }
    });
});

app.get('/query',middleware.checkQueryParameters, (req,res)=>{console.log('hello')} );

}

module.exports = {
    setRouter:setRouter
}