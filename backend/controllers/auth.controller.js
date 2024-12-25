import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateTokens.js";

export const signup=async (req,res)=>{
    try{
     //Extracting infromation
     const {fullName,userName,password,confirmPassword,gender}=req.body;

     //Validations
     if([fullName,userName,password,gender].some((field)=>field?.trim==="")){
       //If on trimming empty
       return res.status(400).json({error:"Some of the required fields are empty"});
     }
     if(password!=confirmPassword){
        return res.status(400).json({error:"Passwords don't match"});
     }
     //Check if the user already exists,return error if does
     const user=await User.findOne({userName});
     if(user){
        return res.status(400).json({error:"Username already exists"});
     }
    
     //Hash password here even though you could have done this in model itself
	 const salt= await bcrypt.genSalt(10);
	 const hashedPassword = await bcrypt.hash(password, salt);

     //Deal with the profilePicture through an API
     const boyProfilePic=`https://avatar.iran.liara.run/public/boy?username=${userName}`
     const girlProfilePic=`https://avatar.iran.liara.run/public/girl?username=${userName}`



     //Create a new user and save it in database, you could have directly used User.create
     const newUser=new User({
       fullName,
       userName,
       password: hashedPassword,
       gender,
       profilePic:gender==='male'?boyProfilePic:girlProfilePic,
     })

     //!!You can add more checks here if the user was created successfully in mongoDb or not
    if(newUser)  {
		//Generate JWT token 
		generateTokenAndSetCookie(newUser._id,res);
		await newUser.save();

     //Send all the data in json form in response

     res.status(201).json({
        _id:newUser._id,
        fullName:newUser.fullName,
        userName:newUser.userName,
        profilePic:newUser.profilePic
     });
	}else {
		res.status(400).json({error:"Invalid user data"});
	 
	} 

  
    }catch(error){
     console.log("Error signing up:",error.message);
     res.status(500).json({error:"Internal Server Error"});
    }
}


export const login= async(req,res)=>{
    try {
		const{username,password} = req.body;
		const user = await User.findOne({username});
		const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

		if (!user || !isPasswordCorrect) {
			return res.status(400).json({ error: "Invalid username or password" });
		}
		generateTokenAndSetCookie(user._id, res);
		res.status(200).json({
			_id: user._id,
			fullName: user.fullName,
			username: user.username,
			profilePic: user.profilePic,
		});


	}catch(error){
     console.log("Error in login controller",error.message);
     res.status(500).json({error:"Internal Server Error"});
    } 
};
export const logout=(req,res)=>{
    try {
		res.cookie("jwt", "", { maxAge: 0 });
		res.status(200).json({ message: "Logged out successfully" });
	} catch (error) {
		console.log("Error in logout controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};