const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        require: [true," name is required"],
        minlength: [5,"name should be at least 5 char"],
        maxlength: [50,"name should be less then 50 char"],
        trim: true
    },
    email: {
        require: [true,"email is required"],
        unique: [true,"This email is already exists"],
        lowercase : true,
        type: String
    },
    password: {
        type: String,
        select: false 
    },
    forgetPasswordToken: {
        type: String
    },
    forgetPasswordExpiryDate: {
        type: Date 
    }
},{timestamps: true}
)


const userModel = mongoose.model('users',userSchema);


module.exports = userModel;