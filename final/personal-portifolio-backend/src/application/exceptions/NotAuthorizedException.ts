import Exception from "./Exception";

export default class NotAuthorizedException extends Exception {
    constructor(message:string){
        super(401, message)
    }
}