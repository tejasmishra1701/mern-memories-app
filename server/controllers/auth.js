import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

export const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({ message: "User doesn't exist." });
        }

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials." });
        }

        const token = jwt.sign(
            { email: existingUser.email, id: existingUser._id },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.status(200).json({ 
            result: {
                _id: existingUser._id,
                email: existingUser.email,
                username: existingUser.username,
                name: existingUser.name,
                age: existingUser.age,
                gender: existingUser.gender,
                bio: existingUser.bio,
                spiritCharacter: existingUser.spiritCharacter
            }, 
            token 
        });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong." });
    }
};

export const signup = async (req, res) => {
    const { 
        email, 
        password, 
        confirmPassword,
        username, 
        name, 
        age, 
        gender, 
        bio, 
        spiritCharacter 
    } = req.body;

    try {
        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords don't match." });
        }

        const existingUser = await User.findOne({ 
            $or: [{ email }, { username }] 
        });
        
        if (existingUser) {
            return res.status(400).json({ 
                message: existingUser.email === email 
                    ? "Email already in use." 
                    : "Username already taken."
            });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = await User.create({
            email,
            password: hashedPassword,
            username,
            name,
            age,
            gender,
            bio,
            spiritCharacter
        });

        const token = jwt.sign(
            { email: newUser.email, id: newUser._id },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.status(201).json({ 
            result: {
                _id: newUser._id,
                email: newUser.email,
                username: newUser.username,
                name: newUser.name,
                age: newUser.age,
                gender: newUser.gender,
                bio: newUser.bio,
                spiritCharacter: newUser.spiritCharacter
            }, 
            token 
        });
    } catch (error) {
        res.status(500).json({ 
            message: "Something went wrong during registration." 
        });
    }
};

export const updateProfile = async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(
            id,
            updatedData,
            { new: true }
        ).select('-password');

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found." });
        }

        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ 
            message: "Error updating profile." 
        });
    }
};