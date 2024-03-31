const mongoose = require('mongoose');

const MONGODB_URL = process.env.MONGODB_URL || "http://localhost:6010";

const databaseconnect = () => {
    mongoose
        .connect(MONGODB_URL)
        .then((conn) => console.log(`Connect to DB : ${conn.connection.host}`))
        .catch((e) => console.log(e.message));
}


module.exports = databaseconnect ;