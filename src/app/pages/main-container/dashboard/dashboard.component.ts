import {Component, OnInit} from '@angular/core';
import {ColDef} from 'ag-grid-community';
import {ApiService} from "../../../services";
import {InvitacionModelResponse} from "../../../models/invitacion.model-response";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  totalTodos?: number;
  totalConfirmados?: number;
  totalPendientes?: number;
  totalCancelados?: number;
  activeFilter: 'TO' | 'CONF' | 'PEND' | 'CANC' = "TO";

  // Row Data: The data to be displayed.
  allData?: InvitacionModelResponse;
  rowData?: InvitacionModelResponse = {} as any;
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
      headerName: "Estado de confirmacion",
      field: "confirmado",
      valueFormatter: p =>
        !!p.value ? (p.value == 0 ? 'Cancelo' : 'Confirmo') : 'Pendiente'
    },
    {
      field: "fecha_confirmacion",
      headerName: "Fecha de confirmacion",
      valueFormatter: p =>
        p.value ? new Date(p.value).toLocaleDateString("es-GT") : '--No ha confirmado--'
    },
    {
      field: "total_personas_conf", headerName: "Total personas confirmadas",
      valueFormatter: p =>
        p.value || '--'
    },
  ];

  constructor(private apiServ: ApiService) {
  }

  ngOnInit(): void {
    this.loadInvitaciones();
  }

  onFilterChange(filterSelected: 'TO' | 'CONF' | 'PEND' | 'CANC' = "TO") {
    this.activeFilter = filterSelected;
    // @ts-ignore
    this.rowData.invitados = this.execFilters();
  }

  private loadInvitaciones() {
    this.apiServ.invitacionesYConfirmaciones().subscribe({
      next: value => {
        this.allData = value[0];
        this.rowData = value[0];
        this.loadTotales();
      }
    })
  }

  private execFilters(filter = this.activeFilter) {
    return this.allData?.invitados.filter(v => {
      if (filter == "CANC") {
        return (v.confirmado == 0) // Cancelo
      } else if (filter == "CONF") {
        return (v.confirmado == 1)  // Confirmo
      } else if (filter == "PEND") {
        return (v.confirmado == null)  // Null -> esta pendiente
      } else {
        return v;
      }
    }) || [];
  }

  private async loadTotales() {
    this.totalTodos = this.execFilters("TO").length;
    this.totalConfirmados = this.execFilters("CONF").length;
    this.totalPendientes = this.execFilters("PEND").length;
    this.totalCancelados = this.execFilters("CANC").length;
  }
}
