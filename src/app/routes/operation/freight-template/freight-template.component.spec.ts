import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FreightTemplateComponent } from './freight-template.component';

describe('FreightTemplateComponent', () => {
  let component: FreightTemplateComponent;
  let fixture: ComponentFixture<FreightTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FreightTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FreightTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
