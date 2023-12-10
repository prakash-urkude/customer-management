// Create a new user
const bcrypt = require('bcrypt');
const userModel = require('../Model/userModel'); 

const jwt = require("jsonwebtoken")
// Register 
const register = async function (req, res) {
  try {
    const data = req.body;
    const { firstName, lastName, email, password, location, role } = data;

    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(400).send({ status: false, message: "Email already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new userModel({
      firstName,
      lastName,
      location,
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();

    console.log('userController30 - newUser:'  , newUser)
    return res.status(201).send({ status: true, message: "Successful Registration", data: newUser });
  } catch (err) {
    console.error('Error during registration:', err);
    return res.status(500).send({ status: false, message: 'Internal server error' });
  }
};

// Login 
const login = async function (req, res) {
    try {
      const data = req.body;
      const { email, password } = data;
  
      let user = await userModel.findOne({ email: email })
  
      if (!user) {
        return res.status(404).send({ status: false, message: "User not found with this Email" });
      }
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) {
        return res.status(401).send({ status: false, message: "Incorrect password" });
      }
  
      console.log('userController55 - user:'  , user)
      let accessToken = jwt.sign(
        {
          Id: user._id.toString(),
          email: email
        },
        process.env.SECRET_KEY,
        { expiresIn: "24h" } 
      );
  
      console.log('userController63 - accessToken:'  , accessToken)
      res.setHeader("x-api-key", accessToken);

      const responseData = {
        Id: user._id.toString(),
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        location: user.location,
        password:user.password,
        accessToken: accessToken
      };
  
      return res.status(200).send({
        status: true,
        message: "LogIn Successfully..",
        data: responseData
      });
    } catch (err) {
      return res.status(500).send({ status: false, message: err.message });
    }
  };

  // Get all users
const viewAllUser =  async (req, res) => {
  try {

  const users = await userModel.find().sort({ _id: -1 });

     return res.status(200).json({ status: true, message: "All User List", data: users });
  } catch (error) {
    return  res.status(500).json({ error: error.message });
  }
};

// Get all users by location
const viewUserByLocation =  async (req, res) => {
    try {
      const { location } = req.query;

    if (!location) {
      const users = await userModel.find().sort({ _id: -1 });

      return res.status(200).json({ status: true, data: users });
    }
    const users = await userModel.find({ location }).sort({ _id: -1 }); //for newest first

    // console.log('user.length108:' , users.length)

    if(users.length == 0) { return res.status(200).json({message:'no user is avalilable in this location'})}

        return res.status(200).json({ status: true, message: "All User List", data: users });
    } catch (error) {
       return res.status(500).json({ error: error.message });
    }
};

// Get a specific user by ID
const specificUser =  async (req, res) => {
    try {
        const user = await userModel.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
      return  res.status(200).json({status: true, message: "View Details", data: user });
    } catch (error) {
      return  res.status(500).json({ error: error.message });
    }
};

// Update a user by ID
const UpdateUser = async (req, res) => {
    try {
      console.log('134 - user:' )
        const user = await userModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        console.log('135 - user:' , user)
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
      return  res.status(200).json({status: true, message: "Update Details successful", data: user });
    } catch (error) {
      return  res.status(500).json({ error: error.message });
    }
};

// Delete a user by ID
const deleteUser =  async (req, res) => {
    try {
        const user = await userModel.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
       return res.status(204).json({status: true, message: "Delete successful", data: user });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = {
    register,
    login,
    viewAllUser,
    viewUserByLocation,
    specificUser,
    UpdateUser, 
    deleteUser
};
