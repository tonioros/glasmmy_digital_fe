import {RouterModule, Routes} from '@angular/router';
import {LandingComponent} from "./pages/landing/landing.component";
import {LoginComponent} from "./pages/login/login.component";
import {PageNotFoundComponent} from "./pages/page-not-found/page-not-found.component";
import {DashboardComponent} from "./pages/dashboard/dashboard.component";
import {CanActivateAuthGuard} from "./services/security/guard-route";
import {NgModule} from "@angular/core";

export const routes: Routes = [
    {path: '', component: LandingComponent},
    {path: 'login', component: LoginComponent},
    {path: 'dashboard', component: DashboardComponent, canActivate: [CanActivateAuthGuard]},
    {path: '**', component: PageNotFoundComponent},  // Wildcard route for a 404 page
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
