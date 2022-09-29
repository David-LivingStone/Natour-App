const fs = require('fs');
const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config({path: '.env'});
const Tour = require('./../models/tourModel')
mongoose.connect("mongodb+srv://david:9MIklzs0gez6LmcK@natours.3ttskzl.mongodb.net/?retryWrites=true&w=majority", {
   
}).then(con =>{
    //console.log(con.connections);
    console.log('DB connection sucessful!');
});


//READ JSON FILE
const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8')
    );

//IMPORT DATA INTO DB

const importData = async () => {
    try{
        await Tour.create(tours);
        console.log('Data sucessfully loaded!')
        process.exit();
    } catch (err) {
        console.log(err);
    }
     
};

//DELETE ALL DATA FROM DB

const deleteData = async () => {
    try {
        await Tour.deleteMany();
        console.log('Data successfully deleted!');
        
    } catch (err) { 
        console.log(err);
    }process.exit();
}

if (process.argv[2] ==='--import') {
    
} else if (process.argv[2] === '--delete') {
    deleteData();
}importData();