import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-agenda-evento',
  templateUrl: './agenda-evento.component.html',
  styleUrl: './agenda-evento.component.scss'
})
export class AgendaEventoComponent {
  pdfSrc = 'assets/agenda-evento/agenda.pdf';
  rotacion = 360; 
  constructor(
    public activeModal: NgbActiveModal) { }

  close() {
    this.activeModal.dismiss();
  }
}
