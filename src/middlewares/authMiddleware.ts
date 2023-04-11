import { Request as ExpressRequest, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface TokenPayload {
  userId: string;
}


interface Request extends ExpressRequest {
    userId?: string;
  }

export default function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): Response | void {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "No token provided" });
  }

  const parts = authHeader.split(" ");

  if (parts.length !== 2) {
    return res.status(401).json({ error: "Token error" });
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).json({ error: "Token malformatted" });
  }

  jwt.verify(
    token,
    process.env.JWT_SECRET || "my-jwt-secret-key",
    (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: "Token invalid" });
      }

      const { userId } = decoded as TokenPayload;

      req.userId = userId;

      return next();
    }
  );
}
