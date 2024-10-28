import { Component, OnInit } from '@angular/core';
import { Evaluador } from '../../../../shared/interfaces/evaluador.interface';
import { Emprendimiento } from '../../../../shared/interfaces/emprendimiento.interface';
import { AdministracionCongresoServicio } from '../../servicios/administracion.servicio';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { AlertasServicio } from '../../../../core/servicios/alertas.servicio';
import { AsignacionEmprendimientoEvaluador } from '../../../../shared/interfaces/asignacion-emprendimiento-evaluador.interface';

@Component({
  selector: 'app-asignar-emprendimiento-evaluador',
  templateUrl: './asignar-emprendimiento-evaluador.component.html',
  styleUrl: './asignar-emprendimiento-evaluador.component.scss'
})
export class AsignarEmprendimientoEvaluadorComponent implements OnInit {
  asignacionForm!: FormGroup;
  emprendimientosSeleccionados: string[] = [];
  evaluadores: Evaluador[] = [];
  emprendimientos: Emprendimiento[] = [];
  emprendimientosPaginados: Emprendimiento[] = [];
  pagina: number = 1;
  tamanoPagina: number = 5;
  totalItems: number = 0;


  constructor(
    private administracionCongresoServicio: AdministracionCongresoServicio,
    private router: Router,
    private fb: FormBuilder,
    private alertaServicio: AlertasServicio
  ) {
    this.asignacionForm = this.fb.group({
      evaluador: ['', Validators.required],
      emprendimientosIds: [[]]
    });
  }

  ngOnInit(): void {
    this.cargarEvaluadores();
  }

  async cargarEvaluadores() {
    const respuestaEvaluadores = await lastValueFrom(this.administracionCongresoServicio.obtenerEvaluadores());
    this.evaluadores = respuestaEvaluadores.data;
  }

  toggleEmprendimiento(id: string) {
    const index = this.emprendimientosSeleccionados.indexOf(id);
    if (index > -1) {
      this.emprendimientosSeleccionados.splice(index, 1);
    } else {
      this.emprendimientosSeleccionados.push(id);
    }
  }

  asignarEvaluador() {

    if (this.asignacionForm.invalid) {
      this.asignacionForm.markAllAsTouched();
      return;
    }

    if (this.emprendimientosSeleccionados.length <= 0) {
      this.alertaServicio.alertaError({
        titulo: 'Asignación Evaluador - Emprendimientos',
        texto: 'Debe seleccionar mínimo un emprendimiento antes de continuar la asignación',
        redireccionar: false
      });
      return;
    }

    const asignacionEvaluadorEmprendimiento: AsignacionEmprendimientoEvaluador = {
      idEvaluador: this.asignacionForm.get('evaluador')?.value,
      emprendimientos: this.emprendimientosSeleccionados
    }

    this.asignacionForm.reset();

    this.administracionCongresoServicio.crearAsignacionEvaluadorEmprendimientos(
      asignacionEvaluadorEmprendimiento).subscribe((asignacionResultado) => {
        if (asignacionResultado.error != null) {
          this.alertaServicio.alertaError({
            titulo: 'Asignación Evaluador - Emprendimiento',
            texto: asignacionResultado.message,
            redireccionar: false
          });
        } else {

          this.alertaServicio.alertaExitosa({
            titulo: 'Asignación Evaluador - Emprendimiento',
            texto: 'Asignación realizada con éxito',
            redireccionar: true,
            urlRedireccion: '/administracion/opciones'
          });
        }
      });



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

  async evaluadorSeleccionado(evento: any) {
    this.emprendimientos = [];
    const idEvaluador = evento.target.value;

    const respuestaEmprendimientos = await lastValueFrom(
      this.administracionCongresoServicio.obtenerEmprendimientosNoAsociadosPorIdEvaluador(idEvaluador));

      this.emprendimientos = respuestaEmprendimientos.data;
      this.totalItems = this.emprendimientos.length;
      this.actualizarPaginacion();
  }
}
