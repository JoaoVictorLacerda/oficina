import LoggerComponent from "../../infrastructure/components/LoggerComponent";
import { NextFunction, Request, Response } from "express";
import JWtComponent from "../../infrastructure/components/JWTComponent";
import NotAuthorizedException from "../../application/exceptions/NotAuthorizedException";

export default class AuthorizationTokenMiddleware {

    private logger: LoggerComponent;

    constructor() {
        this.logger = new LoggerComponent(AuthorizationTokenMiddleware.name);
    }

    public permitUserRule(){

        return async (request: Request, response:Response, next: NextFunction) => {
            const bearerToken = request.headers["authorization"];

            try {
                const token = bearerToken.split("Bearer ")[1];

                const accountDecoded = await JWtComponent.decodeToken(token);

                if(token !== undefined && accountDecoded){
                    this.logger.info("Authorization. Request authorized. Call the next function");
                    next();
                    return;
                }

                this.logger.warn("Not authorized.");
                throw new NotAuthorizedException("User not authorized")
            } catch (error: any) {
                this.logger.error("Not authorized.", error);
                if(error instanceof NotAuthorizedException){
                    return response.status(error.status).json(error.message);
                }
                return response.status(500).json(error.message);
            }
        };
    }

}