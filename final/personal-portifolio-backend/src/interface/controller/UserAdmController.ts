import { Request, Response } from "express";
import {Body, Controller, FormDataTypes,FormData, Get, ParamPath, Patch, Post, Put, StatusResponse} from "express-swagger-autoconfigure";
import UserAdm from "../../domain/UserAdm";
import UserAdmUseCase from "../../application/useCase/UserAdmUseCase";
import AuthorizationTokenMiddleware from "../middleware/AuthorizationTokenMiddleware";
import UserAdmDTO from "../dto/UserAdmDTO";
import multer from "multer";
import cors from "cors";
const userAdmUseCase = new UserAdmUseCase();
const authorization = new AuthorizationTokenMiddleware()
const photo = multer()

@Controller("/user-adm")
export default class UserAdmController {

    @StatusResponse(200, "Criado com sucesso")
    @StatusResponse(400, "Se algum atributo foi passado de forma errada")
    @StatusResponse(500, "Error de execução")
    @StatusResponse(409, "User adm já existe na base de dados")
    @Body({
        email : "fullname@example.com",
        password: "123456a",
        description:"fale um pouco sobre você",
        linkedinLink:"seu linkedin",
        facebookLink:"seu facebook",
        instagramLink:"seu instagram",
    })
    @Post("/", cors())
    public async create(request: Request, response: Response): Promise<Response> {

        try {
            const userAdmReceived: UserAdm = request.body;
            await userAdmUseCase.createUserAdm(userAdmReceived);
            return response.status(201).json("OK");

        } catch (error: any) {
            return response.status(error.status).json(error.message);   
        }

    }

    @StatusResponse(200, "Criado com sucesso")
    @StatusResponse(400, "Se algum atributo foi passado de forma errada")
    @StatusResponse(500, "Error de execução")
    @StatusResponse(409, "User adm já existe na base de dados")
    
    @FormData({
        img: FormDataTypes.FILE,
        email: FormDataTypes.STRING
    })
    @Patch("/", cors(),authorization.permitUserRule(), photo.single("img"))
    public async uploadPhoto(request: Request, response: Response): Promise<Response> {
        try {
            const { buffer } = request.file; // não mudar nome das constantes
            const { email } = request.body;

            await userAdmUseCase.uploadPhoto(buffer, email);
            return response.status(201).json("OK");

        } catch (error: any) {
            return response.status(error.status).json(error.message);   
        }

    }

    @StatusResponse(200, "Login feito com sucesso")
    @StatusResponse(500, "Error de execução")
    @StatusResponse(401, "Não autorizado")
    @Body({
        email : "fullname@example.com",
        password: "123456a"
    })
    @Post("/login", cors())
    public async login(request: Request, response: Response): Promise<Response> {

        try {
            const {email, password} = request.body;
            const token = await userAdmUseCase.login(email, password);
            return response.status(200).json({token: token});
            
        } catch (error: any) {
            return response.status(error.status).json(error.message);   
        }
    }

    @StatusResponse(200, "Login feito com sucesso")
    @StatusResponse(500, "Error de execução")
    @StatusResponse(401, "Não autorizado")
    @Body({
        description:"Sua descrição",
        linkedinLink:"Seu perfil do linkedin ",
        facebookLink:"Seu perfil do facebook",
        instagramLink:"Seu perfil do instagram"
    })
    @ParamPath({email:"email"})
    @Put("/{email}", cors(), authorization.permitUserRule())
    public async update(request: Request, response: Response): Promise<Response> {

        try {
            const { email } = request.params
            const userAdm:UserAdm = request.body;
            const result = await userAdmUseCase.update(userAdm, email)
            return response.status(200).json(result);
            
        } catch (error: any) {
            return response.status(error.status).json(error.message);   
        }
    }

    @StatusResponse(200, "Login feito com sucesso")
    @StatusResponse(500, "Error de execução")
    @StatusResponse(401, "Não autorizado")
    @Get("/", cors())
    public async getUser(request: Request, response: Response): Promise<Response> {

        try {

            const result = await userAdmUseCase.getUser()
            return response.status(200).json(new UserAdmDTO(result));
            
        } catch (error: any) {
            return response.status(error.status).json(error.message);   
        }
    }
}