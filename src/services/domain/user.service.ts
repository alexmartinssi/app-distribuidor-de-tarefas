import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { UserDTO } from "../../models/user.dto";
import { API_CONFIG } from "../../config/api.config";

@Injectable()
export class UserService {

    constructor(public http: HttpClient){

    }

    findByEmail(email: string) : Observable<UserDTO> {
        return this.http.get<UserDTO>(`${API_CONFIG.baseUrl}/api/users/email?value=${email}`)
    }

}