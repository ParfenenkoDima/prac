var mongoClient = require('mongodb').MongoClient;

const url = "mongodb://localhost:27017/usersdb";
let users = [{name: "Dima", age: 20} , {name: "Alex", age: 21}, {name: "Andy", age: 22}];
let user = {name: "Sasha", age: 44};

mongoClient.connect(url, function(err, db) {
    if(err) {return console.log(err);}

    console.log("Connected correctly to server");

    let col = db.collection('users');
    
    col.insertOne(user, function(err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log('added one:');
             db.close();
        }
    });

    col.insertMany(users, function(err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log('added many:');
             db.close();
        }
    });

    col.find().toArray(function(err, results) {
        console.log('USERS in DB: ')
        console.log(results);
        db.close();
    });

    col.find({name: "Tom", age: 23}).toArray(function(err, results) {
        console.log('The users Tom 23 are: ');
        db.close();
    });

    col.findOne(function(err, doc) {  
        console.log('Find one, first: ');
        console.log(doc);
        db.close();
    });

    col.findOne({name: "Bob"}, function(err, doc){
        console.log('Find custom one Bob: ');
        console.log(doc);
        db.close();
    });

    col.deleteMany({name: 'Tom'}, function(err, result) {
        console.log('deleting many: ');
        db.close();
    });

    col.deleteOne({name: "Bob"}, function(err, result) {
        console.log('deleting one: ');
        db.close();
    });

    col.findOneAndDelete({age: 21}, function(err, result) {
        console.log('delete one and return it: ');
        db.close();
    });


    col.findOneAndUpdate(
        {age: 21},
        { $set: {age: 25}},
        function(err, result){
             
            console.log(result);
            db.close();
    });

    col.updateMany(
        {name: "Sam"},
        { $set: {name: "Bob"}},
        function(err, result) {         
            console.log(result);
            db.close();
    });

    col.updateOne(
        {name: "Tom"}, 
        { $set: {name: "Tom Junior", age:33}},
        function(err, result) {
            console.log(result);
            db.close();
    });

    col.drop(function(err, result) {
        console.log('clear database: ');
        console.log(result);
        db.close();
    });
});