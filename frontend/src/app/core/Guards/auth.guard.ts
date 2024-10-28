import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AutenticacionServicio } from "../servicios/autenticacion.servicio";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private autenticacionServicio: AutenticacionServicio, private router: Router) { }

    canActivate(): boolean {
        if (this.autenticacionServicio.estaAutenticado()) {
            return true;
        } else {
            this.router.navigate(['/']);
            return false;
        }
    }
}