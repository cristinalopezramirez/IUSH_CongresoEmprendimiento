import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Pais } from '../../../../shared/interfaces/pais.interface';
import { Router } from '@angular/router';
import { AdministracionCongresoServicio } from '../../servicios/administracion.servicio';
import { AlertasServicio } from '../../../../core/servicios/alertas.servicio';
import { lastValueFrom } from 'rxjs';
import { Institucion } from '../../../../shared/interfaces/institucion.interface';
import { Evaluador } from '../../../../shared/interfaces/evaluador.interface';

@Component({
  selector: 'app-registro-evaluador',
  templateUrl: './registro-evaluador.component.html',
  styleUrl: './registro-evaluador.component.scss'
})
export class RegistroEvaluadorComponent implements OnInit {
  registroEvaluadorForm!: FormGroup;
  paises: Pais[] = [];
  instituciones: Institucion[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private administracionServicio: AdministracionCongresoServicio,
    private alertaServicio: AlertasServicio
  ) {
  }
  ngOnInit(): void {
    this.registroEvaluadorForm = this.fb.group({
      nombre: ['', Validators.required],
      documentoIdentidad: ['', Validators.required],
      telefono: ['', Validators.required],
      correo: ['', Validators.required, Validators.email],
      pais: ['', Validators.required],
      idIES: ['', Validators.required]
    });

    this.consultarPaises();

  }

  registroEvaluador() {

    if (this.registroEvaluadorForm.invalid) {
      this.registroEvaluadorForm.markAllAsTouched();
      return;
    }

    const registroEvaluador: Evaluador = {
      nombre: this.registroEvaluadorForm.get('nombre')?.value,
      documentoIdentidad: this.registroEvaluadorForm.get('documentoIdentidad')?.value,
      telefono: this.registroEvaluadorForm.get('telefono')?.value,
      correo: this.registroEvaluadorForm.get('correo')?.value,
      idPais: this.registroEvaluadorForm.get('pais')?.value,
      idIES: this.registroEvaluadorForm.get('idIES')?.value
    }
    this.registroEvaluadorForm.reset();

    this.administracionServicio.crearEvaluador(registroEvaluador).subscribe((evaluadorCreado) => {
      if (evaluadorCreado.error != null) {
        this.alertaServicio.alertaError({
          titulo: 'Registro Evaluador',
          texto: evaluadorCreado.message,
          redireccionar: false
        });
      } else {

        this.alertaServicio.alertaExitosa({
          titulo: 'Registro Evaluador',
          texto: evaluadorCreado.message,
          redireccionar: true,
          urlRedireccion: '/administracion/opciones'
        });
      }
    });

  }

  async consultarPaises() {
    const respuestaPaises = await lastValueFrom(this.administracionServicio.obtenerPaises());
    this.paises = respuestaPaises.data;
  }
  async paisSeleccionado(evento: any) {
    this.instituciones = [];
    const idPais = evento.target.value;
    const respuestaInstituciones = await lastValueFrom(this.administracionServicio.obtenerInstitucionesPorPais(idPais));

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
          nombre: 'No hay instituciones educativas registradas para este país'
        }];

    } else {
      this.instituciones = respuestaInstituciones.data;
    }
  }

  navegarRuta(ruta: string) {
    this.router.navigate([ruta]);
  }

}
