import Skill from "../../domain/Skill";
import CloudinaryComponent from "../../infrastructure/components/CloudinaryComponent";
import SkillsRepository from "../../infrastructure/repository/SkillsRepository";
import ApplicationException from "../exceptions/ApplicationException";
import NotFoundException from "../exceptions/NotFoundException";

export default class SkillUseCase{
    private repository: SkillsRepository;
    private cloudinaryComponent:CloudinaryComponent;
    constructor(){
        this.repository = new SkillsRepository();
        this.cloudinaryComponent = new CloudinaryComponent();
    }

    public async create(skill:Skill,buffer:Buffer):Promise<Skill>{
        try{
            const imageLink = await this.cloudinaryComponent.uploadImage(buffer, "skill/"+skill.name)
            skill.imageLink = imageLink;
            await this.repository.create(skill);
            return skill;
        }catch(error){
            throw new ApplicationException(error.message)
        }
    }

    public async getAll():Promise<Skill[]> {
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

    public async delete(skillUuid:string):Promise<string>{
        try{
            const skillResult = await this.repository.findByUuid(skillUuid)
            if(!skillResult) throw new NotFoundException("Skill not found");

            const isDeleted = await this.cloudinaryComponent.deleteImage("skill/"+skillResult.name)
            if(isDeleted){
                await this.repository.delete(skillResult._id);
                return "OK";
            }
            return "NOT OK"
        }catch(error){
            throw new ApplicationException(error.message)
        }
    }

    

    
}