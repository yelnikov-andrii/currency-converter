import { Injectable } from '@angular/core';
import { currencyObj } from '../Header/type';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class DataService {

    constructor(private http: HttpClient) {}

    url = 'https://cdn.cur.su/api/latest.json';

    getData() {
        return this.http.get<any>(this.url);
    }
    nameOfCurrency: currencyObj[] = [
        { name: 'UAH', image: './assets/images/ua.png' },
        { name: 'EUR', image: './assets/images/eu.png' },
        { name: 'USD', image: './assets/images/us.png' },
        { name: 'GBP', image: './assets/images/gb.png' },
        { name: 'CAD', image: './assets/images/ca.png' },
        { name: 'JPY', image: './assets/images/jp.png' },
    ];

    getNamesOfCurrency() {
        return this.nameOfCurrency;
    }
}
