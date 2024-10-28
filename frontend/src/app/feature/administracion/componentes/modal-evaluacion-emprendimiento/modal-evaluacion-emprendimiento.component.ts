import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Evaluacion, EvaluacionEmprendimiento, Pregunta } from '../../../../shared/interfaces/evaluacion-emprendimiento.interface';
import { AdministracionCongresoServicio } from '../../servicios/administracion.servicio';
import { AlertasServicio } from '../../../../core/servicios/alertas.servicio';

@Component({
  selector: 'app-modal-evaluacion-emprendimiento',
  templateUrl: './modal-evaluacion-emprendimiento.component.html',
  styleUrl: './modal-evaluacion-emprendimiento.component.scss'
})
export class ModalEvaluacionEmprendimientoComponent implements OnInit {

  @Input() emprendimiento: any;
  @Input() idEvaluador: any;
  evaluacionForm!: FormGroup;
  puntajes = [1, 2, 3, 4, 5];
  mostrarModuloIdea = false;
  mostrarModuloDesarrollo = false;
  mostrarModuloLanzamiento = false;

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private administracionCongresoServicio: AdministracionCongresoServicio,
    private alertaServicio: AlertasServicio) {
    this.evaluacionForm = this.fb.group({
      preguntasIdea: this.fb.array([]),
      preguntasDesarrollo: this.fb.array([]),
      preguntasLanzamiento: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.configurarFormularioSegunEtapa();
  }

  configurarFormularioSegunEtapa() {
    switch (this.emprendimiento.estado) {
      case 'Idea':
        this.mostrarModuloIdea = true;
        this.cargarPreguntasIdea();
        break;
      case 'Desarrollo':
        this.mostrarModuloIdea = true;
        this.mostrarModuloDesarrollo = true;
        this.cargarPreguntasIdea();
        this.cargarPreguntasDesarrollo();
        break;
      case 'Lanzamiento Temprano':
        this.mostrarModuloIdea = true;
        this.mostrarModuloDesarrollo = true;
        this.mostrarModuloLanzamiento = true;
        this.cargarPreguntasIdea();
        this.cargarPreguntasDesarrollo();
        this.cargarPreguntasLanzamiento();
        break;
    }
  }

  cargarPreguntasIdea() {
    const preguntasIdea = [
      { pregunta: 'Claridad de la idea', descripcion: 'Grado de claridad y comprensión de la idea propuesta.', puntaje: null },
      { pregunta: 'Validacion del mercado', descripcion: 'Evaluación del mercado objetivo, demanda potencial y competencia.', puntaje: null },
      { pregunta: 'Solucion a necesidad o problema', descripcion: 'Identificacion de necesidad o problema a resolver', puntaje: null },
      { pregunta: 'Relevancia', descripcion: 'Importancia y pertinencia de la idea en el mercado actual.', puntaje: null },
      { pregunta: 'Propuesta de Valor', descripcion: 'Claridad y fuerza de la propuesta de valor ofrecida por el negocio.', puntaje: null }
    ];

    const controlArray = this.evaluacionForm.get('preguntasIdea') as FormArray;
    preguntasIdea.forEach(p => controlArray.push(this.crearPreguntaFormGroup(p)));
  }

  cargarPreguntasDesarrollo() {
    const preguntasDesarrollo = [
      { pregunta: 'Modelo de Negocio', descripcion: 'Solidez y coherencia del modelo de negocio propuesto.', puntaje: null },
      { pregunta: 'Viabilidad Técnica', descripcion: 'Factibilidad técnica para desarrollar el producto o servicio.', puntaje: null },
      { pregunta: 'Innovación Tecnológica', descripcion: 'Grado de innovación tecnológica incorporada en el desarrollo.', puntaje: null },
      { pregunta: 'Prototipo', descripcion: 'Calidad y funcionalidad del prototipo desarrollado.', puntaje: null },
      { pregunta: 'Impacto Social y Ambiental', descripcion: 'Potencial de la idea para generar un impacto positivo en la sociedad y el medio ambiente.', puntaje: null },
      { pregunta: 'Estrategia de Mercado', descripcion: 'Claridad y viabilidad de la estrategia de entrada al mercado.', puntaje: null },
      { pregunta: 'Competencia', descripcion: 'Reconoces las Fortalezas y debilidades de tu competencia', puntaje: null },
      { pregunta: 'Viabilidad Financiera', descripcion: 'Sostenibilidad económica y capacidad de generar ingresos y beneficios.', puntaje: null }
    ];

    const controlArray = this.evaluacionForm.get('preguntasDesarrollo') as FormArray;
    preguntasDesarrollo.forEach(p => controlArray.push(this.crearPreguntaFormGroup(p)));
  }

  cargarPreguntasLanzamiento() {
    const preguntasLanzamiento = [
      { pregunta: 'Pruebas de Mercado', descripcion: 'Resultados obtenidos de pruebas de mercado o pilotos.', puntaje: null },
      { pregunta: 'Recepción Inicial', descripcion: 'Feedback y aceptación inicial por parte de los primeros usuarios o clientes.', puntaje: null },
      { pregunta: 'Impacto Social', descripcion: 'Potencial del proyecto para generar un impacto positivo en la sociedad.', puntaje: null },
      { pregunta: 'Impacto Económico', descripcion: 'Potencial para contribuir al desarrollo económico de la región o país.', puntaje: null },
      { pregunta: 'Plan de Implementación', descripcion: 'Claridad y realismo del plan de implementación y estrategia operativa.', puntaje: null }
    ];

    const controlArray = this.evaluacionForm.get('preguntasLanzamiento') as FormArray;
    preguntasLanzamiento.forEach(p => controlArray.push(this.crearPreguntaFormGroup(p)));
  }

  crearPreguntaFormGroup(pregunta: any): FormGroup {
    return this.fb.group({
      pregunta: [pregunta.pregunta],
      descripcion: [pregunta.descripcion],
      puntaje: [pregunta.puntaje, Validators.required]
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

  guardarEvaluacion() {
    if (this.evaluacionForm.valid) {
      const evaluacion = this.evaluacionForm.value;

      let evaluacionPreguntas: Evaluacion[] = [];

      switch (this.emprendimiento.estado) {
        case 'Idea':
          evaluacionPreguntas.push(new Evaluacion('Idea', evaluacion.preguntasIdea));
          break;
        case 'Desarrollo':
          evaluacionPreguntas.push(new Evaluacion('Idea', evaluacion.preguntasIdea));
          evaluacionPreguntas.push(new Evaluacion('Desarrollo', evaluacion.desarrollado));
          break;
        case 'Lanzamiento Temprano':
          evaluacionPreguntas.push(new Evaluacion('Idea', evaluacion.preguntasIdea));
          evaluacionPreguntas.push(new Evaluacion('Desarrollo', evaluacion.preguntasDesarrollo));
          evaluacionPreguntas.push(new Evaluacion('Lanzamiento', evaluacion.preguntasLanzamiento));
          break;
      }

      let evaluacionEmprendimiento: EvaluacionEmprendimiento = {
        evaluador: this.idEvaluador,
        emprendimiento: this.emprendimiento._id,
        evaluacion: evaluacionPreguntas
      };


      this.administracionCongresoServicio.registrarEvaluacion(evaluacionEmprendimiento).subscribe((evaluacionRegistrada) => {
        if (evaluacionRegistrada.error != null) {
          this.alertaServicio.alertaError({
            titulo: 'Evaluación registrada',
            texto: evaluacionRegistrada.message,
            redireccionar: false
          });
        } else {

          this.alertaServicio.alertaExitosa({
            titulo: 'Evaluación registrada',
            texto: evaluacionRegistrada.message,
            redireccionar: true,
            urlRedireccion: '/administracion/opciones'
          });
        }
      });
      this.activeModal.close(evaluacionEmprendimiento);
    }
  }

  get preguntasIdea(): FormArray {
    return this.evaluacionForm.get('preguntasIdea') as FormArray;
  }

  get preguntasDesarrollo(): FormArray {
    return this.evaluacionForm.get('preguntasDesarrollo') as FormArray;
  }

  get preguntasLanzamiento(): FormArray {
    return this.evaluacionForm.get('preguntasLanzamiento') as FormArray;
  }

}
