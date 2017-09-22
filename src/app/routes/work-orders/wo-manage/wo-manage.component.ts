import { Component, OnInit } from '@angular/core';
import {BsDatepickerConfig} from "ngx-bootstrap/datepicker";
import {defineLocale} from "ngx-bootstrap/bs-moment";
import {zhCn} from "ngx-bootstrap/locale";
defineLocale('cn', zhCn);

@Component({
  selector: 'app-wo-manage',
  templateUrl: './wo-manage.component.html',
  styleUrls: ['./wo-manage.component.scss']
})
export class WoManageComponent implements OnInit {
  public woType: number = 1;
  minDate: Date = new Date();
  maxDate: Date = new Date();
  bsConfig: Partial<BsDatepickerConfig>;

  constructor() {
    this.bsConfig = Object.assign({}, {
      locale: 'cn',
      // minDate: this.minDate.getDate() - 1,
      // maxDate: this.maxDate.getDate() + 7,
      containerClass: 'theme-blue',
      rangeInputFormat: 'YYYY/MM/DD'
    });
  }

  ngOnInit() {
  }

}
