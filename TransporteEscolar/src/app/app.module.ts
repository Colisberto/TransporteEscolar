
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {AlunoModule} from './aluno/aluno.module';
import {AppRoutingModule} from './app.routing.module';
import {MotoristaModule} from './motorista/motorista.module';
import {OnibusModule} from './onibus/onibus.module';
import {TurnoModule} from './turno/turno.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatInputModule,
    FormsModule,
    AlunoModule, //Preciso importar para que as rotas sejam ativadas AlunoModule, MotoristaModule,OnibusModule,
    MotoristaModule,
    OnibusModule,
    TurnoModule,
    AppRoutingModule

  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
