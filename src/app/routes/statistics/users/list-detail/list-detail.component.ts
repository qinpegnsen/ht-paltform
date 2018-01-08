import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SubmitService} from "../../../../core/forms/submit.service";
import {PageEvent} from "../../../../shared/directives/ng2-datatable/DataTable";
import {Page} from "../../../../core/page/page";
import {Location}from '@angular/common';
import {UsersNewComponent} from "../users-new/users-new.component";
import {isNullOrUndefined} from "util";
@Component({
  selector: 'app-list-detail',
  templateUrl: './list-detail.component.html',
  styleUrls: ['./list-detail.component.scss'],
  providers: [UsersNewComponent]
})
export class ListDetailComponent implements OnInit {
  public linkType: string;
  public memberListdata: Page = new Page();
  public nowtime: any;
  public prevtime: any;
  public authState: string = '';//默认查询的会员的是否认证

  constructor(public routeInfo: ActivatedRoute, public submit: SubmitService, public location: Location, public usersNewComponent: UsersNewComponent) {
  }

  ngOnInit() {
    let _this = this;
    _this.linkType = this.routeInfo.snapshot.queryParams['linkType'];//获取地址栏路由的参数
    _this.nowtime = _this.routeInfo.snapshot.queryParams['nowtime'];//获取当天时间
    _this.prevtime = _this.routeInfo.snapshot.queryParams['prevtime'];//获取前一天时间
    _this.qeuryAll(1);
  }


  /*
   * 查询列表
   * */
  qeuryAll(curPage,event?: PageEvent) {
    let _this = this, activePage = 1;
    if(typeof event !== "undefined") {
      activePage =event.activePage
    }else if(!isNullOrUndefined(curPage)){
      activePage =curPage
    };
    let url = "/cust/queryAllCust";
    let data = {
      curPage:activePage,
      pageSize:15,
      createTimeBegin: _this.prevtime,
      createTimeEnd: _this.nowtime
    }
    let result = this.submit.getData(url, data);
    _this.memberListdata = new Page(result);
  }
}
