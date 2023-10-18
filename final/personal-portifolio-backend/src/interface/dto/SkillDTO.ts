import Skill from "../../domain/Skill";
export default class SkillDTO {
    uuid: string;
    name: string;
    imageLink: string;
    constructor(skill: Skill) {
        this.uuid = skill._id;
        this.name = skill.name;
        this.imageLink = skill.imageLink;
    }

    public static converter(AccountList: Skill[]): SkillDTO[] {
        if (AccountList.length != 0) {
            return AccountList.map((item) => new SkillDTO(item));
        }
        return undefined;
    }
}