import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { BitcoinDataDto } from '../model/BitcoinDataDto';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': "application/json"})
}

@Injectable()
export class BitcoinService {

    constructor(private http: HttpClient) { }

    getLastDay(): Observable<BitcoinDataDto> {
        return this.http.get<BitcoinDataDto>('http://localhost:9090/api/bitcoin/getlastday');
    }

    getCount(): Observable<number>{
        return this.http.get<number>('http://localhost:9090/api/bitcoin/count');
    }

    startScraping() : Observable<boolean> {
        return this.http.get<boolean>('http://localhost:9090/api/bitcoin/scrape/startscraping');
    }

    stopScraping() : Observable<boolean> {
        return this.http.get<boolean>('http://localhost:9090/api/bitcoin/scrape/stopscraping');
    }

    isScraping(): Observable<boolean>{
        return this.http.get<boolean>('http://localhost:9090/api/bitcoin/scrape/isscraping');
    }

    getFirstEntry(): Observable<string> {
        return this.http.get('http://localhost:9090/api/bitcoin/firstentry', {responseType: 'text'});
    }

    getLastEntry(): Observable<string> {
        return this.http.get('http://localhost:9090/api/bitcoin/lastentry', {responseType: 'text'});
    }
}