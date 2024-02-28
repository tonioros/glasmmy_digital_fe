import {Component, OnInit} from '@angular/core';
import {ColDef} from 'ag-grid-community';
import {ApiService} from "../../services";
import {InvitacionModelResponse} from "../../models/invitacion.model-response";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  // Row Data: The data to be displayed.
  rowData: InvitacionModelResponse[] = [];
  // Column Definitions: Defines the columns to be displayed.
  colDefs: ColDef[] = [
    {
      headerName: "Nombre",
      field: "nombre",
      valueFormatter: p => p.value || "--No Asignado--"
    },
    {field: "cantidad_invitados", headerName: "Cantidad de Invitados"},
    {
      headerName: "Mesa Asignada",
      field: "mesa_asignada",
      valueFormatter: p => p.value || "--No Asignada--"
    },
    {
      headerName: "Ya Confirmo?",
      field: "confirmado",
      valueFormatter: p => p.value == 0 ? 'No' : 'Si'
    },
    {
      field: "fecha_confirmacion",
      headerName: "Fecha de confirmacion",
      valueFormatter: p =>
        p.value ? new Date(p.value).toLocaleDateString("es-GT") : '--No ha confirmado--'
    },
    {field: "total_personas_conf", headerName: "Total personas confirmadas"},
  ];

  constructor(private apiServ: ApiService) {
  }

  ngOnInit(): void {
    this.loadInvitaciones();
  }

  private loadInvitaciones() {
    this.apiServ.invitacionesYConfirmaciones().subscribe({
      next: value => {
        console.log('value', value);
        this.rowData = value;
      }
    })
  }
}
