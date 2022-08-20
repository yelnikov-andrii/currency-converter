import { Component } from '@angular/core';
import { currencyObj } from './type';
import { DataService } from '../service/dataservice.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
    errorMessage = '';
    activeItemMain: currencyObj;
    activeItemSecond: currencyObj;
    resultMainInput: string = '0';
    resultSecondInput: string = '0';
    dataObjects: currencyObj[];
    anotherFieldMain: currencyObj;
    anotherFieldSecond: currencyObj;
    currency: any;
    valueMain = '0';
    valueSecond = '0';
    fieldActiveMain = false;
    fieldActiveSecond = false;

    constructor( private DataService: DataService) {
        this.dataObjects = DataService.getNamesOfCurrency();
        this.DataService.getData().subscribe((response: any) => {
            this.currency = response;
        })

        this.activeItemMain = this.dataObjects[0];
        this.activeItemSecond = this.dataObjects[0];
        this.anotherFieldMain = this.dataObjects[0];
        this.anotherFieldSecond = this.dataObjects[0];
    }

    setResultAccordingActiveField(field: boolean) {
        field ?
            this.setResultSecondInput(this.valueMain) :
            this.setResultMainInput(this.valueSecond);
    }


    setError(value: string) {
        this.errorMessage = value;
    }

    setActiveSecondField(value: boolean) {
        this.fieldActiveSecond = value;
        this.fieldActiveMain = !value;
    }

    setActiveMainField(value: boolean) {
        this.fieldActiveSecond = !value;
        this.fieldActiveMain = value;
    }

    setActiveItemMain(obj: any) {
        this.activeItemMain = obj;
        this.anotherFieldSecond = obj;

        this.setResultAccordingActiveField(this.fieldActiveMain);
    }

    setActiveItemSecond(obj: any) {
        this.activeItemSecond = obj;
        this.anotherFieldMain = obj;

        this.setResultAccordingActiveField(this.fieldActiveMain);
    }

    setResultFunction(activeItem: currencyObj, anotherItem: currencyObj, currency: any) {
        let result = +currency.rates[activeItem.name] / +currency.rates[anotherItem.name];
        return result;
    }

    setResultMainInput(value: string) {
        let result = +value * this.setResultFunction(this.activeItemMain, this.anotherFieldMain, this.currency);
        this.resultMainInput = result.toString();
        this.valueSecond = value;
    }

    setResultSecondInput(value: string) {
        let result = +value * this.setResultFunction(this.activeItemSecond, this.anotherFieldSecond, this.currency);
        this.resultSecondInput = result.toString();
        this.valueMain = value;
    }
}
