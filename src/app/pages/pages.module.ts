import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from "./login/login.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {LandingComponent} from "./landing/landing.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {NgIconsModule} from "@ng-icons/core";
import {
  matAutorenew,
  matClose,
  matDoubleArrow,
  matKeyboardDoubleArrowLeft,
  matMenu
} from "@ng-icons/material-icons/baseline"
import {RouterLink, RouterOutlet} from "@angular/router";
import {DashboardComponent} from "./main-container/dashboard/dashboard.component";
import {AgGridAngular} from "ag-grid-angular";
import {MainContainerComponent} from "./main-container/main-container.component";
import {MenuComponent} from "./menu/menu.component";

@NgModule({
  declarations: [
    LoginComponent,
    PageNotFoundComponent,
    DashboardComponent,
    LandingComponent,
    MainContainerComponent,
    MenuComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    NgIconsModule.withIcons({
      matAutorenew,
      matMenu,
      matDoubleArrow,
      matClose,
      matKeyboardDoubleArrowLeft
    }),
    AgGridAngular,
    RouterOutlet,
  ]
})
export class PagesModule { }
