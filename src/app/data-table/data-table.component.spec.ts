import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { DataTableComponent } from './data-table.component';

describe('DataTableComponent', () => {
  let component: DataTableComponent;
  let fixture: ComponentFixture<DataTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataTableComponent ],
      imports:[NgxDatatableModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataTableComponent);
    component = fixture.componentInstance;

  });

 it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit row on row click event for success event', () => {
    spyOn(component.rowClick, 'emit');
    component.onRowClick({ actionId:"id", actionName:"name"},true)
    expect(component.rowClick.emit).toHaveBeenCalledWith({ actionId:"id", actionName:"name"})
  });

  it('should emit row on row click event not called', () => {
    spyOn(component.rowClick, 'emit');
    component.onRowClick({ actionId:"id", actionName:"name"},false)
    expect(component.rowClick.emit).not.toHaveBeenCalled()
  });

  it('should call handleButtons and emit button row on row click event for success event', () => {
    let event = {
      type:'click'
    };
    let row ={
      actionId:"id", actionName:"name"
    }
    spyOn(component.buttonClick, 'emit');
    component.handleButtons(event,row,0,"")
    expect(component.buttonClick.emit).toHaveBeenCalled();
  });

  it('should call handleButtons and emit button row on row not click event for failure event', () => {
    let event = {
      type:'change'
    };
    spyOn(component.buttonClick, 'emit');
    component.handleButtons(event,{ actionId:"id", actionName:"name"},0,"")
    expect(component.buttonClick.emit).not.toHaveBeenCalled();
  });

  it('should emit limit event for page  when limit changes', () => {
    spyOn(component.limitChange, 'emit');
    component.handleLimitChange({ actionId:"id", actionName:"name"})
    expect(component.limitChange.emit).toHaveBeenCalledWith({ actionId:"id", actionName:"name"})
  });

  it('should emit limit event for page  when limit changes', () => {
    spyOn(component.limitChange, 'emit');
    component.handleLimitChange({ actionId:"id", actionName:"name"})
    expect(component.limitChange.emit).toHaveBeenCalledWith({ actionId:"id", actionName:"name"})
  });

  it('should emit page event for page  when page number changes ', () => {
    spyOn(component.pageChange, 'emit');
    component.handlePageChange({ count: 1, pageSize: 10, limit: 10, offset: 2 })
    expect(component.pageChange.emit).toHaveBeenCalledWith({ count: 1, pageSize: 10, limit: 10, offset: 2 })
  });

  it('should call clickStopper in order to stop click navigation to go further to parent when child click triggers event ', () => {
    let event = new Event("click", {
      bubbles: true,
      cancelable: true,
    });
    spyOn(event, 'stopPropagation');
    component.clickStopper(event);
    expect(event.stopPropagation).toHaveBeenCalled();
  });

  it('should emit toggle event for page  when page toggle event changes ', () => {
    const event = {checked: true}
    spyOn(component.toggleChange, 'emit');
    component.handleToggle(event,0,{ actionId:"id", actionName:"name"})
    expect(component.toggleChange.emit).toHaveBeenCalledWith({ checked: event['checked'], index: 0, row: { actionId:"id", actionName:"name"} })
  });

});
