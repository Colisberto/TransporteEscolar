import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MotoristaComponent} from './motorista.component';
import {MotoristaRoutingModule} from './motorista.routing.module';
import {MotoristaService} from './motorista.service';
import {MotoristaDetalheComponent} from './motoristadetalhe/motoristadetalhe.component';
import {MatSortModule} from '@angular/material/sort';
import {SimpleMaskDirective, SimpleMaskModule, SimpleMaskPipe} from 'ngx-ion-simple-mask';



@NgModule({
  declarations: [MotoristaComponent, MotoristaDetalheComponent],
  exports: [
    MotoristaComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MotoristaRoutingModule,
    MatIconModule,
    MatTableModule,
    MatSortModule,
    SimpleMaskModule,
    ReactiveFormsModule
  ],
  providers: [
    MotoristaService
  ],
})
export class MotoristaModule { }
