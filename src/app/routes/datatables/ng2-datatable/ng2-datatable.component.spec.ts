import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ng2DatatableComponent } from './ng2-datatable.component';

describe('Ng2DatatableComponent', () => {
  let component: Ng2DatatableComponent;
  let fixture: ComponentFixture<Ng2DatatableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ng2DatatableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ng2DatatableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
