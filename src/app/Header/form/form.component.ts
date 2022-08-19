import { AfterContentInit, AfterViewInit, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { currencyObj } from '../type';
import { DataService } from 'src/app/service/dataservice.service';

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss']
})
export class FormComponent implements AfterContentInit {
  @Output() 
      setErrorEvent = new EventEmitter<string>();
   @Output()
       setActiveItemEvent = new EventEmitter<currencyObj>();
   @Output()
       setActiveFieldToHeader = new EventEmitter<boolean>();
   @Output()
       setResult = new EventEmitter<string>();
    @Input()
        activeSecondField: currencyObj | undefined;

    ngOnChanges(changes: SimpleChanges) {
        console.log(this.activeField);
  
        if( changes['activeSecondField'] && changes['activeSecondField'].previousValue != changes['activeSecondField'].currentValue ) {
            this.activeField === true &&
              this.getInput(this.value)
            this.setResult.emit(this.result);
        }
    }
      
    @Input()
        inputResult: any;
    @Input()
        activeField: any;
  
    currency: any;
    errorMessage: string = '';
    result: string = '0';
    value: string | Event = '0';

    dropdownIsOpen: boolean = false;
    dataObjects: currencyObj[];
    activeItem: currencyObj | undefined;
    constructor( private dataService: DataService) {
        this.dataObjects = dataService.getNamesOfCurrency();
        this.activeItem = this.dataObjects[0];
    }

    ngAfterContentInit() {
        this.dataService.getData().subscribe((response: any) => {
            this.currency = response;
        });
    }

    setActiveField(bool: boolean) {
        this.setActiveFieldToHeader.emit(bool);
    }

    dropDownOpen() {
        this.dropdownIsOpen = !this.dropdownIsOpen;
    }

    setActiveItem(name: string) {
        this.activeItem = this.dataObjects.find((el: currencyObj) =>
            el ? el?.name === name : el);
        this.dropDownOpen();
        this.setActiveItemEvent.emit(this.activeItem);
        this.activeField && 
        this.getInput(this.value);

    }

    getInput(value: Event | string) {
        isNaN(+value)
            ? (this.errorMessage = 'No letters!!!!')
            : (this.errorMessage = '');
        this.setErrorEvent.emit(this.errorMessage);

        if (this.activeItem && this.activeSecondField) {
            this.value = value;
            this.result = (+value * +this.currency.rates[this.activeSecondField.name] /
        +this.currency.rates[this.activeItem.name]).toString()
        }

        this.setResult.emit(this.result);
    }
}
