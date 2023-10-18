import  { Express } from "express";
import cors from "cors";

import HealthCheckController from "../../interface/controller/HealthCheckController";
import {
    BearerTokenJWT,
    Description,
    ExpressInitializer, SwaggerEndpoint,
    SwaggerInitializer, Theme, ThemesType,
    Title,
    Version
} from "express-swagger-autoconfigure";
import rateLimit from "express-rate-limit";
import UserAdmController from "../../interface/controller/UserAdmController";
import ProjectController from "../../interface/controller/ProjectController";
import SkillController from "../../interface/controller/SkillController";


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
        new UserAdmController();
        new ProjectController();
        new SkillController();
    }

    public getApp(): Express {
        return this.app;
    }
}