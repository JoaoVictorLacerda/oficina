import Skill from "../../domain/Skill";
import UserAdm from "../../domain/UserAdm";
export default class UserAdmDTO {
    description:string;
    linkedinLink:string;
    facebookLink:string;
    instagramLink:string;
    imageLink:string
    constructor(skill: UserAdm) {
        this.description = skill.description;
        this.linkedinLink = skill.linkedinLink;
        this.facebookLink = skill.facebookLink;
        this.instagramLink = skill.instagramLink;
        this.imageLink = skill.imageLink;
    }

    public static converter(AccountList: UserAdm[]): UserAdmDTO[] {
        if (AccountList.length != 0) {
            return AccountList.map((item) => new UserAdmDTO(item));
        }
        return undefined;
    }
}