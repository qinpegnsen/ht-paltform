import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SysNoticeComponent } from './sys-notice.component';

describe('SysNoticeComponent', () => {
  let component: SysNoticeComponent;
  let fixture: ComponentFixture<SysNoticeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SysNoticeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SysNoticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
