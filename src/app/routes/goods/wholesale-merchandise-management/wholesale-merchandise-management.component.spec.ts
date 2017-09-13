import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WholesaleMerchandiseManagementComponent } from './wholesale-merchandise-management.component';

describe('WholesaleMerchandiseManagementComponent', () => {
  let component: WholesaleMerchandiseManagementComponent;
  let fixture: ComponentFixture<WholesaleMerchandiseManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WholesaleMerchandiseManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WholesaleMerchandiseManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
