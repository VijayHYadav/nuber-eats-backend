import { NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

// One Way to write middleware as function
export function jwtMiddleware(req: Request, res: Response, next: NextFunction) {
    console.log(req.headers);
    next();
}

// One Way to write middleware as Class
// export class JwtMiddleware implements NestMiddleware {
//     use(req: Request, res: Response, next: NextFunction) {
//         console.log(req.headers);
//         next();
//     }
// }