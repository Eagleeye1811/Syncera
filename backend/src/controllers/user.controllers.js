import httpStatus from "http-status";
import {User} from "../models/user.models.js";
import bcrypt, { hash } from "bcrypt"
import crypto from "crypto"

export const register = async (req,res) => {
    const {name,username,password} = req.body;

    try{
    if(!name || !username || !password){
        return res.status(httpStatus.NOT_ACCEPTABLE).json({msg:"Please fill all fields"});
    }
    if(password.length < 6){
        return res.status(httpStatus.NOT_ACCEPTABLE).json({msg:"Password must be at least 6 characters"});
    }
    const existingUser = await User.findOne({username});
    if(existingUser){
        return res.status(httpStatus.FOUND).json({msg:"User already exists"});
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
        name:name,
        username:username,
        password:hashedPassword
    })

    newUser.save();
    res.status(httpStatus.CREATED).json({msg:"User Registered Successfully"});

    }catch(error){
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({msg:"Server error"});
        console.log(error);
    }
    
} 

export const login = async (req,res) => {
    const {username,password} = req.body;

    try{
        const user = await User.findOne({username});
        if(!user){
            res.status(httpStatus.NOT_FOUND).json({msg:"User not found"});
        }
        const isCorrectPassword = await bcrypt.compare(password, user.password);
        if(isCorrectPassword){
            let token = crypto.randomBytes(20).toString("hex");
            user.token = token;
            await user.save();
            return res.status(httpStatus.OK).json({token:token})
        }else{
            res.status(httpStatus.UNAUTHORIZED).json({msg:"Invalid username or password"});
        }

    }catch(err){
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({msg:"Server Error"});
        console.log(err);
    }
}


