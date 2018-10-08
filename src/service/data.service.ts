import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { BitcoinDataDto } from '../model/BitcoinDataDto';
import { DateDto } from '../model/DateDto'

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': "application/json"})
}

@Injectable()
export class DataService {

    constructor(private http: HttpClient) { }
    
    getData(startDate: string, endDate: string): Observable<BitcoinDataDto[]>{
        let dto = new DateDto();
        dto.startDate = startDate;
        dto.endDate = endDate;
        return this.http.post<BitcoinDataDto[]>('http://localhost:9090/api/bitcoin/getdata', dto);
    }
}