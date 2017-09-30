import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {SubmitService} from "../../../../core/forms/submit.service";
import {PageEvent} from "../../../../shared/directives/ng2-datatable/DataTable";
import {Page} from "../../../../core/page/page";

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

  constructor( private routeInfo: ActivatedRoute,private submit: SubmitService) { }

  ngOnInit() {
    let _this=this;
    _this.linkType = this.routeInfo.snapshot.queryParams['linkType'];//获取地址栏的参数

    _this.nowtime = _this.routeInfo.snapshot.queryParams['nowtime'];
    _this.prevtime = _this.routeInfo.snapshot.queryParams['prevtime'];
    this.qeuryAll();
  }

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
// queryMemberList(curPage,event?:PageEvent){
//   let activePage = 1;
//   if (typeof event !== 'undefined') {
//     activePage = event.activePage;
//   } else if (!isUndefined(curPage)) {
//     activePage = curPage;
//   };
//   let data={
//     curPage:activePage,
//     pageSize:10,
//     sortColumns:'',
//     custName:this.custName,
//     custTruename:this.custTruename,
//     custPhone:this.custPhone,
//     authState:this.authState,
//   }
//   let url='/cust/queryAllCust';
//   this.memberListdata=new Page(this.service.getData(url,data))
//   console.log(this.memberListdata)
// }
