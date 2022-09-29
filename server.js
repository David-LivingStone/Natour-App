const mongoose = require("mongoose");
const dotenv = require('dotenv');



// process.on('uncaughtException', err => {
//     console.log('UNCAUGHT REJECTION! 💥 Shutting down...');
//     console.log(err.name, err.message);
//     process.exit(1);
// });

dotenv.config({path: '.env'});//Read all Variable from all File and Save to Nodejs


// const DB = process.env.DB_URL.replace(
//     '<PASSWORD>',
//     process.env.DATABASE_PASSWORD
//     );

mongoose.connect("mongodb+srv://david:9MIklzs0gez6LmcK@natours.3ttskzl.mongodb.net/?retryWrites=true&w=majority", {
    //useNewUrlParser: true,
    //useCreateIndex: true,
   // useFindAndModify: false
}).then(con =>{
    //console.log(con.connections);
    console.log('DB connection sucessful!');
});




// const natoursTour = new Tour({
//     name: 'The new Haven2',
//     rating: 4.7,
//     price: 497
// });

// natoursTour
// .save()s
// .then(doc => {
//     console.log(doc);
// })
// .catch(err => {
//     console.log('ERROR:', err);
// });

const app = require('./app');
const port = process.env.PORT || 3000;
const sever = app.listen(port, () =>{
    console.log(`App running on port ${port}..`);
});

process.on('unhandledRejection', err => {
    console.log('UNHANDLED REJECTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});

