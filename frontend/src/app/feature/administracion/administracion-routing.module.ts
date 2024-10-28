import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./componentes/login/login.component";
import { NgModule } from "@angular/core";
import { InicioAdministracionComponent } from "./componentes/inicio-administracion/inicio-administracion.component";
import { AuthGuard } from "../../core/Guards/auth.guard";
import { RegistroInstitucionComponent } from "./componentes/registro-institucion/registro-institucion.component";
import { ListaInstitucionesComponent } from "./componentes/lista-instituciones/lista-instituciones.component";
import { ListaEmprendimientosComponent } from "./componentes/lista-emprendimientos/lista-emprendimientos.component";
import { RegistroEvaluadorComponent } from "./componentes/registro-evaluador/registro-evaluador.component";
import { ListaEvaluadoresComponent } from "./componentes/lista-evaluadores/lista-evaluadores.component";
import { AsignarEmprendimientoEvaluadorComponent } from "./componentes/asignar-emprendimiento-evaluador/asignar-emprendimiento-evaluador.component";
import { InscritosCongresoComponent } from "./componentes/inscritos-congreso/inscritos-congreso.component";
import { EvaluacionEmprendimientoComponent } from "./componentes/evaluacion-emprendimiento/evaluacion-emprendimiento.component";
import { EvaluacionResultadosComponent } from "./componentes/evaluacion-resultados/evaluacion-resultados.component";
import { ListaEmprendimientosPitchComponent } from "./componentes/lista-emprendimientos-pitch/lista-emprendimientos-pitch.component";
import { EvaluacionEmprendimientoPitchComponent } from "./componentes/evaluacion-emprendimiento-pitch/evaluacion-emprendimiento-pitch.component";
import { ResultadosEvaluacionPitchComponent } from "./componentes/resultados-evaluacion-pitch/resultados-evaluacion-pitch.component";

const routes: Routes = [
    {
        path: '',
        component: LoginComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'opciones',
        canActivate: [AuthGuard],
        component: InicioAdministracionComponent
    },
    {
        path: 'opciones/registro-institucion',
        canActivate: [AuthGuard],
        component: RegistroInstitucionComponent
    },
    {
        path: 'opciones/lista-instituciones',
        canActivate: [AuthGuard],
        component: ListaInstitucionesComponent
    },
    {
        path: 'opciones/lista-emprendimientos',
        canActivate: [AuthGuard],
        component: ListaEmprendimientosComponent
    },
    {
        path: 'opciones/registro-evaluador',
        canActivate: [AuthGuard],
        component: RegistroEvaluadorComponent
    },
    {
        path: 'opciones/lista-evaluadores',
        canActivate: [AuthGuard],
        component: ListaEvaluadoresComponent
    },
    {
        path: 'opciones/asignar-emprendimiento-evaluador',
        canActivate: [AuthGuard],
        component: AsignarEmprendimientoEvaluadorComponent
    },
    {
        path: 'opciones/inscritos-congreso',
        canActivate: [AuthGuard],
        component: InscritosCongresoComponent
    },
    {
        path: 'opciones/evaluacion-emprendimiento',
        canActivate: [AuthGuard],
        component: EvaluacionEmprendimientoComponent
    },
    {
        path: 'opciones/evaluacion-resultados',
        canActivate: [AuthGuard],
        component: EvaluacionResultadosComponent
    },
    {
        path: 'opciones/lista-emprendimientos-pitch',
        canActivate: [AuthGuard],
        component: ListaEmprendimientosPitchComponent
    },
    {
        path: 'opciones/evaluar-pitch',
        component: EvaluacionEmprendimientoPitchComponent
    },
    {
        path: 'opciones/resultados-pitch',
        canActivate: [AuthGuard],
        component: ResultadosEvaluacionPitchComponent
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AdministracionRoutingModule { }  