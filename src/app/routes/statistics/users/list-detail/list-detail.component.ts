import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SubmitService} from "../../../../core/forms/submit.service";
import {PageEvent} from "../../../../shared/directives/ng2-datatable/DataTable";
import {Page} from "../../../../core/page/page";
import { Location }from '@angular/common';
@Component({
  selector: 'app-list-detail',
  templateUrl: './list-detail.component.html',
  styleUrls: ['./list-detail.component.scss']
})
export class ListDetailComponent implements OnInit {
  private linkType:string;
  private memberListdata: Page = new Page();
  private nowtime:any;
  private prevtime:any;
  private authState:string='';//默认查询的会员的是否认证

  constructor( private routeInfo: ActivatedRoute,private submit: SubmitService,private location: Location) { }

  ngOnInit() {
    let _this=this;
    _this.linkType = this.routeInfo.snapshot.queryParams['linkType'];//获取地址栏的参数

    _this.nowtime = _this.routeInfo.snapshot.queryParams['nowtime'];
    _this.prevtime = _this.routeInfo.snapshot.queryParams['prevtime'];
    this.qeuryAll();
  }

  /* *
   *返回上个页面
   */
  back(){
    // this.router.navigate(['/main/stat/users/users-new']);
    this.location.back();
  }

  /*
  * 查询列表
  * */
  qeuryAll(event?: PageEvent){
    let me = this, activePage = 1;
    if (typeof event !== "undefined") activePage = event.activePage;
    let url = "/cust/queryAllCust";
    let data={
      createTimeBegin:me.nowtime,
      createTimeEnd:me.prevtime,
     authState:me.authState
    }
    let result = this.submit.getData(url,data);
    me.memberListdata = new Page(result);
    console.log("█ me.data ►►►", result);
  }
}
