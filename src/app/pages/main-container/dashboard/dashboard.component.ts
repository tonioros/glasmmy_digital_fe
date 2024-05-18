import {Component, OnInit} from '@angular/core';
import {ColDef} from 'ag-grid-community';
import {ApiService} from "../../../services";
import {InvitacionModelResponse} from "../../../models/invitacion.model-response";
import {EstadosInvitacion} from "../../../models/constants";
import {environment} from "../../../../environments/environment";
import {Title} from "@angular/platform-browser";
import {CellButtonComponent, CellButtonParams, CellButtonType} from "../cell-button/cell-button.component";
import {ToastrService} from "ngx-toastr";

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
  activeFilter: EstadosInvitacion = EstadosInvitacion.TODOS;

  // Row Data: The data to be displayed.
  allData?: InvitacionModelResponse = {} as any;
  rowData?: InvitacionModelResponse = {} as any;
  sortColumns?: {
    column: string,
    sort: string
  }[];

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
      field: "total_personas_conf",
      headerName: "Total personas confirmadas",
      valueFormatter: p =>
        p.value || '--'
    },
    {
      field: "acompanantes",
      headerName: "Acompañantes",
      valueFormatter: p =>
        p.value || '--'
    },
    {
      field: "Link de Invitación",
      cellRendererSelector: (param: any) => (
        {
          component: CellButtonComponent,
          params: {
            value: {
              type: CellButtonType.Success,
              text: "Copiar📋",
              onClickText: "Copiado!✅",
              callback: this.copiarURLInvitacion.bind(this),
              tooltipText: "Copiar el link de la invitacion"
            } as CellButtonParams
          }
        }
      )
    },
    {
      field: "Borrar Invitado",
      cellRendererSelector: (param: any) => (
        {
          component: CellButtonComponent,
          params: {
            value: {
              type: CellButtonType.Danger,
              text: "Borrar",
              callback: this.deleteInvitado.bind(this),
            } as CellButtonParams
          }
        }
      )
    }
  ];
  protected readonly EstadosInvitacion = EstadosInvitacion;

  constructor(private apiServ: ApiService, private titleService: Title, private toast: ToastrService) {
    this.titleService.setTitle(environment.APP_NAME + " | Inicio")
  }

  ngOnInit(): void {
    this.loadInvitaciones();
  }

  private loadInvitaciones() {
    this.apiServ.invitacionesYConfirmaciones().subscribe({
      next: value => {
        this.allData = value[0];
        this.rowData = JSON.parse(JSON.stringify(value))[0];
        this.loadTotales();
      }
    })
  }

  copiarURLInvitacion(accessToken: any) {
    let url = this.allData?.base_url;
    url = `${url}?token=${accessToken.access_token}`
    navigator.clipboard.writeText(url);
    this.toast.info("Copiado!")
  }

  deleteInvitado(params: any) {
    const id = params.id;
    this.apiServ.deleteInvitado(id).subscribe(_ => {
      this.loadInvitaciones();
    });
  }

  onFilterChange(filterSelected: EstadosInvitacion = EstadosInvitacion.TODOS) {
    this.activeFilter = filterSelected;
    // @ts-ignore
    this.rowData.invitados = this.execFilters() || [];
  }

  onSortChanged($event: any) {
    // @ts-ignore
    this.sortColumns = Array.from($event.columns).map((value: any) => {
      return (value.sort) ? {
        column: value.colId,
        sort: value.sort
      } : undefined;
    });
  }

  exportInfo() {
    const filters: any = {
      invitacionId: this.rowData?.id
    };
    if (this.activeFilter != EstadosInvitacion.TODOS) {
      filters.estado = this.activeFilter;
    }
    this.apiServ.downloadExportInvitados(filters, this.sortColumns || []).subscribe(data => {
      const blob = new Blob([data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
      const downloadURL = window.URL.createObjectURL(data);
      const link = document.createElement('a');
      link.href = downloadURL;
      link.download = "invitados.xlsx";
      link.click();
    })
  }

  private execFilters(filter = this.activeFilter) {
    return this.allData?.invitados?.filter(v => {
      if (filter == EstadosInvitacion.CANCELADO) {
        return (v.confirmado == 0) // Cancelo
      } else if (filter == EstadosInvitacion.CONFIRMADO) {
        return (v.confirmado == 1)  // Confirmo
      } else if (filter == EstadosInvitacion.PENDIENTE) {
        return (v.confirmado == null)  // Null -> esta pendiente
      } else {
        return v;
      }
    });
  }

  private async loadTotales() {
    this.totalTodos = this.execFilters(EstadosInvitacion.TODOS)?.length;
    this.totalConfirmados = this.execFilters(EstadosInvitacion.CONFIRMADO)?.length;
    this.totalPendientes = this.execFilters(EstadosInvitacion.PENDIENTE)?.length;
    this.totalCancelados = this.execFilters(EstadosInvitacion.CANCELADO)?.length;
  }
}
