const express = require('express')
const app = express()
const mongoose = require('mongoose');
const fs = require('fs');
let routePath = './routes';
let models = './schema';
const bodyParser = require('body-parser')
const UserModel = require('./schema/User.js');
const User = mongoose.model('User')

const https = require('https')
//middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const middleware = require('./body-middleware');
app.use(middleware.checkQueryParameters);

fs.readdirSync(models).forEach((file)=>{
    if(~file.indexOf('.js')) require(models + '/' + file)
})

fs.readdirSync(routePath).forEach(function(file){
    if(~file.indexOf('.js')){
        let route = require(routePath + '/' + file);
        console.log(routePath + '/' + file);
        route.setRouter(app);
    }
});

const appConfig = require('./appConfig/appConfig')

app.listen(appConfig.port,() => {
    console.log("connection adapting on port 8000");
    let db = mongoose.connect(appConfig.db.uri, { useNewUrlParser: true });
})

// handling mongoose connection error
mongoose.connection.on('error', function (err) {
    console.log('database connection error');
    console.log(err)

}); // end mongoose connection error

// handling mongoose success event
mongoose.connection.on('open', function (err) {
    if (err) {
        console.log("database error");
        console.log(err);

    } else {
        console.log("database connection open success");
    }

});

//app.listen(appConfig.port, () => console.log(`Example app listening on port ${appConfig.port}!`))

user1 = new User({
    userId: "user1",
    firstName: "Akshay",
    lastName: "Kumar",
    email: "khiladi@gmail.com"
});
user2= new User({
    userId: "user2",
	firstName: "Rajnikanth",
	lastName: "",
	email: "boss@rajnikanth.com"
});

user1.save(function (err) {
  if (err) {console.log(err)}
  // saved!
});
user2.save(function (err) {
  if (err) {console.log(err)}
  // saved!
});
