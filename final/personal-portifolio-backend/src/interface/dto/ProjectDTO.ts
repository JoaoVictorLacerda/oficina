import Project from "../../domain/Projects";


export default class ProjectDTO {
    uuid: string;
    title: string;
    caption: string;
    projectLink: string;
    imgLink: string;
    constructor(project: Project) {
        this.uuid = project._id;
        this.title = project.title;
        this.caption = project.caption;
        this.projectLink = project.projectLink;
        this.imgLink = project.imgLink;
    }

    public static converter(ProjectList: Project[]): ProjectDTO[] {
        if (ProjectList.length != 0) {
            return ProjectList.map((item) => new ProjectDTO(item));
        }
        return undefined;
    }
}