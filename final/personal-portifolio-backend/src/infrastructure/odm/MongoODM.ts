import ApplicationException from "../../application/exceptions/ApplicationException";
import LoggerComponent from "../components/LoggerComponent";
import mongoose from "mongoose";

export default class MongoODM {

    public static async connect(urlDatabase:string) {

        const logger = new LoggerComponent(MongoODM.name);
        try {
            mongoose.set("strictQuery", true);
            await mongoose.connect(urlDatabase);
            logger.info("Database connect successfully");
            return "OK";
        } catch (error) {
            logger.error("Database connect unsuccessfully",error , error.message);
            throw new ApplicationException(error.message);
        }
    }
}