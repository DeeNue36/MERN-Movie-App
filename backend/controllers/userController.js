import User from "../models/userSchema.js";
import bcrypt from 'bcryptjs';
import asyncHandler from '../middlewares/asyncHandler.js'
import createToken from '../utils/createToken.js'

export const createUser = asyncHandler(async (req, res) => {
    const {username, email, password} = req.body;

    // Validate user input
    if (!username || !email || !password) {
        throw new Error('All fields are required');
    }

    // Validate existing user
    const existingUser = await User.findOne({email});
    if (existingUser) res.status(400).send('User already exists');

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create User
    const newUser = new User({username, email, password: hashedPassword})

    // Save user to the DB
    try {
        await newUser.save();
        createToken(res, newUser._id);
        
        res.status(201).json({
            _id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            isAdmin: newUser.isAdmin,
            // token: createToken(res, newUser._id)
        });
    } catch (error) {
        res.status(400)
        throw new Error("Invalid User Data");
    }

}); 

export const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;

    // Check for an existing user
    const existingUser = await User.findOne({email});

    if (existingUser) {
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);

        if (isPasswordValid) {
            createToken(res, existingUser._id);

            res.status(200).json({
                _id: existingUser._id,
                username: existingUser.username,
                email: existingUser.email,
                isAdmin: existingUser.isAdmin,
            });
        }
        else {
            res.status(401).json({
                message: "Incorrect Password"
            });
        }

    }
    else {
        res.status(401).json({
            message: "User Not Found"
        });
    }
});

export const logoutCurrentUser = asyncHandler( async(req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
    })

    res.status(200).json({
        message: "Successfully logged out"
    })
});

export const getAllUsers = asyncHandler( async(req, res) => {
    const users = await User.find({});
    res.json(users);
    // res.status(200).json(users);
});

export const getCurrentUserProfile = asyncHandler( async(req, res) => {
    const user = await User.findById(req.user._id);
    
    if (user) {
        res.json({
            _id: user._id,
            username: user.username,
            email: user.email
        })
    }
    else {
        res.status(404);
        throw new Error('User not found');
    }
});

export const updateCurrentUserProfile = asyncHandler( async(req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.username = req.body.username || user.username;
        user.email = req.body.email || user.email;

        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);
            user.password = hashedPassword;
        }

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            username: updatedUser.username,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin
        });
    }
    else {
        res.status(404);
        throw new Error('User not found');
    }
});

// export {createUser, loginUser, logoutCurrentUser, getAllUsers, getCurrentUserProfile};