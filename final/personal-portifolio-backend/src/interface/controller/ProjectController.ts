import { Request, Response } from "express";
import {Body, Controller, FormDataTypes,FormData, Get, Post, StatusResponse, ParamPath, Delete} from "express-swagger-autoconfigure";
import AuthorizationTokenMiddleware from "../middleware/AuthorizationTokenMiddleware";
import multer from "multer";
import ProjectUseCase from "../../application/useCase/ProjectUseCase";
import Project from "../../domain/Projects";
import ProjectDTO from "../dto/ProjectDTO";
import cors from "cors";

const photo = multer()
const projectUseCase = new ProjectUseCase();
const authorization = new AuthorizationTokenMiddleware()

@Controller("/projects")
export default class ProjectController {

    @StatusResponse(200, "Registros encontrados")
    @StatusResponse(404, "Nada encontrado")
    @StatusResponse(500, "Error de execução")

    @Get("/", cors())
    public async read(request: Request, response: Response): Promise<Response> {

        try {
            const result = await projectUseCase.getAll()
            return response.status(200).json( ProjectDTO.converter(result) );

        } catch (error: any) {
            return response.status(error.status).json(error.message);
        }
    }

    @StatusResponse(201, "Registro criado")
    @StatusResponse(401, "Não autorizado")
    @StatusResponse(500, "Error de execução")
    @FormData({
        img: FormDataTypes.FILE,
        title: FormDataTypes.STRING,
        caption: FormDataTypes.STRING,
        projectLink: FormDataTypes.STRING
    })

    @Post("/",cors(),authorization.permitUserRule(), photo.single("img"))
    public async create(request: Request, response: Response): Promise<Response> {
        try {
            const { buffer } = request.file; // não mudar nome das constantes
            const project:Project = request.body;
            
            const result = await projectUseCase.create(project, buffer);
            return response.status(201).json( new ProjectDTO(result) );
        } catch (error) {
            return response.status(error.status).json(error.message);

        }
    }

    
    @StatusResponse(201, "Registro criado")
    @StatusResponse(401, "Não autorizado")
    @StatusResponse(500, "Error de execução")
    @ParamPath({uuid:"Nome do projeto"})

    @Delete("/{uuid}", cors(),authorization.permitUserRule())
    public async delete(request: Request, response: Response): Promise<Response> {
        try {
            const { uuid } = request.params;
            
            const result = await projectUseCase.delete(uuid);
            return response.status(200).json( result);
        } catch (error) {
            return response.status(error.status).json(error.message);

        }
    }


}