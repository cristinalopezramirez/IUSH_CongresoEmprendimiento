import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdministracionCongresoServicio } from '../../servicios/administracion.servicio';
import { AlertasServicio } from '../../../../core/servicios/alertas.servicio';
import { lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CustomValidators } from '../../servicios/validacion-personalizada.validators';
import { EvaluacionPitch, PreguntaPitch, ResultadoEvaluacionEmprendimiento } from '../../../../shared/interfaces/evaluacion-emprendimiento-resultado.interface';

@Component({
  selector: 'app-evaluacion-emprendimiento-pitch',
  templateUrl: './evaluacion-emprendimiento-pitch.component.html',
  styleUrl: './evaluacion-emprendimiento-pitch.component.scss'
})
export class EvaluacionEmprendimientoPitchComponent implements OnInit {

  registroEvaluacionPitchForm!: FormGroup;
  emprendimientosPitch: ResultadoEvaluacionEmprendimiento[] = [];
  emailExiste: boolean = false;
  puntajes = [1, 2, 3, 4, 5];
  mostrarEvaluacionPitch = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private administracionServicio: AdministracionCongresoServicio,
    private alertaServicio: AlertasServicio,
    private http: HttpClient) {

  }


  ngOnInit(): void {
    this.registroEvaluacionPitchForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email], [CustomValidators.emailValidator(this.http)]],
      emprendimiento: ['', Validators.required],
      preguntas: this.fb.array([]),
    });

    this.cargarPreguntas();

    this.validarCorreoElectronico();
  }

  cargarPreguntas() {
    const preguntas = [
      { pregunta: 'Se identifica claramente el problema o necesidad', puntaje: null },
      { pregunta: 'Se muestra solución clara, original y creativa', puntaje: null },
      { pregunta: 'Existe claridad en la propuesta de valor ofrecida', puntaje: null },
      { pregunta: 'La idea o emprendimiento cuenta con viabilidad en la implementación', puntaje: null },
      { pregunta: 'Cuenta con potencial para atraer y retener clientes', puntaje: null },
      { pregunta: 'Explica claramente como llegar al mercado objetivo', puntaje: null }
    ];

    const controlArray = this.registroEvaluacionPitchForm.get('preguntas') as FormArray;
    preguntas.forEach(p => controlArray.push(this.crearPreguntaFormGroup(p)));
  }

  crearPreguntaFormGroup(pregunta: any): FormGroup {
    return this.fb.group({
      pregunta: [pregunta.pregunta],
      puntaje: [pregunta.valor, Validators.required]
    });
  }

  obtenerPuntajes(puntaje: number): string {
    switch (puntaje) {
      case 1:
        return 'Muy Deficiente';
      case 2:
        return 'Deficiente';
      case 3:
        return 'Aceptable';
      case 4:
        return 'Bueno';
      case 5:
        return 'Excelente';
      default:
        return '';
    }
  }

  get preguntas(): FormArray {
    return this.registroEvaluacionPitchForm.get('preguntas') as FormArray;
  }

  validarCorreoElectronico() {
    this.registroEvaluacionPitchForm.get('correo')?.statusChanges.subscribe(status => {
      if (status === 'VALID') {
        this.habilitarEmprendimientoSelector();
        this.mostrarEvaluacionPitch = true;
        this.listarEmprendimientosPitch();
      } else {
        this.deshabilitarEmprendimientoSelector();
        this.mostrarEvaluacionPitch = false;
      }
    });
  }

  habilitarEmprendimientoSelector() {
    this.registroEvaluacionPitchForm.get('emprendimiento')?.enable();
    this.listarEmprendimientosPitch();
  }

  deshabilitarEmprendimientoSelector() {
    this.registroEvaluacionPitchForm.get('emprendimiento')?.disable();
  }

  async listarEmprendimientosPitch() {
    const respuestaEmprendimientos = await lastValueFrom(this.administracionServicio.obtenerEmprendimientosPitch());
    this.emprendimientosPitch = respuestaEmprendimientos.data;
  }

  registroEvaluacionPitch() {

    if (this.registroEvaluacionPitchForm.invalid) {
      this.registroEvaluacionPitchForm.markAllAsTouched();
      return;
    }

    const evaluacionPitchForm = this.registroEvaluacionPitchForm.value;
    let evaluacionPreguntas: PreguntaPitch[] = [];

    evaluacionPreguntas = evaluacionPitchForm.preguntas;

    let preguntasConvertidas = evaluacionPreguntas.map(pregunta => {
      return {
        ...pregunta,
        valor: Number(pregunta.valor)
      };
    });


    this.administracionServicio.obtenerInvitadoEspecial(evaluacionPitchForm.correo)
      .subscribe((resultado) => {

        const evaluacionPitch: EvaluacionPitch = new EvaluacionPitch(
          resultado.data?._id!,
          evaluacionPitchForm.emprendimiento,
          preguntasConvertidas)

        this.administracionServicio.registrarEvaluacionPitch(evaluacionPitch).subscribe((resultadoEvaluacionRegistrada) => {
          if (resultadoEvaluacionRegistrada.error != null) {
            this.alertaServicio.alertaError({
              titulo: 'Evaluación Pitch',
              texto: resultadoEvaluacionRegistrada.message,
              redireccionar: false
            });
          } else {

            this.alertaServicio.alertaExitosa({
              titulo: 'Evaluación Pitch',
              texto: 'Evaluación registrada con éxito',
              redireccionar: true,
              urlRedireccion: '/'
            });
          }
        });
      });

  }

  navegarRuta(ruta: string) {
    this.router.navigate([ruta]);
  }
}


