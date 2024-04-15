import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../services";
import {ActivatedRoute} from "@angular/router";
import {InvitadoModelRespose} from "../../models/invitado.model-respose";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-confirmacion-form',
  templateUrl: './confirmacion-form.component.html',
  styleUrl: './confirmacion-form.component.scss'
})
export class ConfirmacionFormComponent implements OnInit {
  formGroup = new FormGroup({});
  private accessToken: string = '';

  constructor(private apiServ: ApiService, private activatedRoute: ActivatedRoute,
              private fb: FormBuilder) {
  }

  private _invitacionConfimacion?: InvitadoModelRespose;
  isLoading = false;

  get invitacionConfimacion() {
    return this._invitacionConfimacion;
  }

  ngOnInit(): void {
    this.accessToken = this.activatedRoute.snapshot.paramMap.get("access_token") as string;
    this.loadConfirmacionInfo(this.accessToken)
  }

  saveConfirmacion() {
    this.isLoading = true;
    if (this.formGroup?.valid) {
      const values = {
        invitado_nombre: this.formGroup?.get("nombre")?.value,
        total_personas_conf: this.formGroup?.get("cant_asistir")?.value,
        invitado_id: this.invitacionConfimacion?.id,
        invitacion_id: this.invitacionConfimacion?.invitacion.id,
        confirmado: true,
        fecha_confirmacion: new Date().getTime()
      }
      this.apiServ.confirmar(values).subscribe({
        next: response => {
          if (!isNaN(response)) {
            this._invitacionConfimacion = undefined;
            this.loadConfirmacionInfo(this.accessToken);
            this.isLoading = false
          }
        },
        error: err => {
          console.error(err)
        }
      })
      console.log(values)
    } else {
      this.formGroup?.get("nombre")?.markAsTouched();
      this.formGroup?.get("cantidad_invitados")?.markAsTouched();
    }
  }

  validators(formControlName: string): any {
    return this.formGroup.get(formControlName)?.errors
  }

  private loadConfirmacionInfo(accessToken: string) {
    this.apiServ.getInvitadoYConfirmacion(accessToken)
      .subscribe({
        next: invitacion => {
          this._invitacionConfimacion = invitacion
          this.buildFormGroup();
        },
        error: err => {
          // TODO: como lanzar un erro aca we?
          console.error(err)
        }
      });
  }

  private buildFormGroup() {
    const controls: any = {
      "cant_asistir": [this.invitacionConfimacion?.cantidad_invitados, [
        Validators.required,
        Validators.min(1),
        Validators.max(this.invitacionConfimacion?.cantidad_invitados as number)
      ]],
    };
    if (!this.invitacionConfimacion?.nombre) {
      controls['nombre'] = ["", [Validators.required,]];
    }
    this.formGroup = this.fb.group(controls);
  }

}
