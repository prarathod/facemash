import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import User from '../models/Users.js';

/* REGISTER USER */
export const register = async (req, res) => {
    try {
        const { firstName, lastName, email, password, picturePath, friends, location, occupation } = req.body;

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: passwordHash,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random() * 10000),
            impressions: Math.floor(Math.random() * 10000),
        });

        const savedUser = await newUser.save();
        return res.status(201).json(savedUser);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

/* LOGING IN */
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userSend = await User.findOne({ email: email });
        if (!userSend) return res.status(400).json({ massage: "User does not exits." });

        const isMatch = await bcrypt.compare(password, userSend.password);
        if (!isMatch) return res.status(400).josn({ massage: "Invalid credentials." });

        const token = jwt.sign({ id: userSend._id }, process.env.JWT_SECRET_KEY);
        let user = {
            _id: userSend._id,
            firstName: userSend.firstName,
            lastName: userSend.lastName,
            email: userSend.email,
            picturePath: userSend.picturePath,
            friends: userSend.friends,
            viewedProfile: userSend.viewedProfile,
            impressions: userSend.impressions,
        }
        return res.status(200).json({ token, user });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}