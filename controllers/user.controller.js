import { User } from "../models/user.model.js"
import bcrypt from "bcryptjs"

export const registerController = async (req, res) => {
    try {
        const {fullName, email, password} = req.body
        if(!fullName || !email || !password) {
            return res.status(403).json({
                success: false,
                message: "All fields are required!"
            })
        }

        let user = await User.findOne({email})
        if(user) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        user = await User.create({
            fullName,
            email,
            password: hashedPassword
        })

        return res.status(201).json({
            success: true,
            message: "user registered successfully",
            user
        })
        
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            success: false,
            message: "Error in register controller",
            error
        })
    }
}

export const loginController = async (req, res) => {
    try {
        const {email, password} = req.body
        if(!email || !password) {
            return res.status(403).json({
                success: false,
                message: "All fields are required!"
            })
        }

        let user = await User.findOne({email})
        if(!user) {
            return res.status(400).json({
                success: false,
                message: "User does not exist"
            })
        }

        const isPasswordMatched = await bcrypt.compare(password, user.password)
        if(!isPasswordMatched) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password"
            })
        }

        return res.status(201).json({
            success: true,
            message: "User Logged In successfully",
            user
        })
        
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            success: false,
            message: "Error in login controller",
            error
        })
    }
}