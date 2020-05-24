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
import {TurnoComponent} from './turno.component';
import {TurnoRoutingModule} from './turno.routing.module';
import {AlunoService} from '../aluno/aluno.service';
import {TurnoService} from './turno.service';

@NgModule({
  declarations: [TurnoComponent],
  exports: [
    TurnoComponent
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
    TurnoRoutingModule,
    ReactiveFormsModule
  ],

  // adicionado em 24/05
  providers: [
    TurnoService
  ],
})
export class TurnoModule { }
