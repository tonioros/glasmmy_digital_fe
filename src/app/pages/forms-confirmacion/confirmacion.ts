import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../../services";
import {InvitadoModelRespose} from "../../models/invitado.model-respose";

export abstract class Confirmacion {
  formGroup = new FormGroup({});
  isLoading = false;
  protected accessToken: string = '';

  protected constructor(private apiServ: ApiService, private fb: FormBuilder) {
  }

  protected _invitacionConfimacion?: InvitadoModelRespose;

  get invitacionConfimacion() {
    return this._invitacionConfimacion;
  }

  get acompanantesList() {
    return Object.keys(this.formGroup.value).filter(value => value.includes("acompanante-"));
  }

  get cantAsistir() {
    return this.formGroup.get('cant_asistir')?.value || 0
  }

  validators(formControlName: string): any {
    return this.formGroup.get(formControlName)?.errors
  }

  saveConfirmacion() {
    this.isLoading = true;
    if (this.formGroup?.valid) {
      const values: any = {
        invitado_nombre: this.formGroup?.get("nombre")?.value,
        total_personas_conf: this.formGroup?.get("cant_asistir")?.value,
        invitado_id: this.invitacionConfimacion?.id,
        invitacion_id: this.invitacionConfimacion?.invitacion.id,
        confirmado: true,
        fecha_confirmacion: new Date().getTime(),
      }

      if (this.formGroup.get('checkBAgregarNombres')?.value) {
        const nombreInvitadosList = this.acompanantesList.map(controlNames => (this.formGroup.get(controlNames)?.value as string).trim());
        const nombreInvitadosText = nombreInvitadosList.reduce((prev, current) => prev + current + ",", "") as string;
        values['acompanantes'] = nombreInvitadosText.substring(0, nombreInvitadosText.length - 1)
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
      this.isLoading = false
      console.log('errors', this.formGroup.errors, this.formGroup?.valid)
    }
  }

  addAcompanante(posicion: number = 1) {
    // @ts-ignore
    if (posicion <= this.cantAsistir) {
      this.formGroup.addControl(`acompanante-${posicion}`, new FormControl(null));
    }
  }

  removeAcompanante() {
    const lastPosition = this.acompanantesList.length;
    const acompanante = `acompanante-${lastPosition}`;
    this.formGroup.removeControl(acompanante);
    if (this.acompanantesList.length == 0) {
      // @ts-ignore
      this.formGroup.get("checkBAgregarNombres")?.setValue(false)
    }
  }

  protected loadConfirmacionInfo(accessToken: string) {
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

  protected buildFormGroup() {
    const controls: any = {
      "cant_asistir": [this.invitacionConfimacion?.cantidad_invitados, [
        Validators.required,
        Validators.min(1),
        Validators.max(this.invitacionConfimacion?.cantidad_invitados as number)
      ]],
      checkBAgregarNombres: [false],
    };
    if (!this.invitacionConfimacion?.nombre) {
      controls['nombre'] = ["", [Validators.required,]];
    }
    this.formGroup = this.fb.group(controls);
    this.formGroup.get("checkBAgregarNombres")?.valueChanges.subscribe((v: boolean) => {
      if (v) {
        this.addAcompanante(1);
      }
    })
  }

}
