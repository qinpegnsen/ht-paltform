import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpAssortmentComponent } from './help-assortment.component';

describe('HelpAssortmentComponent', () => {
  let component: HelpAssortmentComponent;
  let fixture: ComponentFixture<HelpAssortmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelpAssortmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpAssortmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
