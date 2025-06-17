import mongoose from 'mongoose';
import User from '../models/user.js';

export const getUserProfile = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findById(id)
            .select('-password')
            .populate('memories');

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        
        console.log('Updating user:', id, updates);

        if (req.userId !== id) {
            return res.status(403).json({ message: "Not authorized to update this profile" });
        }

        const updatedUser = await User.findByIdAndUpdate(
            id,
            { ...updates },
            { new: true }
        ).select('-password');

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        console.log('Updated user:', updatedUser);
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error('Update error:', error);
        res.status(500).json({ message: "Failed to update profile" });
    }
};

export const followUser = async (req, res) => {
    try {
        const { id } = req.params;

        if (req.userId === id) {
            return res.status(400).json({ message: "Cannot follow yourself" });
        }

        const userToFollow = await User.findById(id);
        const currentUser = await User.findById(req.userId);

        if (!userToFollow || !currentUser) {
            return res.status(404).json({ message: "User not found" });
        }

        if (currentUser.following.includes(id)) {
            return res.status(400).json({ message: "Already following this user" });
        }

        await User.findByIdAndUpdate(req.userId, {
            $push: { following: id }
        });

        await User.findByIdAndUpdate(id, {
            $push: { followers: req.userId }
        });

        res.status(200).json({ message: "Successfully followed user" });
    } catch (error) {
        res.status(500).json({ message: "Failed to follow user" });
    }
};

export const unfollowUser = async (req, res) => {
    try {
        const { id } = req.params;

        if (req.userId === id) {
            return res.status(400).json({ message: "Cannot unfollow yourself" });
        }

        await User.findByIdAndUpdate(req.userId, {
            $pull: { following: id }
        });

        await User.findByIdAndUpdate(id, {
            $pull: { followers: req.userId }
        });

        res.status(200).json({ message: "Successfully unfollowed user" });
    } catch (error) {
        res.status(500).json({ message: "Failed to unfollow user" });
    }
};

export const getFollowers = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findById(id)
            .populate('followers', 'username name avatar');

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user.followers);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch followers" });
    }
};

export const getFollowing = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findById(id)
            .populate('following', 'username name avatar');

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user.following);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch following users" });
    }
};