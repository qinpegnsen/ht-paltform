import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationpageComponent } from './operationpage.component';

describe('OperationpageComponent', () => {
  let component: OperationpageComponent;
  let fixture: ComponentFixture<OperationpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperationpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
