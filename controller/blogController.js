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
    console.log(req.body);
//console.log(req.body.title);
    let newBlog = new BlogModel({
        
        blogId: req.body.blogId,
        title: req.body.title,
        description: req.body.description
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

let editBlog = (req, res)=>{
console.log(req.body);
BlogModel.update({'blogId': req.body.blogId}, req.body).exec((err, result) => {

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

}

let deleteBlog = (req, res)=>{
    console.log(req.body);
    BlogModel.remove({'blogId':req.body.blogId}, (err, result) => {
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
}


module.exports = {
    getAllBlog: getAllBlog,
    createBlog: createBlog,
    editBlog: editBlog,
    deleteBlog: deleteBlog
}