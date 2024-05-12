import {Component} from '@angular/core';
import {ICellRendererAngularComp} from "ag-grid-angular";
import {ICellRendererParams} from 'ag-grid-community';

@Component({
  selector: 'app-cell-button',
  templateUrl: './cell-button.component.html',
  styleUrl: './cell-button.component.scss'
})
export class CellButtonComponent implements ICellRendererAngularComp {
  params: CellButtonParams = {};
  data: CellButtonParams = {};
  classStyle = "btn-primary"
  btnText?: string;

  agInit(params: ICellRendererParams<any, any, any>): void {
    this.params = params.value;
    this.data = params.data;
    this.btnText = this.params.text;
    this.calculateClassStyle();
  }

  refresh(params: ICellRendererParams<any, any, any>): boolean {
    return true;
  }

  onClick() {
    if (this.params.callback) {
      if (this.params.onClickText && this.params.onClickText.length > 0 ) {
        this.btnText = this.params.onClickText;
      }
      this.params.callback(this.data);
      setTimeout(() => this.btnText = this.params.text, 3000);
    }
  }

  private calculateClassStyle() {
    switch (this.params.type) {
      case CellButtonType.Primary:
        this.classStyle = "btn-primary"
        break;
      case CellButtonType.Secondary:
        this.classStyle = "btn-secondary"
        break;
      case CellButtonType.Success:
        this.classStyle = "btn-success"
        break;
      case CellButtonType.Warning:
        this.classStyle = "btn-warning"
        break;
      case CellButtonType.Danger:
        this.classStyle = "btn-danger"
        break;
    }
  }
}

export interface CellButtonParams {
  type?: CellButtonType,
  text?: string,
  onClickText?: string,
  tooltipText?: string,
  callback?: Function;
}

export enum CellButtonType {
  Primary, Secondary, Success, Warning, Danger
}
