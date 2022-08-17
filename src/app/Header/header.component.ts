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
    {name: 'UAH', image: './assets/images/ua.png'},
    {name: 'EUR', image: './assets/images/eu.png'},
    {name: 'USD', image: './assets/images/us.png'},
    {name: 'GBP', image: './assets/images/gb.png'},
    {name: 'CAD', image: './assets/images/ca.png'},
    {name: 'JPY', image: './assets/images/jp.png'},
  ];

  amount1: string = '0';
  amount2: string = '0';
  listOfOpenedDropdown: string[] = [];
  activeItem1: currencyObj | undefined = this.nameOfCurrency[0];
  activeItem2: currencyObj | undefined = this.nameOfCurrency[0];
  activeField: string = '1';
  one: string = '1';
  two: string = '2';
  alphabet = 'abcdefghijklmnopqrstuvwxyz';

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

  setActiveField(value: string) {
    this.activeField = value;
  }

  setActiveItem1(item: string) {
    this.activeItem1 = this.nameOfCurrency.find((el: currencyObj) => el ? el.name === item : el);
    this.activeField === '1' ?
    this.getSecondInput(this.amount1) :
    this.getFirstInput(this.amount2);
    this.dropDownOpen('firstList');
  };

  setActiveItem2(item: string) {
    this.activeItem2 = this.nameOfCurrency.find((el: currencyObj) => el ? el.name === item : el);
    this.activeField === '2' ?
    this.getFirstInput(this.amount2) :
    this.getSecondInput(this.amount1);
    this.dropDownOpen('secondList');
  };

  validateInput(event: Event) {

    console.log(event);
  }
  
  getFirstInput(event: string | Event) {
    if (this.alphabet.includes(event.toString().toLowerCase()) && event !== '') {
      this.amount2 = 'No letters!!!!';
    }

    let result: number = 0;
    if (this.activeItem1 &&  this.activeItem2) {
      result = +event * +this.currency.rates[this.activeItem1.name] / +this.currency.rates[this.activeItem2.name];
    }
   Number.isInteger(result) ? 
   this.amount1 = result.toString() :
   this.amount1 = result.toFixed(4).toString();
  };

  getSecondInput(event: string | Event) {
    if (this.alphabet.includes(event.toString().toLowerCase()) && event !== '') {
      this.amount1 = 'No letters!!!!';
    }
    let result: number = 0;
    if (this.activeItem1 && this.activeItem2) {
      result = +event * +this.currency.rates[this.activeItem2.name] / +this.currency.rates[this.activeItem1.name];
   Number.isInteger(result) ? 
   this.amount2 = result.toString() :
   this.amount2 = result.toFixed(4).toString();
    }
  };
  
  }