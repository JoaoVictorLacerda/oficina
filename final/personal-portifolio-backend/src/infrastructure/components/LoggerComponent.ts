import winston from "winston";
import { LoggerConfig, WinstonLoggerBuild } from "../config/LoggerConfig";


export default class LoggerComponent {

    private logger: winston.Logger;


    constructor (className:string) {
        const configLogger = new LoggerConfig();
        this.logger = configLogger.createLogger(className);
    }

    public debug(message: string, context?: object): void {

        const object = WinstonLoggerBuild.buildObjectLogger(message, context);
        this.logger.debug(object);

    }

    public info(message: string, context?: object): void {

        const object = WinstonLoggerBuild.buildObjectLogger(message, context);
        this.logger.info(object);

    }

    public error(message: string, error:unknown, context?: object): void {

        const object = WinstonLoggerBuild.buildObjectLogger(message, context, error);
        this.logger.error(object);

    }


    public warn(message: string, context?: object): void {

        const object = WinstonLoggerBuild.buildObjectLogger(message, context);
        this.logger.warn(object);

    }
}