let checkQueryParameters = (req,res,next)=>{
if(!req.query.name){
    res.send({
        error: true, 
        status: 403, 
        userMessage: 'some query parameter missing',
        data: `name is missing`
    });
}else if(!req.query.age){
    res.send({
        error: true, 
        status: 403, 
        userMessage: 'some query parameter missing',
        data: `age is missing`
    });
} else {
    res.send({
        error: false, 
        status: 200, 
        userMessage: 'all query parameters entered',
        data: {name: req.query.name, 
                age: req.query.age
        }
    });

}//end check query params
next();
};

module.exports = {
    checkQueryParameters:checkQueryParameters

};









