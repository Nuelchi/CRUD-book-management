const User = require('../models/user-model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(200).json({ message: 'You have signed up successfully!!, you can now login to gain full access' });

    } catch (error) {
        res.status(403).json({ message: error.message });
    }
};


const loginUser = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        // check if inputs were given
        if (!email || !password) {
            return res.status(404).json({ message: 'Password and Email required' });
        };

        //check if user exists in Data base
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'user with email not found, please ensure you entered the correct email' })
        };

        //c heck if password matches the user password in Database
        if (!await bcrypt.compare(password, user.password)) {
            return res.status(404).json({ message: 'invalid passsword' });
        };

        //assign access token to the user i fpasword is correct
        const token = jwt.sign({ id: user.id }, process.env.SECRET_STRING, {
            expiresIn: process.env.LOGIN_EXPIRY
        });
        res.cookie('jwt', token);
        res.status(404).json({ message: 'you have signed in successfully!!, your access token can be found in the cookie section' });

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};



const resetPassword = async (req, res) => {
    try {
        //ensure users cannot change their name and email
        const {email, name, password} = req.body
        if(email || name){
            return res.status(403).json({message: 'you are not permitted to change your name or email, contact support for assistance'})
        }

        //find the specific user in the database
        user = await User.findById(req.params.id).select('-confirmPassword');
        if (!user) {
            return res.status(404).json({ message: 'User with the specified ID not found!' });
        }

        //hash the new password
        const newPassword = await bcrypt.hash(password, 10);
        user.password = newPassword
        await user.save();

        // Return the updated User
        res.status(200).json({message: 'your password has been updated succesfully',});
    } catch (error) {
        // Handle any errors, such as invalid _id format or validation errors
        res.status(400).json({ message: error.message });
    }
};

// const resetPassword = async (req, res) => {
//     try {
//         const { email, name, password } = req.body;

//         // Check if the user is attempting to update email or name
//         if ('email' in req.body || 'name' in req.body) {
//             return res.status(403).json({
//                 message: 'You are not permitted to change your name or email. Contact support for assistance.'
//             });
//         }

//         // Check if the password field is provided
//         if (!password) {
//             return res.status(400).json({ message: 'Password is required for resetting.' });
//         }

//         // Find the user by ID
//         const user = await User.findById(req.params.id).select('-confirmPassword');

//         if (!user) {
//             return res.status(404).json({ message: 'User with the specified ID not found!' });
//         }

//         // Hash the new password
//         const hashedPassword = await bcrypt.hash(password, 10);
//         user.password = hashedPassword;

//         // Save the updated user
//         await user.save();

//         res.status(200).json({ message: 'Your password has been updated successfully.' });
//     } catch (error) {
//         // Handle errors (e.g., invalid ID format or other exceptions)
//         res.status(400).json({ message: error.message });
//     }
// };




const getAllUsers = async (req, res) => {
    try {
        // Fetch all users from the database
        const users = await User.find();

        // Check if there are no users
        if (users.length === 0) {
            return res.status(404).json({ message: 'No users found!' });
        }

        // Return the list of users
        res.status(200).json({ message: 'Users retrieved successfully', users });
    } catch (error) {
        // Handle any server errors
        res.status(500).json({ message: 'Failed to retrieve users', error });
    }
};




//MIDDLEWARES AND ROLES
const protectPath = async (req, res, next) => {

    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
        return res.status(401).json({ message: 'please provide an Acesss token' })
    }

    if (authorizationHeader && authorizationHeader.toLowerCase().startsWith('bearer')) {
        const token = authorizationHeader.split(' ')[1]; // Extract the token part

        // Proceed to verify the token
        try {
            const decoded = await jwt.verify(token, process.env.SECRET_STRING);
            const user = await User.findById(decoded.id);

            if (!user) {
                res.status(400).json({ message: 'user with Token not found in DB please sign up or login user' });
            }
            req.user = user;
        } catch (error) {
            console.error('Token verification failed:', error.message);
            return res.status(401).json({ message: 'Invalid or expired token' });
        }
    } else {
        return res.status(401).json({ message: 'Authorization header missing or invalid' });
    };
    next();
};



//middleware to restriction certain users from performing some roles
const restriction = (role) => {
    return (req, res, next) => {
        // Check if the user's role matches the required role
        if (req.user.role !== role) {
            console.log('req.user:', req.user.role);
            return res.status(403).json({ message: 'You do not have access to perform this action' });
        }
        next(); // Allow access to the next middleware or route handler
    };
};


module.exports = { createUser, loginUser, getAllUsers, resetPassword, protectPath, restriction };