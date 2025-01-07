// import jwt from "jsonwebtoken";

// const isAuthenticated = async (req, res, next) => {
//     try {
//         const token = req.cookies.token;
//         if (!token) {
//             return res.status(401).json({
//                 message: "User not authenticated",
//                 success: false,
//             })
//         }
//         const decode = await jwt.verify(token, process.env.SECRET_KEY);
//         if(!decode){
//             return res.status(401).json({
//                 message:"Invalid token",
//                 success:false
//             })
//         };
//         req.id = decode.userId;
//         next();
//     } catch (error) {
//         console.log(error);
//     }
// }
// export default isAuthenticated;



// import jwt from "jsonwebtoken";

// const isAuthenticated = async (req, res, next) => {
//     try {
//         const token = req.cookies?.token;  // Optional chaining to avoid undefined errors
//         if (!token) {
//             return res.status(401).json({
//                 message: "No token provided. Please log in.",
//                 success: false,
//             });
//         }
        
//         jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
//             if (err) {
//                 return res.status(401).json({
//                     message: "Invalid or expired token. Please log in again.",
//                     success: false,
//                 });
//             }
//             req.id = decoded.userId;  // Attach user ID to request for future use
//             next();  // Proceed to the next middleware
//         });
        
//     } catch (error) {
//         console.error("Authentication Error:", error);
//         return res.status(500).json({
//             message: "Internal server error during authentication.",
//             success: false,
//         });
//     }
// };

// export default isAuthenticated;




import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies?.token;  // Optional chaining to avoid errors
        if (!token) {
            return res.status(401).json({
                message: "Unauthorized - No token provided.",
                success: false,
            });
        }

        jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    message: "Unauthorized - Invalid or expired token.",
                    success: false,
                });
            }
            
            req.user = decoded;  // Attach full decoded user info
            req.id = decoded.userId;  // Add userId to request for future use
            next();
        });
    } catch (error) {
        console.error("Authentication Error:", error);
        return res.status(500).json({
            message: "Internal server error during authentication.",
            success: false,
        });
    }
};

export default isAuthenticated;

