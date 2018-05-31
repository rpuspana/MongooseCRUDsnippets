const mongoose = require('mongoose');

// use the default promisses
mongoose.Promise = global.Promise;

//connect to mongodb aka to mongod.exe and to the db App(if it's not created it will create it)
// the connection will stay alive, no need to MongoClient.connect() for every operation
mongoose.connect('mongodb://localhost:27017/App');

// store data the user entered
// see if he's data is valid: brand entered is a string, model entered in a string, ..., avail is a Boolean
// if everthing is correct, go to the model, do the connection, enter the user info to the db, get a response


// validation of user data
const carSchema = mongoose.Schema({
    brand: String,
    model: String,
    year: Number,
    avail: Boolean
});

// model for entering car data in the Car collection
// this model stanslates to a collection in the db. If this collection is not found,
// it will be created for us
const Car = mongoose.model('Car', carSchema);


// #### STROE DATA save() ####

// const addCar = new Car({
//         // info to store in the db
//         brand: "Ford",
//         model: "Focus",
//         year: "2000",
//         avail: "true"
// });

// pass the data through model, model is going to check the data against the schema, 
// if everthing is correct, go to the model, do the connection, 
// enter the user info to the db, get a response
// err = while saving to the db, we encounter an console.error
// doc = document that was inserted in the collection
// addCar.save((err, doc) => {
//     if (err) {
//         return console.log(err)
//     }

//     console.log(doc);
// });


// #### GET DATA FIND(), FINDONE(), FINDBYID() ####

// # FIND() - get many / one results
// get the document with brand Nissan
// if returns an array of with one/many objects
// Car.find({brand: "Ford"}, (err, doc) => {
//     if (err) {
//         return console.log(err);
//     }

//     console.log(doc);
// });

// # FINDONE() - get just one result
// if returns an array of with one object
// Car.findOne({_id: "5b0e5e91b65cc92e7cd0d513"}, (err, doc) => {
//     if (err) {
//         return console.log(err);
//     }

//     console.log(doc);
// });

// # FINDBYID() - get just one result
// if returns an array of with one object
// Car.findById("5b0e5e91b65cc92e7cd0d513", (err, doc) => {
//     if (err) {
//         return console.log(err);
//     }

//     console.log(doc);
// });


// #### DELETE DATA  ####

// # FINDONEANDREMOVE()
// returns the document that was deleted as on object
// Car.findOneAndRemove({brand: "Nissan"}, (err, doc) => {
//     if (err) return console.log(err);

//     console.log(doc);
// })

// # FINDONEANDREMOVE()
// returns the document that was deleted as on object
// Car.findByIdAndRemove("5b0e5b281ab9b20f7005624e", (err, doc) => {
//     if (err) return console.log(err);

//     console.log(doc);
// })

// # REMOVE() - just one document
// returns the document that was deleted as on object
// Car.remove({brand: "Ford"}, (err, doc) => {
//     if (err) return console.log(err);

//     console.log(doc);
// })

// # REMOVE() - all documents from the collection
// returns the document that was deleted as on object
// Car.remove({}, (err, doc) => {
//     if (err) return console.log(err);

//     console.log(doc);
// })


// #### UPDATE() ####

// all documents from the collection
// returns { n: 1, nModified: 1, ok: 1 }
Car.update({_id: "5b0e79c35651f6af92aa2694"},
    {
        $set:{
            year: 2001
        }
    },
    (err, doc) => {
        if (err) return console.log(err);

        console.log(doc);
    }
);

// update just one doc
// you can use the id or just {model: "Ford"} instead of the id
// Car.findByIdAndUpdate("5b0e79c35651f6af92aa2696", {
//     $set: {
//         model: "ka"
//     }
// }, {
//     // true = return updated document, false = old document
//     $new: false
// }, (err, doc) => {
//     if (err) return console.log(err);

//     console.log(doc);
// });

// method simmilar to the one above
// car = doc returned by the db = old doc
// the process below is called chaining methods
Car.findById("5b0e79c35651f6af92aa2696", (err, car) => {
    if (err) return console.log(err);

    console.log(car);

    // change the brand
    car.set({
        brand: "whatever"
    });

    // doc = new doc
    car.save((err, doc) => {
        if (err) return console.log(err);


    console.log(doc);
    })
})