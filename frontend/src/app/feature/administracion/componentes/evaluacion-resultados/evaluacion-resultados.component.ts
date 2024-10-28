import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ResultadoEvaluacionEmprendimiento } from '../../../../shared/interfaces/evaluacion-emprendimiento-resultado.interface';
import { AdministracionCongresoServicio } from '../../servicios/administracion.servicio';
import { Router } from '@angular/router';
import { AlertasServicio } from '../../../../core/servicios/alertas.servicio';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-evaluacion-resultados',
  templateUrl: './evaluacion-resultados.component.html',
  styleUrl: './evaluacion-resultados.component.scss'
})
export class EvaluacionResultadosComponent implements OnInit {

  evaluacionesAplicaPitchForm!: FormGroup;
  emprendimientosParaPitchSeleccionados: ResultadoEvaluacionEmprendimiento[] = [];
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
  ) {
    this.evaluacionesAplicaPitchForm = this.fb.group({
      emprendimientosIds: [[]]
    });
  }

  ngOnInit(): void {
    this.cargarEmprendimientosEvaluados();
  }

  async cargarEmprendimientosEvaluados() {
    const respuestaEvaluacionesEmprendimiento = await lastValueFrom(
      this.administracionCongresoServicio.obtenerEmprendimientosEvaluados());
    this.emprendimientos = respuestaEvaluacionesEmprendimiento.data;

    const respuestaEmprendimientosEnPitch = await lastValueFrom(this.administracionCongresoServicio.obtenerEmprendimientosPitch());

    const emprendimientosPitch = respuestaEmprendimientosEnPitch.data;

    this.emprendimientos.forEach((emprendimiento) => {

      const emprendimientoEncontrado = emprendimientosPitch.find(emprendimientoPitch => emprendimientoPitch.emprendimiento === emprendimiento.emprendimiento);

      if (emprendimientoEncontrado && emprendimientoEncontrado.pasaAPitch) {
        emprendimiento.pasaAPitch = emprendimientoEncontrado.pasaAPitch;
      }
    });

    this.totalItems = this.emprendimientos.length;
    this.actualizarPaginacion();
  }

  async enviarEmprendimientosAPitch() {

    if (this.evaluacionesAplicaPitchForm.invalid) {
      this.evaluacionesAplicaPitchForm.markAllAsTouched();
      return;
    }

    if (this.emprendimientosParaPitchSeleccionados.length <= 0) {
      this.alertaServicio.alertaError({
        titulo: 'Emprendimientos enviados para Pitch',
        texto: 'Debe seleccionar mínimo un emprendimiento antes de continuar con la acción',
        redireccionar: false
      });
      return;
    }

    await this.actualizarEmprendimientosParaPitch(this.emprendimientosParaPitchSeleccionados);
        
    this.administracionCongresoServicio.crearEmprendimientosPasanAPitch(
      this.emprendimientosParaPitchSeleccionados).subscribe((resultado) => {
        if (resultado.error != null) {
          this.alertaServicio.alertaError({
            titulo: 'Emprendimientos enviados para Pitch',
            texto: resultado.message,
            redireccionar: false
          });
        } else {

          this.alertaServicio.alertaExitosa({
            titulo: 'Emprendimientos enviados para Pitch',
            texto: resultado.message,
            redireccionar: true,
            urlRedireccion: '/administracion/opciones'
          });
        }
      });
  }

  actualizarEmprendimientosParaPitch(emprendimientos: any[]): Promise<void> {
    return new Promise((resolve) => {
      emprendimientos.forEach((emprendimiento) => {
        emprendimiento.pasaAPitch = true;
      });
      resolve();
    });
  }


  toggleEmprendimiento(emprendimiento: ResultadoEvaluacionEmprendimiento) {
    const index = this.emprendimientosParaPitchSeleccionados.indexOf(emprendimiento);
    if (index > -1) {
      this.emprendimientosParaPitchSeleccionados.splice(index, 1);
    } else {
      this.emprendimientosParaPitchSeleccionados.push(emprendimiento);
    }
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
