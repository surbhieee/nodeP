// const express = require('express');

// const printFunction = (req, res) => {res.send("print the function") }

// module.exports = {
//     printFunction:printFunction
// }


const express = require('express')
const mongoose = require('mongoose');
//const shortid = require('shortid');

//Importing the model here 
const BlogModel = mongoose.model('blogInfo')

let getAllBlog = (req, res) => {
    BlogModel.find()
        .select('-__v -_id')
        .lean()
        .exec((err, result) => {
            if (err) {
                console.log(err)
                res.send(err)
            } else if (result == undefined || result == null || result == '') {
                console.log('No Blog Found')
                res.send("No Blog Found")
            } else {
                res.send(result)
            }
        })
}// end get all blogs

/**
 * function to create the blog.
 */
let createBlog = (req, res) => {
    var today = Date.now()
    let blogId = 2;

    let newBlog = new BlogModel({

        blogId: ++blogId,
        title: "abc",
        description: "abc",
        // bodyHtml: req.body.blogBody,
        // isPublished: true,
        // category: req.body.category,
        // author: req.body.fullName,
        // created: today,
        // lastModified: today
    }) // end new blog model

    // let tags = (req.body.tags != undefined && req.body.tags != null && req.body.tags != '') ? req.body.tags.split(',') : []
    // newBlog.tags = tags

    newBlog.save((err, result) => {
        if (err) {
            console.log(err)
            res.send(err)
        } else {
            res.send(result)

        }
    }) // end new blog save
}




module.exports = {
    getAllBlog: getAllBlog,
    createBlog: createBlog
}