import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ApiService {
    constructor(private http: HttpClient) {}

    url = 'https://cdn.cur.su/api/latest.json';

    getData() {
        return this.http.get<any>(this.url);
    }
}
