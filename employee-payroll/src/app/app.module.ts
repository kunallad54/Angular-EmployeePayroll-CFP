import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { AddComponent } from './component/add/add.component';
import { HomeComponent } from './component/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormComponent } from './component/form/form.component';
import { AngularMaterialModule } from './material/angular-material/angular-material.module';
import { PipeTansformPipe } from './pipe/pipe-tansform.pipe';
import { DialogBoxComponent } from './component/dialog-box/dialog-box.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AddComponent,
    HomeComponent,
    FormComponent,
    PipeTansformPipe,
    DialogBoxComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
