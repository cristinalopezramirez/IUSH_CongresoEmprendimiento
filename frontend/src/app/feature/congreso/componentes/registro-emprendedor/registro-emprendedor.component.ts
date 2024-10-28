import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { CongresoEmprendimientoServicio } from '../../servicios/congreso-emprendimiento.servicio';
import { Pais } from '../../../../shared/interfaces/pais.interface';
import { Institucion } from '../../../../shared/interfaces/institucion.interface';
import { Router } from '@angular/router';
import { AlertasServicio } from '../../../../core/servicios/alertas.servicio';
import { PreguntaEmprendimiento } from '../../../../shared/interfaces/pregunta-emprendimiento.interface';
import { Emprendedor } from '../../../../shared/interfaces/emprendedor.interface';


@Component({
  selector: 'app-registro-emprendedor',
  templateUrl: './registro-emprendedor.component.html',
  styleUrl: './registro-emprendedor.component.scss'
})

export class RegistroEmprendedorComponent implements OnInit {
  responderPreguntasEmprendimiento: boolean = false;

  paises: Pais[] = [];
  instituciones: Institucion[] = [];
  preguntasEmprendimiento: PreguntaEmprendimiento[] = [];

  emprendedor?: Emprendedor;

  registroEmprendedorForm!: FormGroup;

  constructor(
    private congresoEmprendimientoServicio: CongresoEmprendimientoServicio,
    private alertaservicio: AlertasServicio,
    private readonly router: Router,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.registroEmprendedorForm = this.fb.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      documentoIdentidad: ['', Validators.required],
      correoElectronicoPersonal: ['', [Validators.required, Validators.email]],
      correoElectronicoInstitucional: ['', [Validators.required, Validators.email]],
      numeroTelefono: ['', Validators.required],
      pais: ['', Validators.required],
      ciudadResidencia: ['', Validators.required],
      idIES: ['', Validators.required],
      programaAcademico: ['', Validators.required],
    });

    this.consultarPaises();
  }

  async consultarPaises() {
    const respuestaPaises = await lastValueFrom(this.congresoEmprendimientoServicio.obtenerPaises());
    this.paises = respuestaPaises.data;
  }

  registrarEmprendedor(): void {

    if (this.registroEmprendedorForm.invalid) {
      this.registroEmprendedorForm.markAllAsTouched();
      return;
    }

    if (this.registroEmprendedorForm.valid) {
      const emprendedor = {
        nombres: this.registroEmprendedorForm.get('nombres')?.value,
        apellidos: this.registroEmprendedorForm.get('apellidos')?.value,
        documentoIdentidad: this.registroEmprendedorForm.get('documentoIdentidad')?.value,
        correoElectronicoPersonal: this.registroEmprendedorForm.get('correoElectronicoPersonal')?.value,
        correoElectronicoInstitucional: this.registroEmprendedorForm.get('correoElectronicoInstitucional')?.value,
        numeroTelefono: this.registroEmprendedorForm.get('numeroTelefono')?.value,
        pais: this.registroEmprendedorForm.get('pais')?.value,
        ciudadResidencia: this.registroEmprendedorForm.get('ciudadResidencia')?.value,
        idIES: this.registroEmprendedorForm.get('idIES')?.value,
        programaAcademico: this.registroEmprendedorForm.get('programaAcademico')?.value,
      };

      this.congresoEmprendimientoServicio.crearEmprendedor(emprendedor).subscribe((emprendedorCreado) => {
        let emprendedor = emprendedorCreado.data;
        this.emprendedor = emprendedor;
        this.alertaservicio.alertaExitosa({ titulo: 'Registro Emprendimiento', texto: emprendedorCreado.message });
        this.registroEmprendedorForm.reset();
        this.consultarPreguntasEmprendimiento();
      });
    }
  }

  async paisSeleccionado(evento: any) {
    this.instituciones = [];
    const idPais = evento.target.value;
    const respuestaInstituciones = await lastValueFrom(this.congresoEmprendimientoServicio.obtenerInstitucionesPorPais(idPais));

    if (respuestaInstituciones.data.length === 0) {
      this.instituciones = [
        {
          _id: '',
          paisIES: '',
          nombrePais: '',
          regionDepartamento: '',
          nombreLiderIES: '',
          correoContacto: '',
          telefonoContacto: '',
          urlOficial: '',
          nombre: 'No hay universidades registradas para este país'
        }];

    } else {
      this.instituciones = respuestaInstituciones.data;
    }
  }

  navegarRuta(ruta: string) {
    this.router.navigate([ruta]);
  }

  async consultarPreguntasEmprendimiento() {
    const preguntasEmprendimiento = await lastValueFrom(this.congresoEmprendimientoServicio.obtenerPreguntas());
    this.preguntasEmprendimiento = preguntasEmprendimiento.data;
    this.mostrarPreguntasEmprendimiento();

  }

  mostrarPreguntasEmprendimiento(): void {
    this.responderPreguntasEmprendimiento = !this.responderPreguntasEmprendimiento;
  }
}
