import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {OnibusComponent} from './onibus.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import { OnibusDetalheComponent} from './onibusdetalhe/onibusdetalhe.component';
import {MatNativeDateModule} from '@angular/material/core';
import {OnibusRoutingModule} from './onibus.routing.module';
import {OnibusService} from './onibus.service';
import {MatSortModule} from '@angular/material/sort';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatDatepickerModule} from '@angular/material/datepicker';

@NgModule({
  declarations: [OnibusComponent, OnibusDetalheComponent],
  exports: [
    OnibusComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatTableModule,
    OnibusRoutingModule,
    MatSortModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatCheckboxModule
  ],
  providers: [
    OnibusService
  ],
})
export class OnibusModule { }
