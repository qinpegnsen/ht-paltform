import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRedPackageComponent } from './add-red-package.component';

describe('AddRedPackageComponent', () => {
  let component: AddRedPackageComponent;
  let fixture: ComponentFixture<AddRedPackageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRedPackageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRedPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
