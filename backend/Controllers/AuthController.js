const UserModel = require("../Models/User.js");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const signup = async (req, res) => {

    try {
        const { name, email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (user) {
            return res.status(409)
                .json({ message: 'User is alrady exist , you can login', success: false });
        }
        const userModel = new UserModel({ name, email, password });
        userModel.password = await bcrypt.hash(password, 10);
        await userModel.save();
        res.status(201)
            .json({
                message: "Signup successfully",
                success: true
            })
    } catch (err) {

        res.status(500)
            .json({
                message: "Internal Server error",
                success: false,
            })

    }


}


const login = async (req, res) => {

    try {

        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        const errorMsg = "Auth failed email or password is wrong";
        if (!user) {
            return res.status(403)
                .json({ message: errorMsg, success: false });
        }
        const isPassEqual = await bcrypt.compare(password, user.password);

        if (!isPassEqual) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const jwtToken = jwt.sign(
            { email: user.email, _id: user._id },// payload,
            process.env.JWT_SECRET,             // secret key
            { expiresIn: "16h" } // vaidity time


        );

        res.status(200).json({
            message: "Login successful!",
            success: true,
            jwtToken,
            email,
            name: user.name
        });
    } catch (error) {
        res.status(500).json({ message: "server error", error });
    }


};


module.exports = {
    signup, login
}