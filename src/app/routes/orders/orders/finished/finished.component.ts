import { Component, OnInit } from '@angular/core';
import {OrdersComponent} from "../orders.component";
import {BsDatepickerConfig} from "ngx-bootstrap/datepicker";
import {defineLocale} from "ngx-bootstrap/bs-moment";
import {zhCn} from "ngx-bootstrap/locale";
defineLocale('cn', zhCn);

@Component({
  selector: 'app-finished',
  templateUrl: './finished.component.html',
  styleUrls: ['./finished.component.scss']
})
export class FinishedComponent implements OnInit {

  bsConfig: Partial<BsDatepickerConfig>;
  constructor(private parentComp:OrdersComponent) {
    this.bsConfig = Object.assign({}, {
      locale: 'cn',
      containerClass: 'theme-blue',
      rangeInputFormat: 'YYYY/MM/DD'
    }); }

  ngOnInit() {
    let me = this;
    me.parentComp.orderType = 5
  }

}
