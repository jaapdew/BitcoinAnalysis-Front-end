import {Injectable } from '@angular/core';
import {BitcoinDailyDto} from '../model/BitcoinDailyDto';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
'rxjs/Rx';

const httpOptions = {
    headers: new HttpHeaders({' Content-Type': ' application/json'})
};

@Injectable()
export class BitcoinDailyService{

    constructor(private http: HttpClient){}

    getLastDay(){
        return this.http.get<BitcoinDailyDto>('http://localhost:9090/api/bitcoindaily/getlastday');
    }
}

