import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './feature/inicio/inicio.component';

const routes: Routes = [
    {
        path: '',
        component: InicioComponent
    },
    {
        path: 'congreso',
        loadChildren: () =>
            import('./feature/congreso/congreso.module').then((mod) => mod.CongresoModule),
    },
    {
        path: 'administracion',
        loadChildren: () =>
            import('./feature/administracion/administracion.module').then((mod) => mod.AdministracionModule),
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule],
})
export class AppRoutingModule { }