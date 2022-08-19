import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './Header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { FormComponent } from './Header/form/form.component';
import { DataService } from './service/dataservice.service';

@NgModule({
    declarations: [AppComponent, HeaderComponent, FormComponent],
    imports: [BrowserModule, HttpClientModule, FormsModule],
    providers: [DataService],
    bootstrap: [AppComponent],
})
export class AppModule {}
