import { Component, OnInit } from '@angular/core';
import {WoManageComponent} from "../wo-manage/wo-manage.component";
import {BsDatepickerConfig} from "ngx-bootstrap/datepicker";
import {defineLocale} from "ngx-bootstrap/bs-moment";
import {zhCn} from "ngx-bootstrap/locale";
defineLocale('cn', zhCn);

@Component({
  selector: 'app-wo-abnormal',
  templateUrl: './wo-abnormal.component.html',
  styleUrls: ['./wo-abnormal.component.scss']
})
export class WoAbnormalComponent implements OnInit {

  bsConfig: Partial<BsDatepickerConfig>;
  constructor(private parentComp: WoManageComponent) {

    this.bsConfig = Object.assign({}, {
      locale: 'cn',
      containerClass: 'theme-blue'
    });
    this.parentComp.woType = 7
  }

  ngOnInit() {
    let me = this;
  }

}
