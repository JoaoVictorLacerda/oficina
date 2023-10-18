import { Request, Response } from "express";
import {Body, Controller, FormDataTypes,FormData, Get, Post, StatusResponse, ParamPath, Delete} from "express-swagger-autoconfigure";
import SkillUseCase from "../../application/useCase/SkillUseCase";
import SkillDTO from "../dto/SkillDTO";
import AuthorizationTokenMiddleware from "../middleware/AuthorizationTokenMiddleware";
import multer from "multer";
import Skill from "../../domain/Skill";
import cors from "cors";

const photo = multer()
const skillUseCase = new SkillUseCase();
const authorization = new AuthorizationTokenMiddleware()

@Controller("/skills")
export default class SkillController {

    @StatusResponse(200, "Registros encontrados")
    @StatusResponse(404, "Nada encontrado")
    @StatusResponse(500, "Error de execução")

    @Get("/", cors())
    public async read(request: Request, response: Response): Promise<Response> {

        try {
            const result = await skillUseCase.getAll()
            return response.status(200).json( SkillDTO.converter(result) );

        } catch (error: any) {
            return response.status(error.status).json(error.message);
        }
    }

    @StatusResponse(201, "Registro criado")
    @StatusResponse(401, "Não autorizado")
    @StatusResponse(500, "Error de execução")
    @FormData({
        img: FormDataTypes.FILE,
        name: FormDataTypes.STRING
    })
    @Post("/", cors(),authorization.permitUserRule(), photo.single("img"))
    public async create(request: Request, response: Response): Promise<Response> {
        try {
            const { buffer } = request.file; // não mudar nome das constantes
            const skill:Skill = request.body;
            
            const result = await skillUseCase.create(skill, buffer);
            return response.status(201).json( new SkillDTO(result) );
        } catch (error) {
            return response.status(error.status).json(error.message);

        }
    }

    
    @StatusResponse(201, "Registro criado")
    @StatusResponse(401, "Não autorizado")
    @StatusResponse(500, "Error de execução")
    @ParamPath({uuid:"Nome da skill"})

    @Delete("/{uuid}", cors(),authorization.permitUserRule())
    public async delete(request: Request, response: Response): Promise<Response> {
        try {
            const { uuid } = request.params;
            
            const result = await skillUseCase.delete(uuid);
            return response.status(200).json( result);
        } catch (error) {
            return response.status(error.status).json(error.message);

        }
    }


}