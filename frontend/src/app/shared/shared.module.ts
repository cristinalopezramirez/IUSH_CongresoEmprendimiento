import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SoloNumerosDirective } from './directivas/solo-numeros.directive';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AlertasServicio } from '../core/servicios/alertas.servicio';

@NgModule({
  declarations: [SoloNumerosDirective],
  imports: [
    CommonModule, ReactiveFormsModule, FormsModule
  ],
  exports: [
    ReactiveFormsModule,
    FormsModule,
    SoloNumerosDirective
  ],
  providers: [
    provideHttpClient(
      withInterceptorsFromDi()
    ),
    AlertasServicio
  ],
})
export class SharedModule { }