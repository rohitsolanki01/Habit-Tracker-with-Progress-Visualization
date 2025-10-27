const User = require("../models/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const genrateToken = (id) => {
    return jwt.sign({id} , process.env.JWT_SECRET,{expiresIn:"7d"})
}

const registerUser = async (req,res) => {
    try{
        const {name,email,password} = req.body;

        const userExxist = await User.findOne({email});
        if(userExxist) return res.status(400).json({Message : "User is already  exists"})

        const hashPassword = await bcrypt.hash(password,10);

        const user = await User.create({
            name,
            email,
            password : hashPassword,
        })

        await user.save();
        res.status(201).json({
            _id :user._id,
            name,
            email,
            token : genrateToken(user._id),
        })

    }catch(error){
        console.log(error);
        res.status(500).json({Message : "Internal Server Error"})
    }
}


const login = async (req,res) => {
    try{
        const {email,password} = req.body;

        const user = await User.findOne({email});
        if(!user) return res.status(400).json({Message : "User not Found"});

        const isPasswordMatched = await bcrypt.compare(password , user.password);
        if(!isPasswordMatched) return res.status(400).json({Message : "Wrong Password try again"});


        res.json({
            Message : "Login Successfull",
            _id : user._id,
            name : user.name,
            email:user.email,
            token :genrateToken(user._id),
        })
    }catch(error){
        console.log(error);
        res.status(500).json({Message : "Internal Server Error"})
    }
}

const getProfile = async (req,res) => {
    try{
        const user = await User.findById(req.user.id).select("-password");
        res.json(user)
    }catch(err){
        console.log(err);
        res.status(500).json({Message : "Internal Server Error"})
    }
}


module.exports ={registerUser,login,getProfile}