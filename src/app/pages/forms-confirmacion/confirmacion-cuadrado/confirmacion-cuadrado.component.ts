import {Component, OnInit} from '@angular/core';
import {Confirmacion} from "../confirmacion";
import {ApiService} from "../../../services";
import {FormBuilder} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-confirmacion-cuadrado',
  templateUrl: './confirmacion-cuadrado.component.html',
  styleUrl: './confirmacion-cuadrado.component.scss'
})
export class ConfirmacionCuadradoComponent extends Confirmacion implements OnInit {
  private style: any;
  private cssFile: string = '';

  constructor(apiServ: ApiService, fb: FormBuilder, private activatedRoute: ActivatedRoute) {
    super(apiServ, fb)
  }

  ngOnInit(): void {
    this.accessToken = this.activatedRoute.snapshot.paramMap.get("access_token") as string;
    this.cssFile = this.activatedRoute.snapshot.queryParams['style'];
    console.log(this.cssFile)
    if (this.cssFile && this.cssFile != "") {
      this.cssFile = atob(this.cssFile)
      this.setTheme()
    }
    this.loadConfirmacionInfo(this.accessToken)
  }

  setTheme() {
    // Create a link element via Angular's renderer to avoid SSR troubles
    this.style = document.createElement('link') as HTMLLinkElement;
    // Set type of the link item and path to the css file
    this.style.rel = 'stylesheet';
    this.style.href = this.cssFile;
    // Add the style to the head section
    document.head.appendChild(this.style);
  }

}
