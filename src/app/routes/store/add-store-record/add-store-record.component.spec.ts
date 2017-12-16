import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStoreRecordComponent } from './add-store-record.component';

describe('AddStoreRecordComponent', () => {
  let component: AddStoreRecordComponent;
  let fixture: ComponentFixture<AddStoreRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddStoreRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStoreRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
