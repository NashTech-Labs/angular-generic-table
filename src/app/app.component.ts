import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { PaginationObject } from './data-table/data-table.component';
import { AppServiceService, studentsData } from './service/app-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title ='Angular-generic-table';
  public pageLimitOptions = [ { value: 5 }, { value: 10 }, { value: 15 }, { value: 20 } ];
  page: PaginationObject = {
		limit: 10,
		count: 0,
		offset: 0,
		sortBy: '',
		sortOrder: '',
		search: ''
	};
  ColumnMode = ColumnMode.force;
  studentData: studentsData[] ;
  columnConfig :ColumnConfigModel[] = [
    {name:'Student Image' , prop:'image', sortable: false , alternate:'-', type:'image', bold:true , showTooltip:true ,tooltipText:"Student" },
		{ name: 'Student RollNo', prop: 'rollNo', sortable: false, alternate: '-', type: 'text' , showTooltip:true ,tooltipText:""},
		{ name: 'Student Name', prop: 'name', sortable: false, alternate: '-', type: 'text', showTooltip:true, tooltipText:"" },
		{ name: 'Student Age', prop: 'age', sortable: false, alternate: '-', type: 'text', showTooltip:true ,tooltipText:"" },
		{ name: 'Status', prop: 'status', sortable: false, alternate: '-', type: 'toggle' },
    { name : '' , prop: '', sortable:false , alternate:'-',type:'button',buttons:[{value:'remove' , label:'remove'},{value:'edit',label:'edit'}]}
	];

  constructor(private appService: AppServiceService , public matSnacker:MatSnackBar) {}

  ngOnInit():void {
    this.appService.getStudentsDataWithOutImage().subscribe( res=>{
      this.studentData = res.data.data;
      this.page.count = res.data.data.length;
    })
  }

  toggleChange(event){
    console.log(event);
    this.matSnacker.open(`Status changed for student ${event.row.name}`,"", {duration:2000})

  }

  setPage(event){
    this.matSnacker.open('setPage called ',"",{duration:2000});

  }

  limitChange(event){

    this.matSnacker.open('You can change the limit of table  ',"",{duration:2000});

  }

  onActivate(event){
    this.matSnacker.open(`Row clicked  for ${event.name}`,"",{duration:2000});
  }

  buttonClick(event){
    if(event.value=="remove")
    {
      this.matSnacker.open(`You can remove ${event.row.name}`,"", {duration:2000});
    } else if(event.value == 'edit')
    {
       this.matSnacker.open(`You can edit ${event.row.name}`,"", {duration:2000});

    }
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
