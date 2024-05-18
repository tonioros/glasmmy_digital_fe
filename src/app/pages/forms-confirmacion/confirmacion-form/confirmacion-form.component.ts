import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../../services";
import {ActivatedRoute} from "@angular/router";
import {FormBuilder} from "@angular/forms";
import {Confirmacion} from "../confirmacion";

@Component({
  selector: 'app-confirmacion-form',
  templateUrl: './confirmacion-form.component.html',
  styleUrl: './confirmacion-form.component.scss'
})
export class ConfirmacionFormComponent extends Confirmacion implements OnInit {

  constructor(apiServ: ApiService, fb: FormBuilder, private activatedRoute: ActivatedRoute) {
    super(apiServ, fb)
  }

  ngOnInit(): void {
    this.accessToken = this.activatedRoute.snapshot.paramMap.get("access_token") as string;
    this.loadConfirmacionInfo(this.accessToken)
  }


}
