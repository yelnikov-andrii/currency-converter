import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './Header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './service';

@NgModule({
    declarations: [AppComponent, HeaderComponent],
    imports: [BrowserModule, HttpClientModule, FormsModule],
    providers: [ApiService],
    bootstrap: [AppComponent],
})
export class AppModule {}
