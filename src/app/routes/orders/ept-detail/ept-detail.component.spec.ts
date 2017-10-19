import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EptDetailComponent } from './ept-detail.component';

describe('EptDetailComponent', () => {
  let component: EptDetailComponent;
  let fixture: ComponentFixture<EptDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EptDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EptDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
