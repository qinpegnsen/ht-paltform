import { Component, OnInit } from '@angular/core';
import {WoManageComponent} from "../wo-manage/wo-manage.component";
import {BsDatepickerConfig} from "ngx-bootstrap/datepicker";
import {defineLocale} from "ngx-bootstrap/bs-moment";
import {zhCn} from "ngx-bootstrap/locale";
defineLocale('cn', zhCn);

@Component({
  selector: 'app-wo-finished',
  templateUrl: './wo-finished.component.html',
  styleUrls: ['./wo-finished.component.scss']
})
export class WoFinishedComponent implements OnInit {

  bsConfig: Partial<BsDatepickerConfig>;
  constructor(private parentComp: WoManageComponent) {
    this.bsConfig = Object.assign({}, {
      locale: 'cn',
      containerClass: 'theme-blue'
    });
    this.parentComp.woType = 6
  }

  ngOnInit() {
    let me = this;
  }

}
