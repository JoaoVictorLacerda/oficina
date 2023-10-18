import ProjectSchema from "../schemas/ProjectsSchema";
import RepositoryTemplate from "./template/RepositoryTemplate";

export default class ProjectRepository extends RepositoryTemplate{

    constructor() {
        super( ProjectSchema )
    }

}