const jwt = require("jsonwebtoken");
require("dotenv").config();

// auth
exports.auth = async (req, res, next) => {
    try {
        // get token 
        const token = req.cookies.token || req.body.token || req.header("Authorization")?.replace("Bearer ", "");

        // if token missing then return response 
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token is required",
            });
        }

        // verify the token  
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decode);
            req.user = decode;
        } catch (err) {
            return res.status(401).json({
                success: false,
                message: "Invalid token",
                error: err.message,  // Include the error message from JWT verification
            });
        }
        next();
    } catch (err) {
        console.log(err);
        return res.status(401).json({
            success: false,
            message: "Something went wrong while validating the token",
            error: err.message,  // Include the error message for debugging
        });
    }
}


