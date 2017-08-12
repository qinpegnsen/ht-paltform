/* tslint:disable:no-unused-variable */

import {TestBed, async, inject} from '@angular/core/testing';

import {UserblockComponent} from './userblock.component';
import {UserblockService} from './userblock.service';
import {SettingsService} from '../../../core/settings/settings.service';

describe('Component: Userblock', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserblockService, SettingsService]
    }).compileComponents();
  });

  it('should create an instance', async(inject([UserblockService, SettingsService], (userBlockService, settingsService) => {
    let component = new UserblockComponent(userBlockService, settingsService);
    expect(component).toBeTruthy();
  })));
});
