import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageInformComponent } from './message-inform.component';

describe('MessageInformComponent', () => {
  let component: MessageInformComponent;
  let fixture: ComponentFixture<MessageInformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageInformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageInformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
