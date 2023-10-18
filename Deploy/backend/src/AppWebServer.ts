import  { Express } from "express";
import cors from "cors";

import {
    BearerTokenJWT,
    ExpressInitializer, SwaggerEndpoint,
    SwaggerInitializer, Theme, ThemesType,
    Title,
    Version
} from "express-swagger-autoconfigure";
import rateLimit from "express-rate-limit";
import HealthCheckController from "./HealthCheckController";


@SwaggerInitializer
@SwaggerEndpoint("/documentation")
@Title("Personal Portifolio")
@Version("1.0.0")
@BearerTokenJWT(true)
@Theme(ThemesType.MATERIAL)
export default class App {

    @ExpressInitializer
    private app: Express;

    constructor () {
        this.configApp();
        this.initControllers();
        this.app.use( cors() )
    }

    private configApp():void {

        const limiterDDOS = rateLimit({
            windowMs: 15 * 60 * 1000, // 15 minutes
            max: 300, // limit each IP to 300 requests per windowMs
            message: "Too many requests, please try again later"
        })
        this.app.use(limiterDDOS)
    }

    private initControllers(){
        new HealthCheckController();
    }

    public getApp(): Express {
        return this.app;
    }
}