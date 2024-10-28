import { Component, OnInit } from '@angular/core';
import { ResultadoEmprendimientoPitch } from '../../../../shared/interfaces/resultado-emprendimiento-pitch.interface';
import { AdministracionCongresoServicio } from '../../servicios/administracion.servicio';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-resultados-evaluacion-pitch',
  templateUrl: './resultados-evaluacion-pitch.component.html',
  styleUrl: './resultados-evaluacion-pitch.component.scss'
})
export class ResultadosEvaluacionPitchComponent implements OnInit {
  emprendimientosPitch: ResultadoEmprendimientoPitch[] = [];
  emprendimientosPaginados: ResultadoEmprendimientoPitch[] = [];
  pagina: number = 1;
  tamanoPagina: number = 10;
  totalItems: number = 0;
  constructor(
    private administracionServicio: AdministracionCongresoServicio,
    private router: Router) {
  }
  ngOnInit(): void {
    this.obtenerEmprendimientos();
  }

  async obtenerEmprendimientos() {
    const respuestaEmprendimientos = await lastValueFrom(this.administracionServicio.obtenerResultadosEvaluacionPitch());
    this.emprendimientosPitch = respuestaEmprendimientos.data;
    this.totalItems = this.emprendimientosPitch.length;
    this.actualizarPaginacion();
  }

  actualizarPaginacion() {
    const inicio = (this.pagina - 1) * this.tamanoPagina;
    const fin = inicio + this.tamanoPagina;
    this.emprendimientosPaginados = this.emprendimientosPitch.slice(inicio, fin);
  }

  onCambioPagina(numeroPagina: number) {
    this.pagina = numeroPagina;
    this.actualizarPaginacion();
  }
  navegarRuta(ruta: string) {
    this.router.navigate([ruta]);
  }
}
