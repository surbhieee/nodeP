const express = require('express')
const app = express()
const mongoose = require('mongoose');
const fs = require('fs');
let routePath = './routes';
let models = './schema';

fs.readdirSync(models).forEach((file)=>{
    if(~file.indexOf('.js')) require(models + '/' + file)
})

fs.readdirSync(routePath).forEach(function(file){
    if(~file.indexOf('.js')){
        let route = require(routePath + '/' + file);
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