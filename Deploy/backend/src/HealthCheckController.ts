import { Request, Response } from "express";
import {Controller, Get, StatusResponse} from "express-swagger-autoconfigure";


@Controller("/health-check")
export default class HealthCheckController {

    @StatusResponse(200)
    @StatusResponse(400)
    @Get()
    public async check(request: Request, response: Response): Promise<Response> {

        try {
            return response.status(200).json("OK");
        } catch (error: any) {
            return response.status(400).json(error.message);   
        }

    }
}