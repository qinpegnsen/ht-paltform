import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {PlatformDetailComponent} from './platform-detail.component';

describe('PlatformDetailComponent', () => {
  let component: PlatformDetailComponent;
  let fixture: ComponentFixture<PlatformDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlatformDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlatformDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
