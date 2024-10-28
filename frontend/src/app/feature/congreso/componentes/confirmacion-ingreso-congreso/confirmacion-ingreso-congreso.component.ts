import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CongresoEmprendimientoServicio } from '../../servicios/congreso-emprendimiento.servicio';
import { AlertasServicio } from '../../../../core/servicios/alertas.servicio';
import { ConfirmacionAsistenciaCongreso } from '../../../../shared/interfaces/confirmacion-asistencia-congreso.interface';

@Component({
  selector: 'app-confirmacion-ingreso-congreso',
  templateUrl: './confirmacion-ingreso-congreso.component.html',
  styleUrl: './confirmacion-ingreso-congreso.component.scss'
})
export class ConfirmacionIngresoCongresoComponent implements OnInit {

  ingresoCongresoForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private readonly router: Router,
    private readonly congresoEmprendimientoServicio: CongresoEmprendimientoServicio,
    private readonly alertaServicio: AlertasServicio
  ) { }

  ngOnInit(): void {

    this.ingresoCongresoForm = this.fb.group({
      nombres: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required]
    });

  }

  confirmarAsistencia() {

    const confirmacionAsistencia: ConfirmacionAsistenciaCongreso = {
      nombres: this.ingresoCongresoForm.get('nombres')?.value,
      correo: this.ingresoCongresoForm.get('correo')?.value,
      telefono: this.ingresoCongresoForm.get('telefono')?.value
    }

    this.congresoEmprendimientoServicio.confirmarAsistencia(confirmacionAsistencia).subscribe((confirmacionAsistenciaResultado) => {

      this.ingresoCongresoForm.reset();

      if (confirmacionAsistenciaResultado.error != null) {
        this.alertaServicio.alertaError({
          titulo: 'Asistencia Congreso',
          texto: confirmacionAsistenciaResultado.message,
          redireccionar: true,
          urlRedireccion: '/'
        });
      } else {

        this.alertaServicio.alertaExitosa({
          titulo: confirmacionAsistenciaResultado.data.titulo,
          texto: confirmacionAsistenciaResultado.data.mensaje,
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
