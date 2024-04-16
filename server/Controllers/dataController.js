const userModel = require('../Models/user')

const Data = async (req,res)=>{

    try{
        const users = await userModel.find();

        if(!users || users.length ===0){
            return res.status(404).json({msg : "No Users Found."})
        }

        return res.status(200).json({msg : "Users found", users})
    }
    catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'An error occurred while fetching data' });
    }
}

module.exports = Data;