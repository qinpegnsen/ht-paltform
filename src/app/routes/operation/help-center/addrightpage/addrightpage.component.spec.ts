import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddrightpageComponent } from './addrightpage.component';

describe('AddrightpageComponent', () => {
  let component: AddrightpageComponent;
  let fixture: ComponentFixture<AddrightpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddrightpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddrightpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
