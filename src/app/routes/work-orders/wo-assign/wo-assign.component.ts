import { Component, OnInit } from '@angular/core';
import {WoManageComponent} from "../wo-manage/wo-manage.component";
import {BsDatepickerConfig} from "ngx-bootstrap/datepicker";
import {defineLocale} from "ngx-bootstrap/bs-moment";
import {zhCn} from "ngx-bootstrap/locale";
import {ActivatedRoute} from "@angular/router";
defineLocale('cn', zhCn);

@Component({
  selector: 'app-wo-assign',
  templateUrl: './wo-assign.component.html',
  styleUrls: ['./wo-assign.component.scss']
})
export class WoAssignComponent implements OnInit {
  private path: string;
  private assign: boolean = false;
  bsConfig: Partial<BsDatepickerConfig>;
  constructor(private parentComp: WoManageComponent,
              private route: ActivatedRoute,) {
    this.bsConfig = Object.assign({}, {
      locale: 'cn',
      containerClass: 'theme-blue'
    });
    this.parentComp.woType = 2
  }

  ngOnInit() {
    let me = this;
    //获取当前路由
    me.route.url.subscribe(urls => {
      me.path = urls[0].path;
      switch (me.path) {
        case "assign":
          me.assign = true;
          break;
      }
    });
  }

}
