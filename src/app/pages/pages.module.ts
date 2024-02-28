import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginComponent} from "./login/login.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {LandingComponent} from "./landing/landing.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {NgIconsModule} from "@ng-icons/core";
import {matAutorenew} from "@ng-icons/material-icons/baseline"
import {RouterLink} from "@angular/router";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {AgGridAngular} from "ag-grid-angular";
@NgModule({
  declarations: [
    LoginComponent,
    PageNotFoundComponent,
    DashboardComponent,
    LandingComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    NgIconsModule.withIcons({
      matAutorenew,
    }),
    AgGridAngular,
  ]
})
export class PagesModule { }
