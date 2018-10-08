import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from "rxjs";
import { PredictionDto } from '../model/PredictionDto';
import { UserDto } from '../model/UserDto';

const httpOptions = {
    headers: new HttpHeaders({' Content-Type': ' application/json'})
}

@Injectable()
export class PredictionService {

    constructor(private http: HttpClient) { 
        
    }
    getPredictions() : Observable<PredictionDto[]>{
        let dto = new UserDto();
        dto.userName = sessionStorage.getItem('user');
        console.log(dto);
        return this.http.post<PredictionDto[]>('http://localhost:9090/api/bitcoin/prediction', dto);
    }

    createPrediction(start: number, end: number): Observable<UserDto> {
        let userDto = new UserDto();
        let predictionDto = new PredictionDto();
        predictionDto.start = start;
        predictionDto.end = end;
        userDto.userName = sessionStorage.getItem('user');
        userDto.predictions = new Array();
        userDto.predictions.push(predictionDto);
        return this.http.post<UserDto>('http://localhost:9090/api/bitcoin/createprediction/', userDto);
    }
}