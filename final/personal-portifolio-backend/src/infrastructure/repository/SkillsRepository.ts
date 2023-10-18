import RepositoryTemplate from "./template/RepositoryTemplate";
import SkillSchema from "../schemas/SkillsSchema";

export default class SkillsRepository extends RepositoryTemplate{

    constructor() {
        super( SkillSchema )
    }

    public async findByName(name: string): Promise< any > {
        return await this.mongoModel.findOne({name:name});
    }

}