"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthMiddleware {
    constructor() {
        this.secret = "mY-$eCrEt";
    }
    authenticateToken(req, res, next) {
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
        jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET || this.secret, (err, decoded) => {
            if (err) {
                //   const { exp } = decoded as TokenPayload;
                //   if (exp && Date.now() >= exp * 1000) {
                // return res.status(401).json({ error: "Token expired" });
                //   } else {
                return res
                    .status(401)
                    .json({ error: `Token invalid - ${err.message}` });
                //   }
                // console.log("@$# req.userId", req.userId);
                // console.log("@$# decoded", decoded);
                // // req.userId = userId;
                // console.log("@$# exp", exp);
                // console.log("@$# exp && Date.now() ",exp && Date.now(), exp && exp*1000);
                //   console.log("@$# TOKEN EXPIRED");
                //   return res.status(401).json({ error: "Token expired" });
            }
            return next();
        });
    }
    authorizeRole(role) {
        return (req, res, next) => {
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
            jsonwebtoken_1.default.verify(token, 
            // process.env.JWT_SECRET || "my-jwt-secret-key",
            process.env.ACCESS_TOKEN_SECRET || this.secret, (err, decoded) => {
                if (err) {
                    return res.status(401).json({ error: "Token invalid", msg: err });
                }
                const { role: userRole, userId } = decoded;
                console.log("@$# role", role, userRole, userId, decoded);
                if (userRole !== role) {
                    return res.status(403).json({ error: "Forbidden" });
                }
                req.userId = decoded.userId;
                return next();
            });
        };
    }
}
exports.AuthMiddleware = AuthMiddleware;
// import { Request as ExpressRequest, Response, NextFunction } from "express";
// import jwt from "jsonwebtoken";
// interface TokenPayload {
//   userId: string;
// }
// interface Request extends ExpressRequest {
//     userId?: string;
//   }
// export default function authMiddleware(
//   req: Request,
//   res: Response,
//   next: NextFunction
// ): Response | void {
//   const authHeader = req.headers.authorization;
//   if (!authHeader) {
//     return res.status(401).json({ error: "No token provided" });
//   }
//   const parts = authHeader.split(" ");
//   if (parts.length !== 2) {
//     return res.status(401).json({ error: "Token error" });
//   }
//   const [scheme, token] = parts;
//   if (!/^Bearer$/i.test(scheme)) {
//     return res.status(401).json({ error: "Token malformatted" });
//   }
//   jwt.verify(
//     token,
//     process.env.JWT_SECRET || "my-jwt-secret-key",
//     (err, decoded) => {
//       if (err) {
//         return res.status(401).json({ error: "Token invalid" });
//       }
//       const { userId } = decoded as TokenPayload;
//       req.userId = userId;
//       return next();
//     }
//   );
// }
//# sourceMappingURL=authMiddleware.js.map