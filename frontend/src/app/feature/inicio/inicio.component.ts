import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertasServicio } from '../../core/servicios/alertas.servicio';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AceptacionTratamientoDatosComponent } from '../congreso/componentes/aceptacion-tratamiento-datos/aceptacion-tratamiento-datos.component';
import { AgendaEventoComponent } from '../congreso/componentes/agenda-evento/agenda-evento.component';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss'
})
export class InicioComponent {
  aceptaPoliticaDatosPersonales: boolean = false;
  pdfSrc = 'assets/terminos-condiciones/autorizacion-datos.pdf';
  constructor(
    private readonly router: Router,
    private readonly alertaServicio: AlertasServicio,
    private modalService: NgbModal

  ) {

  }

  navegarRuta(ruta: string) {

    if (ruta === '/congreso/ingreso-congreso') {
      this.router.navigate([ruta]);
    }
    else {
      this.alertaServicio.alertaOpcionesRegistro().then(opcionNavegacion => {
        if (opcionNavegacion !== undefined) {
          this.router.navigate([opcionNavegacion]);
        }
      });
    }

  }

  abrirModalEvaluacionPitch() {
    this.alertaServicio.alertaWarningPitch(
      {
        titulo: 'Evaluación Pitch - Recordatorio',
        texto: 'Si estas inscrito como invitado especial, podrás evaluar un emprendimiento, de lo contrario no será posible. ¿Deseas continuar? ',
        redireccionar: true,
        urlRedireccion: '/administracion/opciones/evaluar-pitch'
      }
    )
  }


  abrirModalAceptacionTratamientoDatos() {
    this.modalService.open(AceptacionTratamientoDatosComponent, { size: 'lg', centered: true });
  }

  abrirModalAgendaEvento() {
    this.modalService.open(AgendaEventoComponent, { size: 'lg', centered: true });
  }
}
