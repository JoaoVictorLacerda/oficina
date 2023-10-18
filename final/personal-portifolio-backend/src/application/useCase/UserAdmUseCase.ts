import UserAdm from "../../domain/UserAdm";
import CloudinaryComponent from "../../infrastructure/components/CloudinaryComponent";
import CryptographyComponent from "../../infrastructure/components/CryptographyComponent";
import JWtComponent from "../../infrastructure/components/JWTComponent";
import UserAdmRepository from "../../infrastructure/repository/UserAdmRepository";
import ApplicationException from "../exceptions/ApplicationException";
import ConflictException from "../exceptions/ConflictException";
import NotAuthorizedException from "../exceptions/NotAuthorizedException";

export default class UserAdmUseCase{
    private repository: UserAdmRepository;
    private cloudinaryComponent:CloudinaryComponent;
    constructor(){
        this.repository = new UserAdmRepository();
        this.cloudinaryComponent = new CloudinaryComponent();
    }

    public async createUserAdm(userAdm:UserAdm):Promise<UserAdm>{
        try{
            const resultList = await this.repository.read();
            if(resultList && resultList.length > 0) throw new ConflictException("The user adm already exists")
            const encriptedPassword = CryptographyComponent.encrypt(userAdm.password);
            userAdm.password = encriptedPassword;
            await this.repository.create(userAdm);

            return userAdm

        }catch(error){
            if(error instanceof ConflictException) throw error;
            throw new ApplicationException(error.message)
        }

    }
    public async uploadPhoto(buffer:Buffer, email:string):Promise<UserAdm>{
        try{
            const userAdm = await this.repository.findByEmail(email);

            const imageLink = await this.cloudinaryComponent.uploadImage(buffer, "user/"+userAdm.email)
            userAdm.imageLink = imageLink;

            await this.repository.update(userAdm);
            return userAdm

        }catch(error){
            if(error instanceof ConflictException) throw error;
            throw new ApplicationException(error.message)
        }

    }

    public async login(email:string, password:string):Promise<string>{
        try{
            const result = await this.repository.findByEmail(email);
            if(!result) throw new NotAuthorizedException("Login wrong")

            const decriptedPassword = CryptographyComponent.decrypt(result.password);
            if(decriptedPassword == password) return JWtComponent.generateToken(result)

            throw new NotAuthorizedException("Login wrong")
        }catch(error){
            if(error instanceof NotAuthorizedException) throw error;
            throw new ApplicationException(error.message)
        }

    }

    public async update(UserAdm:UserAdm, email:string):Promise<string>{
        try{
            const result:UserAdm = await this.repository.findByEmail(email);
            if(!result) throw new NotAuthorizedException("Login wrong");

            result.description = UserAdm.description ? UserAdm.description : result.description
            result.facebookLink = UserAdm.facebookLink ? UserAdm.facebookLink : result.facebookLink
            result.instagramLink = UserAdm.instagramLink ? UserAdm.instagramLink : result.instagramLink
            result.linkedinLink = UserAdm.linkedinLink ? UserAdm.linkedinLink : result.linkedinLink

            await this.repository.update(result);
            return "OK"
        }catch(error){
            if(error instanceof NotAuthorizedException) throw error;
            throw new ApplicationException(error.message)
        }

    }
    public async getUser():Promise<UserAdm>{
        try{
            const result:UserAdm = await this.repository.findAll()
            if(!result) throw new NotAuthorizedException("Not found");


            return result
        }catch(error){
            if(error instanceof NotAuthorizedException) throw error;
            throw new ApplicationException(error.message)
        }

    }
    
    

    
}