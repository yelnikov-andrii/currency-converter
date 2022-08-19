import { Component, AfterContentInit  } from '@angular/core';
import { currencyObj } from '../Header/type';
import { DataService } from '../service/dataservice.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements AfterContentInit  {
    errorMessage = '';
    activeItemMain: currencyObj | undefined;
    activeItemSecond: currencyObj | undefined;
    resultMainInput: string = '0';
    resultSecondInput: string = '0';
    dataObjects: currencyObj[];
    activeFieldMain: boolean = false;
    activeFieldSecond: boolean = false;

    constructor( private ConverterdataService: DataService) {
        this.dataObjects = ConverterdataService.getNamesOfCurrency();
    }

    ngAfterContentInit() {
        this.activeItemMain = this.dataObjects[0];
        this.activeItemSecond = this.dataObjects[0];
    }


    setError(value: string) {
        this.errorMessage = value;
    }

    setActiveItemMain(obj: any) {
        this.activeItemMain = obj;
    }

    setActiveItemSecond(obj: any) {
        this.activeItemSecond = obj;
    }

    setResultMainInput(value: any) {
        this.resultMainInput = value;
    }

    setResultSecondInput(value: any) {
        this.resultSecondInput = value;
    }

    setActiveFieldMain(bool: boolean) {
        this.activeFieldMain = bool;
        this.activeFieldSecond = !bool;
    }

    setActiveFieldSecond(bool: boolean) {
        this.activeFieldSecond = bool;
        this.activeFieldMain = !bool;
    }
}
