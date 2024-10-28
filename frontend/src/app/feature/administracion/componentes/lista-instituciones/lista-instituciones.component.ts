import { Component, OnInit } from '@angular/core';
import { AdministracionCongresoServicio } from '../../servicios/administracion.servicio';
import { Institucion } from '../../../../shared/interfaces/institucion.interface';
import { lastValueFrom } from 'rxjs';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-instituciones',
  standalone: true,
  imports: [NgbPaginationModule, CommonModule],
  templateUrl: './lista-instituciones.component.html',
  styleUrl: './lista-instituciones.component.scss'
})
export class ListaInstitucionesComponent implements OnInit {

  instituciones: Institucion[] = [];
  institucionesPaginadas: Institucion[] = [];
  pagina: number = 1;
  tamanoPagina: number = 10;
  totalItems: number = 0;

  constructor(private administracionServicio: AdministracionCongresoServicio,
    private router: Router
  ) {
  }
  ngOnInit(): void {

    this.obtenerInstituciones();
  }

  async obtenerInstituciones() {
    const respuestaInstituciones = await lastValueFrom(this.administracionServicio.obtenerInstituciones());
    this.instituciones = respuestaInstituciones.data;
    this.totalItems = this.instituciones.length;
    this.actualizarPaginacionInstituciones();
  }

  actualizarPaginacionInstituciones() {
    const inicio = (this.pagina - 1) * this.tamanoPagina;
    const fin = inicio + this.tamanoPagina;
    this.institucionesPaginadas = this.instituciones.slice(inicio, fin);
  }

  onCambioPagina(numeroPagina: number) {
    this.pagina = numeroPagina;
    this.actualizarPaginacionInstituciones();
  }
  navegarRuta(ruta: string) {
    this.router.navigate([ruta]);
  }

  exportarRegistros() {
    this.administracionServicio.exportarUniversidades().subscribe((resultado: any) => {
      this.descargarArchivo(resultado, 'instituciones.csv');
    })
  }

  descargarArchivo(contenido: string, nombreArchivo: string) {
    const blob = new Blob([contenido], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', nombreArchivo);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

}
