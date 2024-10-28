import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio-administracion',
  templateUrl: './inicio-administracion.component.html',
  styleUrl: './inicio-administracion.component.scss'
})
export class InicioAdministracionComponent implements OnInit {
  active = 'top';
  perfilEsAdministrador: boolean = false;

  constructor(private route: Router) {
  }
  ngOnInit(): void {
    const jsonAutenticado = localStorage.getItem('user')!.toString();
    let usuarioAutenticadoJson = JSON.parse(jsonAutenticado);
    if (usuarioAutenticadoJson.perfil === 'Administrador') {
      this.perfilEsAdministrador = true;
    }
  }

  navegarRuta(ruta: string) {
    this.route.navigate([ruta]);
  }

}
