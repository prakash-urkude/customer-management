const jwt = require("jsonwebtoken")


// Middleware for verifying Manager authentication
const authenticateManager = (req, res, next) => {
    const token = req.headers["x-api-key"];
  
    if (!token) {
      return res.status(401).json({ status: false, message: 'No token provided' });
    }

    try {
      const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
      if (decodedToken.role !== "Manager") {
        req.user = decodedToken; 
        next(); 
      } else {
        
        req.authError = 'Access denied';
        next(); 
      }
    } catch (error) {
      console.error(error); 
      return res.status(401).json({ status: false, message: 'Invalid token' });
    }
  };

  module.exports =  authenticateManager 