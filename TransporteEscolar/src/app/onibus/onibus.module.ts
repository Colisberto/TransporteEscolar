import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {OnibusDetalheComponent} from './onibusdetalhe/onibusdetalhe.component';
import {OnibusComponent} from './onibus.component';
import {OnibusRoutingModule} from './onibus.routing.module';
import {OnibusService} from './onibus.service';



@NgModule({
  declarations: [OnibusComponent, OnibusDetalheComponent],
  exports: [
    OnibusComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatTableModule,
    OnibusRoutingModule
  ],
  providers: [
    OnibusService
  ],
})
export class OnibusModule { }
