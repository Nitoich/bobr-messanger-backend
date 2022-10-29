import {Injectable, NestMiddleware} from "@nestjs/common";
import {NextFunction, Request, Response} from "express";
import JWT, {extractHS256Token, verifyHS256Token} from "../support/JWT";

@Injectable()
export class AuthorizedMiddleware implements NestMiddleware{
    use(req: Request, res: Response, next: NextFunction) {
        if(!req.headers.authorization) {
            res.status(401);
            res.send({
                error: {
                    code: 401,
                    message: 'Unauthorized'
                }
            });
            return false;
        }
        const [bearer, token] = req.headers.authorization.split(' ');

        if(!verifyHS256Token(token, JWT.getKey())) {
            res.status(401);
            res.send({
                error: {
                    code: 401,
                    message: 'Token incorrect!'
                }
            });
            return false;
        }
        const payload:any = extractHS256Token(token, JWT.getKey());
        if(payload.exp < new Date().getTime()) {
            res.status(403);
            res.send({
                error: {
                    code: 403,
                    message: 'Access token is expired!'
                }
            });

            return false;
        }

        req.body.payload = payload;

        next();
    }
}