import { Routes } from '@angular/router';
import {LandingComponent} from "./landing/landing.component";
import {LoginComponent} from "./login/login.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";

export const routes: Routes = [
    { path: '', component: LandingComponent},
    { path: 'login', component: LoginComponent},
    { path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page
];
