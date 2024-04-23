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

// const findUser = async (req,res)=>{
// const {_id} = req.params


// try {
//     const user = await userModel.findById({_id});

//   if(!user) return res.json({msg:"user not found"});
  

//    return res.json({msg:"user found ",user})
// } catch (error) {
//     return res.json({msg:"internal server",error})
// }

// }

const findUser = async (req, res) => {
    const userid = req.params._id;
    const email = req.query.email || req.body.email; 

    try {
        let user;
        if (userid) {
            user = await userModel.findById(userid);
        } else if (email) {
            user = await userModel.findOne({ email: email });
        } else {
            return res.status(400).json({ msg: "Please provide either user ID or email." });
        }

        if (!user) {
            return res.json({ msg: "User not found." });
        }

        return res.json({ msg: "User found", user });
    } catch (error) {
        console.error("Error finding user:", error);
        return res.status(500).json({ msg: "Internal server error. Failed to find user." });
    }
}


const userUpdate = async (req, res) => {
    const { _id } = req.params;
    const { firstname, lastname, email } = req.body;

    try {
        const user = await userModel.findByIdAndUpdate(
            { _id }, 
            { firstname, lastname, email }, 
            { new: true } 
        );

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        return res.status(200).json({ message: 'User updated successfully', user });
    } catch (error) {
        console.error('Error updating user:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

   

  
  





module.exports ={
    Registration,
    Login,
    findUser, 
    userUpdate
}