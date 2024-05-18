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

  constructor(apiServ: ApiService, fb: FormBuilder, private activatedRoute: ActivatedRoute) {
    super(apiServ, fb)
  }

  ngOnInit(): void {
    this.accessToken = this.activatedRoute.snapshot.paramMap.get("access_token") as string;
    this.loadConfirmacionInfo(this.accessToken)
  }
}
