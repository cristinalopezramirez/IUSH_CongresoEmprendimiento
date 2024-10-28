import { Component, Input, input, OnInit } from '@angular/core';
import { Emprendedor } from '../../../../shared/interfaces/emprendedor.interface';
import { CongresoEmprendimientoServicio } from '../../servicios/congreso-emprendimiento.servicio';
import { AlertasServicio } from '../../../../core/servicios/alertas.servicio';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { Sector } from '../../../../shared/interfaces/sector.interface';
declare var bootstrap: any;

@Component({
  selector: 'app-preguntas-emprendimiento',
  templateUrl: './preguntas-emprendimiento.component.html',
  styleUrl: './preguntas-emprendimiento.component.scss'
})
export class PreguntasEmprendimientoComponent implements OnInit {
  @Input() emprendedorCreado?: Emprendedor;
  registroPreguntasEmprendedorForm!: FormGroup;
  preguntas: any[] = [];
  respuestas: { [key: string]: boolean | null } = {}
  formularioEnviado = false;
  sectores: Sector[] = [];
  descripcionTooltip: string = '';

  constructor(
    private congresoEmprendimientoServicio: CongresoEmprendimientoServicio,
    private alertaservicio: AlertasServicio,
    private readonly router: Router,
    private fb: FormBuilder
  ) {

  }
  ngOnInit(): void {

    this.registroPreguntasEmprendedorForm = this.fb.group({
      descripcionIdea: ['', Validators.required],
      propuestaSolucion: ['', Validators.required],
      fecha: [null, Validators.required],
      idSector: ['', Validators.required],
    });

    this.consultarPreguntas();
    this.obtenerSectores();
    this.activarTooltip();
  }

  registrarPreguntasEmprendedor(): void {

    if (this.registroPreguntasEmprendedorForm.invalid) {
      this.registroPreguntasEmprendedorForm.markAllAsTouched();
      return;
    }

    if (this.emprendedorCreado && this.emprendedorCreado._id !== null || this.emprendedorCreado?._id !== undefined) {
      this.formularioEnviado = true;
      const todasRespondidas = this.preguntas.every(
        pregunta => this.respuestas[pregunta._id] !== null
      );

      if (todasRespondidas && this.registroPreguntasEmprendedorForm.valid) {
        const respuestasParaGuardar = this.preguntas.map(pregunta => ({
          numeroPregunta: Number.parseInt(pregunta.numero),
          respuestaPregunta: this.respuestas[pregunta._id],
        }));

        const emprendimiento = {
          idSector: this.registroPreguntasEmprendedorForm.get('idSector')?.value,
          idIES: this.emprendedorCreado?.idIES,
          idEmprendedor: this.emprendedorCreado?._id,
          fecha: this.registroPreguntasEmprendedorForm.get('fecha')?.value,
          descripcionIdea: this.registroPreguntasEmprendedorForm.get('descripcionIdea')?.value,
          propuestaSolucion: this.registroPreguntasEmprendedorForm.get('propuestaSolucion')?.value,
          respuestas: respuestasParaGuardar
        }
        
        this.congresoEmprendimientoServicio.crearEmprendimiento(emprendimiento).subscribe((emprendimientoCreado) => {
          this.preguntas.forEach(pregunta => {
            this.respuestas[pregunta._id] = null;
          });
          this.formularioEnviado = false;
          
          this.registroPreguntasEmprendedorForm.reset();

          this.alertaservicio.alertaExitosa({
            titulo: 'Registro Emprendimiento',
            texto: emprendimientoCreado.message,
            redireccionar: true,
            urlRedireccion: '/'
          });

        });
      }
    }
    else {
      this.alertaservicio.alertaError({
        titulo: 'Registro Emprendimiento',
        texto: 'No se encuentra emprendedor creado para relacionar con el emprendimiento'
      });
    }


  }

  navegarRuta(ruta: string) {
    this.router.navigate([ruta]);
  }

  async consultarPreguntas() {
    const respuestaPreguntas = await lastValueFrom(this.congresoEmprendimientoServicio.obtenerPreguntas());
    respuestaPreguntas.data.sort((a, b) => a.numero - b.numero);
    this.preguntas = respuestaPreguntas.data;
    this.preguntas.forEach(pregunta => {
      this.respuestas[pregunta._id] = null;
    });

  }

  obtenerFilas(): any[][] {
    const filas: any[][] = [];
    for (let i = 0; i < this.preguntas.length; i += 3) {
      filas.push(this.preguntas.slice(i, i + 3));
    }
    return filas;
  }

  async obtenerSectores() {
    const respuestaSectores = await lastValueFrom(this.congresoEmprendimientoServicio.obtenerSectores());
    this.sectores = respuestaSectores.data;
  }

  sectorSeleccionado(event: Event): void {
    const selectedSectorId = (event.target as HTMLSelectElement).value;
    const sectorSeleccionado = this.sectores.find(sector => sector._id === selectedSectorId);

    if (sectorSeleccionado) {
      this.descripcionTooltip = sectorSeleccionado.descripcion;
      setTimeout(() => {
        this.activarTooltip();
    }, 0);
    }
  }

  activarTooltip(): void {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));

    const existingTooltip = bootstrap.Tooltip.getInstance(tooltipTriggerList);
        if (existingTooltip) {
            existingTooltip.dispose();
        }

    tooltipTriggerList.forEach(tooltipTriggerEl => {
      const tooltip = new bootstrap.Tooltip(tooltipTriggerEl);
      tooltip.show();
    });
  }
}
