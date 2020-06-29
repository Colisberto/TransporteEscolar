
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AlunoComponent} from './aluno.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {AlunoRoutingModule} from './aluno.routing.module';
import {AlunoDetalheComponent} from './aluno-detalhe/aluno-detalhe.component';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {AlunoService} from './aluno.service';
import {MatSortModule} from '@angular/material/sort';
import {SimpleMaskDirective, SimpleMaskModule, SimpleMaskPipe} from 'ngx-ion-simple-mask';
import {MatCardModule} from '@angular/material/card';



@NgModule({
  declarations: [AlunoComponent, AlunoDetalheComponent],
  exports: [
    AlunoComponent
  ],
    imports: [
        CommonModule,
        BrowserAnimationsModule,
        MatInputModule,
        FormsModule,
        MatButtonModule,
        MatDatepickerModule,
        MatNativeDateModule,
        AlunoRoutingModule,
        MatIconModule,
        MatTableModule,
        MatSortModule,
        SimpleMaskModule,
        ReactiveFormsModule,
        MatCardModule
    ],
  providers: [
    AlunoService
  ],
})
export class AlunoModule { }
