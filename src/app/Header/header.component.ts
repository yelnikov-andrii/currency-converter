import { AfterContentInit, Component } from '@angular/core';
import { currencyObj } from './type';
import { ApiService } from '../service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements AfterContentInit {
    currency: any;
    nameOfCurrency: currencyObj[] = [
        { name: 'UAH', image: './assets/images/ua.png' },
        { name: 'EUR', image: './assets/images/eu.png' },
        { name: 'USD', image: './assets/images/us.png' },
        { name: 'GBP', image: './assets/images/gb.png' },
        { name: 'CAD', image: './assets/images/ca.png' },
        { name: 'JPY', image: './assets/images/jp.png' },
    ];

    amount1 = '';
    amount2 = '';
    listOfOpenedDropdown: string[] = [];
    activeItem1: currencyObj | undefined = this.nameOfCurrency[0];
    activeItem2: currencyObj | undefined = this.nameOfCurrency[0];
    activeField = '1';
    errorMessage = '';

    constructor(private api: ApiService) {}

    ngAfterContentInit() {
        this.api.getData().subscribe((response: any) => {
            this.currency = response;
        });
    }

    dropDownOpen(list: string) {
        this.listOfOpenedDropdown.includes(list)
            ? (this.listOfOpenedDropdown = this.listOfOpenedDropdown.filter(
                (name) => name !== list
            ))
            : (this.listOfOpenedDropdown = [
                ...this.listOfOpenedDropdown,
                list,
            ]);
    }

    setActiveField(value: string) {
        this.activeField = value;
    }

    setActiveItem(value: string, item: currencyObj | undefined, num: string) {
        this.activeItem1 === item
            ? (this.activeItem1 = this.nameOfCurrency.find((el: currencyObj) =>
                el ? el?.name === value : el
            ))
            : (this.activeItem2 = this.nameOfCurrency.find((el: currencyObj) =>
                el ? el?.name === value : el
            ));
        this.activeField === '1'
            ? this.getInput(this.amount1, '2')
            : this.getInput(this.amount2, '1');
        this.dropDownOpen(num);
    }

    getInput(event: string | Event, num: string) {
        isNaN(+event)
            ? (this.errorMessage = 'No letters!!!!')
            : (this.errorMessage = '');

        let result = 0;
        if (this.activeItem1 && this.activeItem2) {
            num === '1'
                ? (result =
                      (+event * +this.currency.rates[this.activeItem1.name]) /
                      +this.currency.rates[this.activeItem2.name])
                : (result =
                      (+event * +this.currency.rates[this.activeItem2.name]) /
                      +this.currency.rates[this.activeItem1.name]);
        }

        num === '1'
            ? (this.amount1 = result.toString())
            : (this.amount2 = result.toString());
    }
}
