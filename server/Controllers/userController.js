const userModel = require('../Models/user')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



const Registration= async (req,res)=>{
    
    const {firstname, middlename, lastname, email, password} = req.body;

    try{
        const user = await userModel.findOne({email:email});
        if(user){
            return res.status(400).json({ error: "Email already exists", email: email });
        }
        else{
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = new userModel({firstname, middlename, lastname, email, password:hashedPassword})
            user.save();
            
            return res.status(201).json({msg:"User has Registered successfully."})
        }
    }
    catch(error){
        return res.status(400).json({msg:"error found",error})
    }
}


const Login = async(req,res)=>{

    const {email,password} = req.body;

    try{
        const user = await userModel.findOne({email:email});

        if(!user){
            return res.status(401).json({ error: 'Authentication failed, invalid username' });
        }
        else{
            const passwordMatch = await bcrypt.compare(password, user.password);
            if(!passwordMatch){
                return res.status(400).json({error : "Invalid password"})
            }
            else{
                const token = jwt.sign({ userId: user._id }, 'secret_key', { expiresIn: 60 });
                const response = {
                  success: true,
                  email: user.email,
                  password: user.password,
                  token:token
                };
                return res.status(200).setHeader('Authorization', `${token}`).json({msg:"User Logged In Successfully!", response});
            }
        }
    }
    catch(error){
        return res.status(400).json({msg : "Error Occurred", error})
    }
}

module.exports ={
    Registration,
    Login
}