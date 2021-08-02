import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent {
  @ViewChild(DatatableComponent, { static: false }) myTable: DatatableComponent;
  @ViewChild("search", { static: false }) search: any;
  @Input() dataTableClass = "material";
  @Input() ColumnMode = ColumnMode.force;
  @Input() rows = [];
  @Input() headerHeight = 32;
  @Input() rowHeight = 56;
  @Input() footerHeight = "auto";
  @Input() page: PaginationObject = {
    limit: 10,
    count: 0,
    offset: 0,
    sortBy: "",
    sortOrder: "",
    search: "",
  };
  @Input() columnConfigs: ColumnConfigModel[]=[];
  @Input() pageLimitOptions = [
    { value: 5 },
    { value: 10 },
    { value: 15 },
    { value: 20 },
  ];
  @Output() rowClick = new EventEmitter<any>();
  @Output() pageChange = new EventEmitter<any>();
  @Output() limitChange = new EventEmitter<any>();
  @Output() toggleChange = new EventEmitter<{
    checked: boolean;
    index: number;
    row: any;
  }>();
  @Output() buttonClick = new EventEmitter<{
    event: any;
    row: any;
    index: number;
    value: string;
  }>();
  @Input() externalPagination = true;
  @Input() showFooter = true;

  onRowClick(event: any, navigate: any) {
    if (navigate) {
      this.rowClick.emit(event);
    }
  }

  clickStopper(event: { stopPropagation: () => void; }) {
    event.stopPropagation();
  }

  handleButtons(event: { type: string; }, row: any, index: number, value: any) {
    if (event.type == "click") {
      this.buttonClick.emit({ event, row, index, value });
    }
  }

  handleToggle(event: { checked: any; }, index: number, row: any ) {
    this.toggleChange.emit({ checked: event.checked, index: index, row: row });
  }

  handlePageChange(pageInfo: {
    count?: number;
    pageSize?: number;
    limit?: number;
    offset?: number;
  }) {
    this.pageChange.emit(pageInfo);
  }

  handleLimitChange(event) {
    this.limitChange.emit(event);
  }
}

export interface ColumnConfigModel {
  prop: string;
  name: string;
  sortable: boolean;
  alternate: string;
  type: "text" | "button" | "toggle" | "image";
  buttons?: { value: string; label: string }[];
  bold?: boolean;
  cellClass?: string
  style?: boolean,
  showTooltip?: boolean,
  tooltipText?: string,
  flexGrow?: any,
  width?: number,
  image?: string,
}

export interface PaginationObject {
  limit: number,
  count: number,
  offset: number,
  sortBy: string,
  sortOrder: string,
  search: string
}
