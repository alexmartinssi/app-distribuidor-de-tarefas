import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { UserDTO } from "../../models/user.dto";
import { API_CONFIG } from "../../config/api.config";

@Injectable()
export class UserService {

    constructor(public http: HttpClient){

    }

    findAll() : Observable<UserDTO[]> {
        return this.http.get<UserDTO[]>(
            `${API_CONFIG.baseUrl}/api/users/v1/list/`
        );
    }

    findByEmail(email: string) : Observable<UserDTO> {
        return this.http.get<UserDTO>(`${API_CONFIG.baseUrl}/api/users/email?value=${email}`)
    }

    create(obj: UserDTO){
        console.log('Entrou no User Service Create.');
        console.log(obj);
        return this.http.post(
            `${API_CONFIG.baseUrl}/api/users/v1/create/`,
            obj,
            {
                observe: 'response',
                responseType: 'text'
            }
        );
    }

}