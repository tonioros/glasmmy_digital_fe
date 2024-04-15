import {RouterModule, Routes} from '@angular/router';
import {LandingComponent} from "./pages/landing/landing.component";
import {LoginComponent} from "./pages/login/login.component";
import {DashboardComponent} from "./pages/main-container/dashboard/dashboard.component";
import {CanActivateAuthGuard} from "./services/security/guard-route";
import {NgModule} from "@angular/core";
import {MainContainerComponent} from "./pages/main-container/main-container.component";
import {AddInvitadoComponent} from "./pages/main-container/add-invitado/add-invitado.component";
import {ConfirmacionFormComponent} from "./pages/confirmacion-form/confirmacion-form.component";

export const routes: Routes = [
    {path: '', component: LandingComponent},
    {path: 'login', component: LoginComponent},
    {path: 'confirmacion-form/:access_token', component: ConfirmacionFormComponent},
    {
        path: 'us', component: MainContainerComponent, canActivate: [CanActivateAuthGuard],
        children: [
            {path: 'dashboard', component: DashboardComponent},
            {path: 'agregar-inv/:invitacionid', component: AddInvitadoComponent},
        ]
    },
    {path: '**', component: LandingComponent},  // Wildcard route for a 404 page
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
