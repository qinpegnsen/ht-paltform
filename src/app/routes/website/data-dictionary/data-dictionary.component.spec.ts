import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataDictionaryComponent } from './data-dictionary.component';

describe('DataDictionaryComponent', () => {
  let component: DataDictionaryComponent;
  let fixture: ComponentFixture<DataDictionaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataDictionaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataDictionaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
