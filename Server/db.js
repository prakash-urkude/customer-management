const mongoose = require('mongoose');
require('dotenv').config();

exports.dbConnection = () => {
    mongoose.connect(process.env.DATABASE, {
        useNewUrlParser: true,
      
    })
    .then((connection) => {
        console.log("Database is connected on port:", process.env.PORT);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}
 