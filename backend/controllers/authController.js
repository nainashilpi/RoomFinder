import User from '../models/userModel.js';
import crypto from 'crypto'; //for hashing password
import jwt from 'jsonwebtoken'; //for generating jwt token
import dotenv from 'dotenv';
dotenv.config();


 export async function register(req, res) {
    const {username,email,password} = req.body;

    const isUSerExist = await User.findOne({
         $or: [
            { email }, 
            { username }
        ]
    });

    if(isUSerExist){
        return res.status(400).json({message: "User already exists"});
    }

    const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');

    const newUser = new User({
        username,
        email,
        password: hashedPassword
    });

    await newUser.save();

    const token = jwt.sign({
        id: newUser._id,
        username: newUser.username,
        email: newUser.email
    }, process.env.JWT_SECRET, {expiresIn: '1d'});

    res.status(201).json({
        message: "User registered successfully", 
        user: {
            username: newUser.username,
            email: newUser.email
        }, 
        token
    });

}

export async function login(req, res) {
    const {email, password} = req.body;

    const user = await User.findOne({ email });

    if(!user){
        return res.status(400).json({message: "User not found"});
    }

    const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');

    if(user.password !== hashedPassword){
        return res.status(400).json({message: "Invalid password"});
    }

    const token = jwt.sign({
        id: user._id,
        username: user.username,
        email: user.email
    }, process.env.JWT_SECRET, {expiresIn: '1d'});

    res.status(200).json({
        message: "Login successful",
        user: {
            username: user.username,
            email: user.email
        },
        token
    });

}
