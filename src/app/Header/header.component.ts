import { Component } from "@angular/core";
import {HttpClient} from '@angular/common/http';
import { getLocaleCurrencyName } from "@angular/common";
import { from } from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})


export class HeaderComponent {
  currency: any;
  nameOfCurrency: {name: string, image: string}[] = [
    {name: 'UAH', image: '../../assets/images/ua.svg'},
    {name: 'EUR', image: '../../assets/images/eu.svg'},
    {name: 'USD', image: '../../assets/images/us.svg'},
    {name: 'GBP', image: '../../assets/images/gb.svg'},
    {name: 'BTC', image: '../../assets/images/gb.svg'},
  ];

  amount1: string = '0';
  amount2: string = '0';
  selectedOption1: string = this.nameOfCurrency[0].name;
  selectedOption2: string = this.nameOfCurrency[0].name;

  constructor (private http: HttpClient) {
  }

  ngAfterContentInit() {
    this.http.get('https://cdn.cur.su/api/latest.json')
    .subscribe((response) => {
        this.currency = response;
    })
  }


  getSecondInput(event: string | Event) {
    const result = +event * +this.currency.rates[this.selectedOption2] / +this.currency.rates[this.selectedOption1];
   Number.isInteger(result) ? 
   this.amount2 = result.toString() :
   this.amount2 = result.toFixed(4).toString();
  }

  getFirstInput(event: string | Event) {
    const result = +event * +this.currency.rates[this.selectedOption1] / +this.currency.rates[this.selectedOption2];
   Number.isInteger(result) ? 
   this.amount1 = result.toString() :
   this.amount1 = result.toFixed(4).toString();
  }
  }