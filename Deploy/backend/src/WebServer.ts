import { Express } from "express";
import os from "os";
import App from "./AppWebServer";
import "dotenv/config"
class Server {

    private server: Express;

    constructor (){
        const app = new App();
        this.server = app.getApp();
    }
    public async startServer():Promise<void> {

        this.server.listen(process.env.PORT, Server.showTheSystemInformation);
    }

    private static showTheSystemInformation():void {
        const arch = os.arch();
        const plataform = os.platform();
        const type = os.type();
        const mem = os.totalmem();
        const cpus = os.cpus();


        console.log(`SERVICE RUNNING ON PORT: ${process.env.PORT}`);
        console.log(`SO: ${type} ${plataform} ${arch}`);
        console.log(`RAM: ${Math.floor(mem * (10 ** -9))} GB`);
        console.log(`CORES: ${cpus.length}`);
        console.log(`CPU: ${cpus[0].model}`);
    }
}

new Server().startServer();