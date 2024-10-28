import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment";
import { LoginRespuesta } from "../../../shared/interfaces/login.interface";
import { catchError, map, Observable, of } from "rxjs";
import { Institucion, InstitucionCreadaRespuesta, InstitucionRespuesta } from "../../../shared/interfaces/institucion.interface";
import { PaisRespuesta } from "../../../shared/interfaces/pais.interface";
import { RespuestaEmprendimiento } from "../../../shared/interfaces/emprendimiento.interface";
import { Evaluador, EvaluadorCreadoRespuesta, EvaluadorRespuesta } from "../../../shared/interfaces/evaluador.interface";
import { AsignacionEmprendimientoEvaluador, AsignacionEmprendimientoEvaluadorCreadoRespuesta, EmprendimientoAsignadoEvaluadorRespuesta } from "../../../shared/interfaces/asignacion-emprendimiento-evaluador.interface";
import { InscripcionCongreso, InscripcionCongresoCreadoRespuesta, InscripcionCongresoRespuesta, InscritoInvitadoEspecialExisteRespuesta } from "../../../shared/interfaces/inscripcion-congreso.interface";
import { EvaluacionEmprendimiento, EvaluacionEmprendimientoCreadaRespuesta } from "../../../shared/interfaces/evaluacion-emprendimiento.interface";
import { EvaluacionPitch, RespuestaEvlauacionPitchCreada, RespuestaResultadoEvaluacionEmprendimiento, ResultadoEvaluacionEmprendimiento } from "../../../shared/interfaces/evaluacion-emprendimiento-resultado.interface";
import { RespuestaResultadoEmprendimientoPitch } from "../../../shared/interfaces/resultado-emprendimiento-pitch.interface";

@Injectable()
export class AdministracionCongresoServicio {
    constructor(protected httpServicio: HttpClient) {
    }

    iniciarSesion(correoElectronico: string, documentoIdentidad: string, rutaAutenticacion: string): Observable<LoginRespuesta> {
        return this.httpServicio.get<LoginRespuesta>
            (`${environment.urlBaseCongresoEmprendimiento}/${rutaAutenticacion}/${documentoIdentidad}/${correoElectronico}`)
    }

    obtenerInstituciones(): Observable<InstitucionRespuesta> {
        return this.httpServicio.get<InstitucionRespuesta>(`${environment.urlBaseCongresoEmprendimiento}/institucionesEducativas/obtenerInstitucionesEducativas`)
    }

    obtenerPaises(): Observable<PaisRespuesta> {
        return this.httpServicio.get<PaisRespuesta>(`${environment.urlBaseCongresoEmprendimiento}/pais/obtener`)
    }

    crearInstitucion(institucion: Institucion): Observable<InstitucionCreadaRespuesta> {
        return this.httpServicio.post<InstitucionCreadaRespuesta>(`${environment.urlBaseCongresoEmprendimiento}/institucionesEducativas/crear`,
            institucion);
    }

    obtenerEmprendimientos(): Observable<RespuestaEmprendimiento> {
        return this.httpServicio.get<RespuestaEmprendimiento>(`${environment.urlBaseCongresoEmprendimiento}/informacionEmprendimiento/obtener`)
    }

    obtenerInstitucionesPorPais(idPais: string): Observable<InstitucionRespuesta> {
        return this.httpServicio.get<InstitucionRespuesta>(
            `${environment.urlBaseCongresoEmprendimiento}/institucionesEducativas/obtenerIESPorPais/${idPais}`)
    }

    crearEvaluador(evaluador: Evaluador): Observable<EvaluadorCreadoRespuesta> {
        return this.httpServicio.post<EvaluadorCreadoRespuesta>(`${environment.urlBaseCongresoEmprendimiento}/evaluador/crear`,
            evaluador);
    }

    obtenerEvaluadores(): Observable<EvaluadorRespuesta> {
        return this.httpServicio.get<EvaluadorRespuesta>(`${environment.urlBaseCongresoEmprendimiento}/evaluador/obtener`)
    }

    crearAsignacionEvaluadorEmprendimientos(asignacion: AsignacionEmprendimientoEvaluador): Observable<AsignacionEmprendimientoEvaluadorCreadoRespuesta> {
        return this.httpServicio.post<AsignacionEmprendimientoEvaluadorCreadoRespuesta>(`${environment.urlBaseCongresoEmprendimiento}/asignarEvaluador/crear`,
            asignacion);
    }

