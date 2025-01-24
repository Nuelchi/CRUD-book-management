const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');


const Userschema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'please enter your name']
        },
        email: {
            type: String,
            required: [true, 'please enter your email'],
            unique: true,
            validate: [validator.isEmail, 'please enter a valid email address']

        },
        password: {
            type: String,
            required: [true, 'please enter a a password'],
            minlength: 8,
            
        },
        confirmPassword: {
            type: String,
            required: [true, 'please confirm your password'],
            minlength: 8,
            validate: {
                validator: function (confirmPassword){
                    return confirmPassword === this.password
                },
                message: 'password and confirmPassword do not match'
            }
        },
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user'
        },
    }
)

Userschema.pre('save', async function (){
    this.password = await bcrypt.hash(this.password, 10);
    this.confirmPassword = undefined;
});

const User = mongoose.model('User', Userschema)
module.exports = User;