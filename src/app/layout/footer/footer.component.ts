import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../core/settings/settings.service';
import {AjaxService} from "../../core/services/ajax.service";

@Component({
    selector: '[app-footer]',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

    constructor(public settings: SettingsService,
                public ajax: AjaxService
    ) { }

    ngOnInit() {
      this.getAppName()
    }

  getAppName() {
    let me = this;
    me.ajax.get({
      url: '/datadict/loadInfoByCode',
      data: {code:'plat_system_name'},
      success: (res) => {
        if (res.success) {
          //console.log("█ res.data ►►►",  res.data);
          me.settings.app.name = res.data;
        }
      }
    })
  }
}
