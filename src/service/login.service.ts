import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { UserDto } from '../model/UserDto';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': "application/json"})
}

@Injectable()
export class loginService {

    constructor(private http: HttpClient) { }

    login(userDto : UserDto): Observable<boolean> {
        return this.http.post<boolean>('http://localhost:9090/api/user/login', userDto);
    }
}