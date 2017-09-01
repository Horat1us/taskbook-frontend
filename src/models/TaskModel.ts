import {Model, ModelGroups} from "react-context-form";
import {IsBoolean, IsNotEmpty, IsString, Length, MaxLength, MinLength} from "class-validator";

export const TaskPersonalNameMinLength = 3;
export const TaskPersonalNameMaxLength = 10;

export const TaskTextMinLength = 10;

export class TaskModel extends Model {
    @IsString()
    @IsNotEmpty()
    @Length(TaskPersonalNameMinLength, TaskPersonalNameMaxLength, {
        groups: ["name"],
    })
    public name: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(TaskTextMinLength)
    public text: string;

    @IsBoolean()
    public completed: boolean = false;

    public post = async (): Promise<void> => {
        this.errors.push({
            attribute: "name",
            details: "Invalid value.",
        })
    };

    public attributes(): string[] {
        return ["name", "text", "completed"];
    }

    public groups(): ModelGroups {
        return {
            name: ["name"],
        };
    }
}

export function instantiateTaskModel(): TaskModel {
    return new TaskModel();
}
