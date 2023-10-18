import Exception from "./Exception";

export default class ConflictException extends Exception {
    constructor(message:string){
        super(409, message)
    }
}