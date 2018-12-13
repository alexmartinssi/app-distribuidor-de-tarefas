export interface TaskDTO {
    id : string;
    description : string;
    name : string;
    status: string;
    register_id? : string;
    user_id? : string;
}