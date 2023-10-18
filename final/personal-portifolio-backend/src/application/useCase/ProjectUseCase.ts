import Project from "../../domain/Projects";
import CloudinaryComponent from "../../infrastructure/components/CloudinaryComponent";
import ProjectRepository from "../../infrastructure/repository/ProjectRepository";
import ApplicationException from "../exceptions/ApplicationException";
import NotFoundException from "../exceptions/NotFoundException";

export default class ProjectUseCase{

    private repository: ProjectRepository;
    private cloudinaryComponent:CloudinaryComponent;
    constructor(){
        this.repository = new ProjectRepository();
        this.cloudinaryComponent = new CloudinaryComponent();
    }

    public async create(project:Project,buffer:Buffer):Promise<Project>{
        try{
            const imageLink = await this.cloudinaryComponent.uploadImage(buffer, "project/"+project.title)
            project.imgLink = imageLink;
            await this.repository.create(project);
            return project;
        }catch(error){
            throw new ApplicationException(error.message)
        }
    }

    public async getAll():Promise<Project[]> {
        try {
            const result= await this.repository.read()
            if(!result || result.length == 0) throw new NotFoundException("No register found")
            return result;
        } catch (error) {
            if(error instanceof NotFoundException){
                throw error;
            }
            throw new ApplicationException(error.message)
        }
        
    }

    public async delete(projectUuid:string):Promise<string>{
        try{
            const projectResult = await this.repository.findByUuid(projectUuid)
            if(!projectResult) throw new NotFoundException("Skill not found");

            const isDeleted = await this.cloudinaryComponent.deleteImage("project/"+projectResult.name)
            if(isDeleted){
                await this.repository.delete(projectResult._id);
                return "OK";
            }
            return "NOT OK"
        }catch(error){
            throw new ApplicationException(error.message)
        }
    }

    

    
}