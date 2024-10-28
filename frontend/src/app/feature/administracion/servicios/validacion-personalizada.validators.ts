import { HttpClient } from "@angular/common/http";
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { catchError, debounceTime, map, Observable, of } from "rxjs";
import { InscritoInvitadoEspecialExisteRespuesta } from "../../../shared/interfaces/inscripcion-congreso.interface";
import { environment } from "../../../../environments/environment";

export class CustomValidators {
    constructor(private http: HttpClient) { }

    static emailValidator(http: HttpClient): AsyncValidatorFn {
        return (control: AbstractControl): Observable<ValidationErrors | null> => {
            if (!control.value) {
                return of(null);
            }   

            return http.get<InscritoInvitadoEspecialExisteRespuesta>(`${environment.urlBaseCongresoEmprendimiento}/inscripcionEvento/verificarInscripcionEvento/${control.value}`)
            .pipe(
              debounceTime(300),
              map((respuesta: InscritoInvitadoEspecialExisteRespuesta) => {
                return respuesta.data ?  null : { correoNoExiste: true };
              }),
              catchError(() => of(null)) 
            );
        };
    }
}