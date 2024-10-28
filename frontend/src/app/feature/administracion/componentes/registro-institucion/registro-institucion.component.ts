import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Pais } from '../../../../shared/interfaces/pais.interface';
import { AdministracionCongresoServicio } from '../../servicios/administracion.servicio';
import { lastValueFrom } from 'rxjs';
import { Institucion } from '../../../../shared/interfaces/institucion.interface';
import { AlertasServicio } from '../../../../core/servicios/alertas.servicio';

@Component({
  selector: 'app-registro-institucion',
  templateUrl: './registro-institucion.component.html',
  styleUrl: './registro-institucion.component.scss'
})
export class RegistroInstitucionComponent implements OnInit {

  registroInstitucionForm!: FormGroup;
  paises: Pais[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private administracionServicio: AdministracionCongresoServicio,
    private alertaServicio: AlertasServicio) {

  }
  ngOnInit(): void {
    this.registroInstitucionForm = this.fb.group({
      nombre: ['', Validators.required],
      pais: ['', Validators.required],
      regionDepartamento: ['', Validators.required],
      nombreLiderIES: ['', Validators.required],
      correoContacto: ['', Validators.required, Validators.email],
      telefonoContacto: ['', Validators.required],
      urlOficial: ['', Validators.required]
    });

    this.consultarPaises();
  }

  registroInstitucion() {
    if (this.registroInstitucionForm.invalid) {
      this.registroInstitucionForm.markAllAsTouched();
      return;
    }

    const registroInstitucion: Institucion = {
      nombre: this.registroInstitucionForm.get('nombre')?.value,
      paisIES: this.registroInstitucionForm.get('pais')?.value,
      regionDepartamento: this.registroInstitucionForm.get('regionDepartamento')?.value,
      nombreLiderIES: this.registroInstitucionForm.get('nombreLiderIES')?.value,
      correoContacto: this.registroInstitucionForm.get('correoContacto')?.value,
      telefonoContacto: this.registroInstitucionForm.get('telefonoContacto')?.value,
      urlOficial: this.registroInstitucionForm.get('urlOficial')?.value,
    }
    this.registroInstitucionForm.reset();

    this.administracionServicio.crearInstitucion(registroInstitucion).subscribe((institucionCreada) => {
      if (institucionCreada.error != null) {
        this.alertaServicio.alertaError({
          titulo: 'Registro Institución',
          texto: institucionCreada.message,
          redireccionar: false
        });
      } else {

        this.alertaServicio.alertaExitosa({
          titulo: 'Registro Institución',
          texto: institucionCreada.message,
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


  navegarRuta(ruta: string) {
    this.router.navigate([ruta]);
  }
}
