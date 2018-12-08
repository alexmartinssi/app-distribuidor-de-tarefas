import { UserDTO } from "./user.dto";
import { TaskDTO } from "./task.dto";

export interface RegisterDTO {
    id : string;
    name : string;
    initialDate : Date;
    finalDate : Date;
    reward : string;
    users : UserDTO[];
    tasks :  TaskDTO[];
}