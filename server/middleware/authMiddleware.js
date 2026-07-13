import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            return res.status(401).json({
                message: "Access Denied. No Token Provided",
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;

        next();
    } catch (error) {
        res.status(401).json({
            message: "Invalid Token",
        });
    }
};

export default authMiddleware;