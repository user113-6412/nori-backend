import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// This interface tells TypeScript what our JWT payload looks like
// When we create a JWT token, we include an id in it like: jwt.sign({ id: "user123" }, secret)
interface JwtPayload {
    id: string;
}

// This interface tells TypeScript that our request will be extended with a userId property
interface AuthRequest extends Request {
    userId?: string;
}

// This is our middleware function
// The types after the parameters are TypeScript-specific
function authMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    console.log("we hit the middleware");
    console.log("auth header:", authHeader);

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: "No token provided or invalid format" });
    }

    const token = authHeader.split(' ')[1]; // Get the token part after 'Bearer '

    jwt.verify(
        token, 
        process.env.JWT_SECRET as string, 
        function verifyCallback(err, decoded) {
            if (err) {
                console.log("Token verification failed:", err);
                return res.status(401).json({ message: "Invalid token" });
            }
            
            req.userId = (decoded as JwtPayload).id;
            console.log("we passed the middleware");
            next();
        }
    );
}

export default authMiddleware;