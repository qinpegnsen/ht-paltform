import {Component, OnInit} from '@angular/core';
import {UserblockService} from './userblock.service';
import {SettingsService} from '../../../core/settings/settings.service';

@Component({
  selector: 'app-userblock',
  templateUrl: './userblock.component.html',
  styleUrls: ['./userblock.component.scss']
})
export class UserblockComponent implements OnInit {
  user: any;

  constructor(public userblockService: UserblockService, private setting: SettingsService) {
    this.user = setting.user;
  }

  ngOnInit() {
  }

  userBlockIsVisible() {
    return this.userblockService.getVisibility();
  }

}
