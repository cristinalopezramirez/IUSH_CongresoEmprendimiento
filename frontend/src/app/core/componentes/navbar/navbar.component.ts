import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AlertasServicio } from '../../servicios/alertas.servicio';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AceptacionTratamientoDatosComponent } from '../../../feature/congreso/componentes/aceptacion-tratamiento-datos/aceptacion-tratamiento-datos.component';
import { AgendaEventoComponent } from '../../../feature/congreso/componentes/agenda-evento/agenda-evento.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {

  constructor(
    private readonly route: Router,
    private readonly alertaServicio: AlertasServicio,
    private modalService: NgbModal
  ) {

  }

  navegarRuta(ruta: string) {
    if (ruta.length > 0) {
      this.route.navigate([ruta]);
    }
  }

  abrirModalAceptacionTratamientoDatos() {
    this.modalService.open(AceptacionTratamientoDatosComponent, { size: 'lg', centered: true });
  }

  abrirModalAgendaEvento() {
    this.modalService.open(AgendaEventoComponent, { size: 'lg', centered: true });
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
}
