import { Component } from '@angular/core';
import { ResultadoEvaluacionEmprendimiento } from '../../../../shared/interfaces/evaluacion-emprendimiento-resultado.interface';
import { AdministracionCongresoServicio } from '../../servicios/administracion.servicio';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { AlertasServicio } from '../../../../core/servicios/alertas.servicio';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-lista-emprendimientos-pitch',
  templateUrl: './lista-emprendimientos-pitch.component.html',
  styleUrl: './lista-emprendimientos-pitch.component.scss'
})
export class ListaEmprendimientosPitchComponent {

  emprendimientos: ResultadoEvaluacionEmprendimiento[] = [];
  emprendimientosPaginados: ResultadoEvaluacionEmprendimiento[] = [];
  pagina: number = 1;
  tamanoPagina: number = 10;
  totalItems: number = 0;

  constructor(
    private administracionCongresoServicio: AdministracionCongresoServicio,
    private router: Router,
    private fb: FormBuilder,
    private alertaServicio: AlertasServicio
  ) { }

  ngOnInit(): void {
    this.cargarEmprendimientosPitch();
  }


  async cargarEmprendimientosPitch() {
    const respuestaEmprendimientosEnPitch = await lastValueFrom(this.administracionCongresoServicio.obtenerEmprendimientosPitch());
    this.emprendimientos = respuestaEmprendimientosEnPitch.data;
    this.totalItems = this.emprendimientos.length;
    this.actualizarPaginacion();
  }

  onCambioPagina(numeroPagina: number) {
    this.pagina = numeroPagina;
    this.actualizarPaginacion();
  }
  navegarRuta(ruta: string) {
    this.router.navigate([ruta]);
  }
  actualizarPaginacion() {
    const inicio = (this.pagina - 1) * this.tamanoPagina;
    const fin = inicio + this.tamanoPagina;
    this.emprendimientosPaginados = this.emprendimientos.slice(inicio, fin);
  }
}
