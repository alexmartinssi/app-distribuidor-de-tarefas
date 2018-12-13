import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { TaskDTO } from "../../models/task.dto";
import { Observable } from "rxjs/Rx";

@Injectable()
export class TaskService {  
    
    constructor(public http: HttpClient) {

    }

    findAll(page : number = 0, linesPerPage : number = 5) : Observable<TaskDTO[]> {
        return this.http.get<TaskDTO[]>(
            `${API_CONFIG.baseUrl}/api/tasks/v1/list/?page=${page}&linesPerPage=${linesPerPage}`
        );
    }

    changeStatus(obj: TaskDTO){
        return this.http.put(
            `${API_CONFIG.baseUrl}/api/tasks/v1/change-status/`,
            obj,
            {
                observe: 'response',
                responseType: 'text'
            }
        );
    }

}