const express = require('express');
const blogController = require("../controller/blogController")

const setRouter = (app) => {
    
    app.get('/getAllBlogs', blogController.getAllBlog);
    app.get('/createBlog', blogController.createBlog);


}

module.exports = {
    setRouter:setRouter
}