import Exception from "./Exception";

export default class ApplicationException extends Exception {
    constructor(message:string){
        super(500, message)
    }
}