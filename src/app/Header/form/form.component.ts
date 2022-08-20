import { 
    Component,
    EventEmitter,
    Input,
    Output, 
} from '@angular/core';
import { currencyObj } from '../type';
import { DataService } from 'src/app/service/dataservice.service';

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss']
})
export class FormComponent {
  @Output() 
      setError = new EventEmitter<string>();
  @Output() 
      setActiveField = new EventEmitter<boolean>();
  @Output()
      setActiveItemEvent = new EventEmitter<currencyObj>();
  @Output()
      setInputedValue = new EventEmitter<string>();
  @Input()
      displayingResult: any;
  
  errorMessage: string = '';
  dropdownIsOpen: boolean = false;
  dataObjects: currencyObj[];
  activeItem: currencyObj | undefined;

  constructor(private Dataservice: DataService) {
      this.dataObjects = Dataservice.getNamesOfCurrency();
      this.activeItem = this.dataObjects[0];
  }

  dropDownOpen() {
      this.dropdownIsOpen = !this.dropdownIsOpen;
  };

  setFieldActive(value: boolean) {
      this.setActiveField.emit(value)
  };

  setActiveItem(name: string) {
      this.activeItem = this.dataObjects.find((el: currencyObj) =>
          el ? el?.name === name : el);
      this.dropDownOpen();
      this.setActiveItemEvent.emit(this.activeItem);
  }

  getInput(value: string) {
      isNaN(+value) && (this.errorMessage = 'No letters!!!!');
      this.setError.emit(this.errorMessage);
      this.setInputedValue.emit(value);
  }
}
