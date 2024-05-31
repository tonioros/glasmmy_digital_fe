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
  matContentCopy,
  matDoubleArrow,
  matKeyboardDoubleArrowLeft,
  matMenu,
} from "@ng-icons/material-icons/baseline"
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {DashboardComponent} from "./main-container/dashboard/dashboard.component";
import {AgGridAngular} from "ag-grid-angular";
import {MainContainerComponent} from "./main-container/main-container.component";
import {MenuComponent} from "./menu/menu.component";
import {AddInvitadoComponent} from "./main-container/add-invitado/add-invitado.component";
import {ConfirmacionFormComponent} from "./forms-confirmacion/confirmacion-form/confirmacion-form.component";
import {NgxSkeletonLoaderModule} from "ngx-skeleton-loader";
import {CellButtonComponent} from "./main-container/cell-button/cell-button.component";
import {NgDompurifyModule} from "@tinkoff/ng-dompurify";
import {SafeHTMLPipe} from "../pipes/safe-html.pipe";
import {
  ConfirmacionCuadradoComponent
} from "./forms-confirmacion/confirmacion-cuadrado/confirmacion-cuadrado.component";
import {LoginAdminComponent} from "./login-admin/login-admin.component";

@NgModule({
  declarations: [
    LoginComponent,
    PageNotFoundComponent,
    DashboardComponent,
    LandingComponent,
    MainContainerComponent,
    MenuComponent,
    AddInvitadoComponent,
    ConfirmacionFormComponent,
    ConfirmacionCuadradoComponent,
    LoginAdminComponent,
    CellButtonComponent
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
      matKeyboardDoubleArrowLeft,
      matContentCopy
    }),
    AgGridAngular,
    RouterOutlet,
    RouterLinkActive,
    NgxSkeletonLoaderModule,
    NgDompurifyModule,
    SafeHTMLPipe,
  ]
})
export class PagesModule {
}
