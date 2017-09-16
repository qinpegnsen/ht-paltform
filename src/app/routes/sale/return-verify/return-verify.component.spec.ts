import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnVerifyComponent } from './return-verify.component';

describe('ReturnVerifyComponent', () => {
  let component: ReturnVerifyComponent;
  let fixture: ComponentFixture<ReturnVerifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReturnVerifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
