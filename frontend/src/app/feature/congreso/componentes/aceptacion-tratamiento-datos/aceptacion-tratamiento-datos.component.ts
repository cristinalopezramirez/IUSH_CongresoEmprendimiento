import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertasServicio } from '../../../../core/servicios/alertas.servicio';
import { Router } from '@angular/router';

@Component({
  selector: 'app-aceptacion-tratamiento-datos',
  templateUrl: './aceptacion-tratamiento-datos.component.html',
  styleUrl: './aceptacion-tratamiento-datos.component.scss'
})
export class AceptacionTratamientoDatosComponent {
  aceptaPoliticaDatosPersonales: boolean = false;
  pdfSrc = 'assets/terminos-condiciones/autorizacion-datos.pdf';

  aceptaCesionImagen = false;
  aceptaTratamientoDatosPersonales = false;
  permitirRegistrar = false;

  constructor(
    public activeModal: NgbActiveModal,
    private alertaServicio: AlertasServicio,
    private route: Router) {

  }
  close() {
    this.activeModal.dismiss();
  }

  aceptaPoliticaTratamientoDatos(): void {

    this.aceptaCesionImagen = (document.getElementById('aceptaCesionImagen') as HTMLInputElement).checked;
    this.aceptaTratamientoDatosPersonales = (document.getElementById('aceptaTratamientoDatosPersonales') as HTMLInputElement).checked;

    this.permitirRegistrar = this.aceptaCesionImagen && this.aceptaTratamientoDatosPersonales;

  }

  registroUsuario() {
    this.alertaServicio.alertaOpcionesRegistro().then(opcionNavegacion => {
      if (opcionNavegacion !== undefined) {
        this.activeModal.dismiss();
        this.route.navigate([opcionNavegacion]);
      }
    });
  }

}
