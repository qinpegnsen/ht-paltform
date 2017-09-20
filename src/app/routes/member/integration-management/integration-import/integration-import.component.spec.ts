import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntegrationImportComponent } from './integration-import.component';

describe('IntegrationImportComponent', () => {
  let component: IntegrationImportComponent;
  let fixture: ComponentFixture<IntegrationImportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntegrationImportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntegrationImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
