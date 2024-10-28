import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Emprendimiento } from '../../../../shared/interfaces/emprendimiento.interface';
import { lastValueFrom } from 'rxjs';
import { AdministracionCongresoServicio } from '../../servicios/administracion.servicio';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalEvaluacionEmprendimientoComponent } from '../modal-evaluacion-emprendimiento/modal-evaluacion-emprendimiento.component';

@Component({
  selector: 'app-evaluacion-emprendimiento',
  templateUrl: './evaluacion-emprendimiento.component.html',
  styleUrl: './evaluacion-emprendimiento.component.scss'
})
export class EvaluacionEmprendimientoComponent implements OnInit {
  evaluacionEmprendimientoForm!: FormGroup;
  emprendimientos: Emprendimiento[] = [];
  emprendimientosPaginados: Emprendimiento[] = [];
  idEvaluador: string = '';
  pagina: number = 1;
  tamanoPagina: number = 10;
  totalItems: number = 0;

  constructor(private administracionCongresoServicio: AdministracionCongresoServicio,
    private fb: FormBuilder,
    private router: Router,
    private modalServicio: NgbModal
  ) {
  }

  ngOnInit(): void {
    this.obtenerEmprendimientos();
  }

  async obtenerEmprendimientos() {
    const jsonAutenticado = localStorage.getItem('user')!.toString();
    let usuarioAutenticadoJson = JSON.parse(jsonAutenticado);

    this.idEvaluador = usuarioAutenticadoJson.id;
    const respuestaEmprendimientos = await lastValueFrom(
      this.administracionCongresoServicio.obtenerEmprendimientosAsignadosPorIdEvaluador(usuarioAutenticadoJson.id));

    const listaEmprendimientos = respuestaEmprendimientos.data.map(emprendimientoAsignado => emprendimientoAsignado.informacionEmprendimiento);
    this.emprendimientos = listaEmprendimientos ? listaEmprendimientos.filter(e => e !== undefined) : [];

    this.totalItems = this.emprendimientos.length;
    this.actualizarPaginacion();

  }

  evaluarEmprendimiento(id: string) {
  }

  actualizarPaginacion() {
    const inicio = (this.pagina - 1) * this.tamanoPagina;
    const fin = inicio + this.tamanoPagina;
    this.emprendimientosPaginados = this.emprendimientos.slice(inicio, fin);
  }

  abrirModalEvaluacion(emprendimiento: Emprendimiento) {
    const modalRef = this.modalServicio.open(ModalEvaluacionEmprendimientoComponent, { size: 'lg' });
    modalRef.componentInstance.emprendimiento = emprendimiento;
    modalRef.componentInstance.idEvaluador = this.idEvaluador;
  }

  onCambioPagina(numeroPagina: number) {
    this.pagina = numeroPagina;
    this.actualizarPaginacion();
  }
  navegarRuta(ruta: string) {
    this.router.navigate([ruta]);
  }
}
