import { Component, OnInit } from '@angular/core';
import {Location} from "@angular/common";
import {BsDatepickerConfig} from "ngx-bootstrap/datepicker";
import {defineLocale} from "ngx-bootstrap/bs-moment";
import {zhCn} from "ngx-bootstrap/locale";
import {SubmitService} from "../../../core/forms/submit.service";
import {Router} from "@angular/router";
import {isNullOrUndefined} from "util";
defineLocale('cn', zhCn);

@Component({
  selector: 'app-wo-manage',
  templateUrl: './wo-manage.component.html',
  styleUrls: ['./wo-manage.component.scss']
})
export class WoManageComponent implements OnInit {
  public woType: string;
  public detail:boolean = false;
  public detailType:string;
  public parentPath:string;
  minDate: Date = new Date();
  maxDate: Date = new Date();
  bsConfig: Partial<BsDatepickerConfig>;

  constructor(public location: Location,private router: Router, private submit: SubmitService) {
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

  routeBack(){
    let me = this, backRouter;
    let parentPath = me.submit.getParams('parentPath');
    if(!isNullOrUndefined(parentPath)) me.parentPath = parentPath;
    backRouter = '/main/WO/manage/' + this.parentPath;
    if(me.parentPath == 'assign'){
      backRouter = '/main/WO/assign';
    };
    this.router.navigate([backRouter], {replaceUrl: true, preserveQueryParams: true});
  }

}
