import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatTabsModule} from '@angular/material/tabs';
import {ContatosComponent} from './contatos.component';
import {ContatosRoutingModule} from './contatos.routing.module';

@NgModule({
  declarations: [ContatosComponent],
  exports: [
    ContatosComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatTabsModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    ContatosRoutingModule
  ],

  /*
  providers: [
    ContatosService
  ],*/
})
export class ContatosModule { }
