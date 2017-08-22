import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KindManageComponent } from './kind-manage.component';

describe('KindManageComponent', () => {
  let component: KindManageComponent;
  let fixture: ComponentFixture<KindManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KindManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KindManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
