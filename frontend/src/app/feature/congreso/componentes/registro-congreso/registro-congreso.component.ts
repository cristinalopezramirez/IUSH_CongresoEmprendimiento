import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Pais } from '../../../../shared/interfaces/pais.interface';
import { lastValueFrom } from 'rxjs';
import { CongresoEmprendimientoServicio } from '../../servicios/congreso-emprendimiento.servicio';
import { DivulgacionEvento, InscripcionCongreso, InteresEvento } from '../../../../shared/interfaces/inscripcion-congreso.interface';
import { AlertasServicio } from '../../../../core/servicios/alertas.servicio';

@Component({
  selector: 'app-registro-congreso',
  templateUrl: './registro-congreso.component.html',
  styleUrl: './registro-congreso.component.scss'
})
export class RegistroCongresoComponent {

  opcionesInteres = ['Muy interesado', 'Interesado', 'Indiferente', 'Poco interesado', 'Nada interesado'];
  expectativas = [
    { id: 'conocerEmprendimiento', descripcion: 'Conocer nuevos emprendimientos' },
    { id: 'networking', descripcion: 'Encontrar oportunidades de networking' },
    { id: 'contactoActores', descripcion: 'Generar contacto con otros actores del ecosistema' },
    { id: 'tendencias', descripcion: 'Aprender sobre las ultimas tendencias en emprendimiento o inversion' },
  ];

  divulgacionEvento = [
    { id: 'divulgacionEventoRedesSociales', descripcion: 'Redes sociales' },
    { id: 'divulgacionEventoSitioWeb', descripcion: 'Sitio web actual' },
    { id: 'divulgacionEventoCorreoElectronico', descripcion: 'Correo electrónico' },
    { id: 'divulgacionEventoRecomendacion', descripcion: 'Recomendación voz a voz' },
    { id: 'divulgacionEventoAnuncios', descripcion: 'Anuncios en línea' },
    { id: 'divulgacionEventoOrganizacion', descripcion: 'En la organización que pertenezco' },
    { id: 'divulgacionEventoOtro', descripcion: 'Otro -' },

  ];

  registroCongresoForm!: FormGroup;
  paises: Pais[] = [];


  constructor(
    private fb: FormBuilder,
    private readonly router: Router,
    private readonly congresoEmprendimientoServicio: CongresoEmprendimientoServicio,
    private readonly alertaServicio: AlertasServicio
  ) { }

  ngOnInit(): void {

    this.registroCongresoForm = this.fb.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],
      pais: ['', Validators.required],
      ciudad: ['', Validators.required],
      tipoAsistente: ['', Validators.required],
      otroAsistente: [''],
      divulgacionEventoRedesSociales: [false],
      divulgacionEventoSitioWeb: [false],
      divulgacionEventoCorreoElectronico: [false],
      divulgacionEventoRecomendacion: [false],
      divulgacionEventoAnuncios: [false],
      divulgacionEventoOrganizacion: [false],
      divulgacionEventoOtro: [false],
      divulgacionEventoOtroDescripcion: [''],
      aceptaEnvioComunicacion: [false],
      aceptaTerminosYCondicionesTratamientoDatos: [false]
    });

    this.expectativas.forEach(expectativa => {
      this.registroCongresoForm.addControl(expectativa.id, this.fb.control(''));
    });

    this.consultarPaises();

    this.registroCongresoForm.get('tipoAsistente')?.valueChanges.subscribe(value => {
      const otroAsistenteControl = this.registroCongresoForm.get('otroAsistente');
      if (value === 'Otro') {
        otroAsistenteControl?.setValidators(Validators.required);
      } else {
        otroAsistenteControl?.clearValidators();
      }
      otroAsistenteControl?.updateValueAndValidity();
    });

    this.registroCongresoForm.get('divulgacionEventoOtro')?.valueChanges.subscribe(value => {
      if (value) {
        this.registroCongresoForm.get('divulgacionEventoOtroDescripcion')?.enable();
      } else {
        this.registroCongresoForm.get('divulgacionEventoOtroDescripcion')?.disable();
      }
    });
  }

  async consultarPaises() {
    const respuestaPaises = await lastValueFrom(this.congresoEmprendimientoServicio.obtenerPaises());
    this.paises = respuestaPaises.data;
  }

  inscribirseAlCongreso(): void {
    if (this.registroCongresoForm.invalid) {
      this.registroCongresoForm.markAllAsTouched();
      return;
    }

    const interesesEventos: InteresEvento[] = this.expectativas.map(expectativa => ({
      pregunta: expectativa.descripcion,
      respuesta: this.registroCongresoForm.get(expectativa.id)?.value
    }));

    const divulgacionEvento: DivulgacionEvento[] = this.divulgacionEvento.map(divulgacion => ({
      pregunta: divulgacion.descripcion,
      respuesta: divulgacion.id == 'divulgacionEventoOtro' ? `Otro - ${this.registroCongresoForm.get('divulgacionEventoOtroDescripcion')?.value}` :
        this.registroCongresoForm.get(divulgacion.id)?.value
    }));


    const inscripcionEmprendimiento: InscripcionCongreso = {
      nombres: this.registroCongresoForm.get('nombres')?.value,
      apellidos: this.registroCongresoForm.get('apellidos')?.value,
      correo: this.registroCongresoForm.get('correo')?.value,
      telefono: this.registroCongresoForm.get('telefono')?.value,
      pais: this.registroCongresoForm.get('pais')?.value,
      ciudad: this.registroCongresoForm.get('ciudad')?.value,
      tipoAsistente: this.registroCongresoForm.get('tipoAsistente')?.value === 'Otro' ?
        `Otro - ${this.registroCongresoForm.get('otroAsistente')?.value}` : this.registroCongresoForm.get('tipoAsistente')?.value,
      interesesEvento: interesesEventos,
      comoTeEnterasteEvento: divulgacionEvento,
      aceptaEnvioComunicacion: this.registroCongresoForm.get('aceptaEnvioComunicacion')?.value,
      aceptaTerminosYCondicionesTratamientoDatos: this.registroCongresoForm.get('aceptaTerminosYCondicionesTratamientoDatos')?.value,
    }

    this.registroCongresoForm.reset();


    this.congresoEmprendimientoServicio.inscripcionCongreso(inscripcionEmprendimiento).subscribe((inscripcionCongresoResultado) => {

      this.registroCongresoForm.reset();

      if (inscripcionCongresoResultado.error != null) {
        this.alertaServicio.alertaError({
          titulo: 'Inscripción Congreso',
          texto: inscripcionCongresoResultado.message,
          redireccionar: true,
          urlRedireccion: '/'
        });
      } else {

        this.alertaServicio.alertaExitosa({
          titulo: 'Inscripción Congreso',
          texto: inscripcionCongresoResultado.message,
          redireccionar: true,
          urlRedireccion: '/'
        });
      }
    });
  }

  navegarRuta(ruta: string) {
    this.router.navigate([ruta]);
  }
}
