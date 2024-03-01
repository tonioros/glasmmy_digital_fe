import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../../services";

@Component({
  selector: 'app-add-invitado',
  templateUrl: './add-invitado.component.html',
  styleUrl: './add-invitado.component.scss'
})
export class AddInvitadoComponent implements OnInit {

  fg: FormGroup = new FormGroup<any>({});
  dateFormatter = Intl.DateTimeFormat('sv-SE');
  dateNow = new Date();
  private invitacionId?: number;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private apiService: ApiService, private router: Router) {
  }

  ngOnInit(): void {
    this.invitacionId = parseInt(this.route.snapshot.paramMap.get("invitacionid") as string);
    this.buildFormGroup();
    console.log(this.dateNow)
  }

  isValidValue(formControlName: string) {
    return (this.fg.get(formControlName)?.touched || this.fg.get(formControlName)?.dirty) && this.fg.get(formControlName)?.invalid;
  }

  onSubmit() {
    if (this.fg.valid) {
      const values = this.fg.value;
      this.apiService.addInvitado(values)
        .subscribe({
          next: value => {
            if (!isNaN(parseInt(value))) {
              this.router.navigate(["/us/dashboard"]);
            }
          },
          error: error => {
            console.error('error', error);
          }
        });
    } else {
      this.fg.get("nombre")?.markAsTouched();
      this.fg.get("cantidad_invitados")?.markAsTouched();
      this.fg.get("invitacion_id")?.markAsTouched();
      this.fg.get("mesa_asignada")?.markAsTouched();
      this.fg.get("fecha_limite_confirmo")?.markAsTouched();
    }
  }

  private buildFormGroup() {
    this.fg = this.fb.group({
      "nombre": [""],
      "cantidad_invitados": ["", [Validators.required, Validators.min(1)]],
      "invitacion_id": this.invitacionId,
      "mesa_asignada": ["", [Validators.required, Validators.min(1)]],
      "fecha_limite_confirmo": ["",],
    })
  }
}