    obtenerEmprendimientosNoAsociadosPorIdEvaluador(idEvaluador: string): Observable<RespuestaEmprendimiento> {
        return this.httpServicio.get<RespuestaEmprendimiento>(`${environment.urlBaseCongresoEmprendimiento}/evaluador/listarProyectosNoAsociados/${idEvaluador}`)
    }

    obtenerInscritosCongreso(): Observable<InscripcionCongresoRespuesta> {
        return this.httpServicio.get<InscripcionCongresoRespuesta>(`${environment.urlBaseCongresoEmprendimiento}/inscripcionEvento/obtener`)
    }

    obtenerEmprendimientosAsignadosPorIdEvaluador(idEvaluador: string): Observable<EmprendimientoAsignadoEvaluadorRespuesta> {
        return this.httpServicio.get<EmprendimientoAsignadoEvaluadorRespuesta>(`${environment.urlBaseCongresoEmprendimiento}/asignarEvaluador/obtenerPorIdEvaluador/${idEvaluador}`);
    }

    registrarEvaluacion(evaluacionEmprendimiento: EvaluacionEmprendimiento): Observable<EvaluacionEmprendimientoCreadaRespuesta> {
        return this.httpServicio.post<EvaluacionEmprendimientoCreadaRespuesta>(`${environment.urlBaseCongresoEmprendimiento}/evaluacionProyectos/crear`,
            evaluacionEmprendimiento);
    }

    exportarEmprendimientos() {
        return this.httpServicio.get(`${environment.urlBaseCongresoEmprendimiento}/excelService/obtenerEmprendimientos`, { responseType: 'text' });
    }

    exportarEvaluadores() {
        return this.httpServicio.get(`${environment.urlBaseCongresoEmprendimiento}/excelService/obtenerEvaluadores`, { responseType: 'text' });
    }

    exportarInscritosCongreso() {
        return this.httpServicio.get(`${environment.urlBaseCongresoEmprendimiento}/excelService/obtenerInscritosEvento`, { responseType: 'text' });
    }

    exportarUniversidades() {
        return this.httpServicio.get(`${environment.urlBaseCongresoEmprendimiento}/excelService/obtenerUniversidades`, { responseType: 'text' });
    }

    obtenerEmprendimientosEvaluados(): Observable<RespuestaResultadoEvaluacionEmprendimiento> {
        return this.httpServicio.get<RespuestaResultadoEvaluacionEmprendimiento>(`${environment.urlBaseCongresoEmprendimiento}/evaluacionProyectos/listarProyectosEvaluados`);
    }

    obtenerEmprendimientosPitch(): Observable<RespuestaResultadoEvaluacionEmprendimiento> {
        return this.httpServicio.get<RespuestaResultadoEvaluacionEmprendimiento>(`${environment.urlBaseCongresoEmprendimiento}/etapaPitch/obtener`);
    }

    crearEmprendimientosPasanAPitch(emprendimientos: ResultadoEvaluacionEmprendimiento[]) {
        return this.httpServicio.post<RespuestaResultadoEvaluacionEmprendimiento>(`${environment.urlBaseCongresoEmprendimiento}/etapaPitch/crearEnBloque`,
            emprendimientos);
    }

    obtenerInvitadoEspecial(correo: string): Observable<InscripcionCongresoCreadoRespuesta> {
        return this.httpServicio.get<InscripcionCongresoCreadoRespuesta>(
            `${environment.urlBaseCongresoEmprendimiento}/inscripcionEvento/verificarInscripcionEvento/${correo}`);
    }

    registrarEvaluacionPitch(evaluacionPitch: EvaluacionPitch) {
        return this.httpServicio.post<RespuestaEvlauacionPitchCreada>(`${environment.urlBaseCongresoEmprendimiento}/evaluacionEtapaPitch/crear`, evaluacionPitch);
    }

    obtenerResultadosEvaluacionPitch(): Observable<RespuestaResultadoEmprendimientoPitch> {
        return this.httpServicio.get<RespuestaResultadoEmprendimientoPitch>(
            `${environment.urlBaseCongresoEmprendimiento}/evaluacionEtapaPitch/resultadosPitch`);
    }
}