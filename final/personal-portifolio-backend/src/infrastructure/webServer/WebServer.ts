import { Express } from "express";
import os from "os";
import DotenvComponent from "../components/DotenvComponent";
import LoggerComponent from "../components/LoggerComponent";
import App from "./AppWebServer";
import MongoODM from "../odm/MongoODM";
import cors from "cors";
const logger = new LoggerComponent("Server");

class Server {

    private server: Express;

    constructor (){
        const app = new App();
        this.server = app.getApp();
    }
    public async startServer():Promise<void> {
        await MongoODM.connect(DotenvComponent.API_DATABASE_URL);
        this.server.listen(DotenvComponent.PORT, Server.showTheSystemInformation);
    }

    private static showTheSystemInformation():void {
        const arch = os.arch();
        const plataform = os.platform();
        const type = os.type();
        const mem = os.totalmem();
        const cpus = os.cpus();


        logger.info(`SERVICE RUNNING ON PORT: ${DotenvComponent.PORT}`);
        logger.info(`SO: ${type} ${plataform} ${arch}`);
        logger.info(`RAM: ${Math.floor(mem * (10 ** -9))} GB`);
        logger.info(`CORES: ${cpus.length}`);
        logger.info(`CPU: ${cpus[0].model}`);
    }
}

new Server().startServer();