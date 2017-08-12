/* tslint:disable:no-unused-variable */
import {TestBed, async, inject} from '@angular/core/testing';
import {HeaderComponent} from './header.component';
import {UserblockService} from '../sidebar/userblock/userblock.service';
import {SettingsService} from '../../core/settings/settings.service';
import {MenuService} from '../../core/menu/menu.service';
import {Router} from '@angular/router';
import {AjaxService} from '../../core/services/ajax.service';

describe('Component: Header', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MenuService, UserblockService, SettingsService, AjaxService, Router]
    }).compileComponents();
  });

  it('should create an instance', async(inject([MenuService, UserblockService, SettingsService, AjaxService, Router], (menuService, userblockService, settingsService, ajaxService, router) => {
    let component = new HeaderComponent(menuService, userblockService, settingsService, ajaxService, router);
    expect(component).toBeTruthy();
  })));
});
