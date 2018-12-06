import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { RegisterDTO } from "../../models/register.dto";
import { Observable } from "rxjs/Rx";

@Injectable()
export class RegisterService {  
    
    constructor(public http: HttpClient) {

    }

    findAll() : Observable<RegisterDTO[]> {
        return this.http.get<RegisterDTO[]>(
            `${API_CONFIG.baseUrl}/api/registers/v1/list/`
        );
    }

    create(obj: RegisterDTO){
        console.log('Entrou no Register Service Create.');
        console.log(obj);
        return this.http.post(
            `${API_CONFIG.baseUrl}/api/registers/v1/create/`,
            obj,
            {
                observe: 'response',
                responseType: 'text'
            }
        );
    }

}