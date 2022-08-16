import { Component } from "@angular/core";
import {HttpClient} from '@angular/common/http';
import { currencyObj } from "./type";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})

export class HeaderComponent {
  currency: any;
  nameOfCurrency: {name: string, image: string}[] = [
    {name: 'UAH', image: 'ua.svg'},
    {name: 'EUR', image: './assets/images/R.png'},
    {name: 'USD', image: 'us.svg'},
    {name: 'GBP', image: 'gb.svg'},
    {name: 'CAD', image: 'ca.svg'},
    {name: 'JPY', image: 'jp.svg'},
  ];

  amount1: string = '0';
  amount2: string = '0';
  listOfOpenedDropdown: string[] = [];
  activeItem1: currencyObj | undefined = this.nameOfCurrency[0];
  activeItem2: currencyObj | undefined = this.nameOfCurrency[0];
  currentActiveField: number = 1;

  constructor (private http: HttpClient) {
  }

  ngAfterContentInit() {
    this.http.get('https://cdn.cur.su/api/latest.json')
    .subscribe((response) => {
        this.currency = response;
    })
  };

  dropDownOpen(listName: string) {
    this.listOfOpenedDropdown.includes(listName) ?
    this.listOfOpenedDropdown = this.listOfOpenedDropdown.filter((name) => name !== listName) :
    this.listOfOpenedDropdown = [...this.listOfOpenedDropdown, listName];
  };

  setActiveItem1(item: string) {
    this.activeItem1 = this.nameOfCurrency.find((el: currencyObj) => el ? el.name === item : el);
    this.currentActiveField === 1 ?
    this.getSecondInput(this.amount1):
    this.getFirstInput(this.amount2);
    this.dropDownOpen('firstList');
  };

  setActiveItem2(item: string) {
    this.activeItem2 = this.nameOfCurrency.find((el: currencyObj) => el ? el.name === item : el);
    this.currentActiveField === 2 ?
    this.getFirstInput(this.amount2) :
    this.getSecondInput(this.amount1);
    this.dropDownOpen('secondList');
  };

  setActiveField(num: number) {
    this.currentActiveField = num;
  }
  

  getFirstInput(event: string | Event) {
    let result: number = 0;
    if (this.activeItem1 &&  this.activeItem2) {
      result = +event * +this.currency.rates[this.activeItem1.name] / +this.currency.rates[this.activeItem2.name];
    }
   Number.isInteger(result) ? 
   this.amount1 = result.toString() :
   this.amount1 = result.toFixed(4).toString();
  };

  getSecondInput(event: string | Event) {
    let result: number = 0;
    if (this.activeItem1 && this.activeItem2) {
      result = +event * +this.currency.rates[this.activeItem2.name] / +this.currency.rates[this.activeItem1.name];
   Number.isInteger(result) ? 
   this.amount2 = result.toString() :
   this.amount2 = result.toFixed(4).toString();
    }
  };
  }