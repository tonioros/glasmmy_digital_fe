import {RouterModule, Routes} from '@angular/router';
import {LandingComponent} from "./pages/landing/landing.component";
import {LoginComponent} from "./pages/login/login.component";
import {DashboardComponent} from "./pages/main-container/dashboard/dashboard.component";
import {CanActivateAuthGuard} from "./services/security/guard-route";
import {NgModule} from "@angular/core";
import {MainContainerComponent} from "./pages/main-container/main-container.component";
import {AddInvitadoComponent} from "./pages/main-container/add-invitado/add-invitado.component";
import {ConfirmacionFormComponent} from "./pages/forms-confirmacion/confirmacion-form/confirmacion-form.component";
import {
    ConfirmacionCuadradoComponent
} from "./pages/forms-confirmacion/confirmacion-cuadrado/confirmacion-cuadrado.component";
import {LoginAdminComponent} from "./pages/login-admin/login-admin.component";

export const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'confirmacion-form/:access_token', component: ConfirmacionFormComponent},
    {path: 'confirmacion-quad/:access_token', component: ConfirmacionCuadradoComponent},
    {
        path: 'us', component: MainContainerComponent, canActivate: [CanActivateAuthGuard],
        children: [
            {path: 'dashboard', component: DashboardComponent},
            {path: 'agregar-inv/:invitacionid', component: AddInvitadoComponent},
        ]
    },
    {path: '',   redirectTo: '/login', pathMatch: 'full' },
    {path: 'login-admin', component: LoginAdminComponent},
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
