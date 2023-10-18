import RepositoryTemplate from "./template/RepositoryTemplate";
import UserAdmSchema from "../schemas/UserAdmSchema";

export default class UserAdmRepository extends RepositoryTemplate{

    constructor() {
        super( UserAdmSchema )
    }

    public async findByEmail(email: string): Promise< any > {
        return await this.mongoModel.findOne({email:email, deletedAt: undefined });
    }

    public async findAll(): Promise< any > {
        return await this.mongoModel.findOne();
    }



}