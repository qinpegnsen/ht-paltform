import { Component, OnInit } from '@angular/core';
import {PageEvent} from "../../../shared/directives/ng2-datatable/DataTable";
import {AjaxService} from "../../../core/services/ajax.service";
import {SubmitService} from "../../../core/forms/submit.service";
import {Page} from "../../../core/page/page";
import {Router} from "@angular/router";
import {AppComponent} from "../../../app.component";
@Component({
  selector: 'app-wholesale-merchandise-management',
  templateUrl: './wholesale-merchandise-management.component.html',
  styleUrls: ['./wholesale-merchandise-management.component.scss']
})
export class WholesaleMerchandiseManagementComponent implements OnInit {

  private data: Page = new Page();
  constructor(private ajax: AjaxService,private submit: SubmitService,private router:Router) { }

  ngOnInit() {
    this.qeuryAllService();
  }

  /**
   * 批发商品管理--查询分页
   */
  qeuryAllService(event?: PageEvent){
    let me = this, activePage = 1;
    if (typeof event !== "undefined") activePage = event.activePage;
    let url = "/goodsQuery/querySku";
    let data={
      curPage: activePage,
      pageSize:10,
      kindId:'',
      goodsName:'',
      brandName:'',
      state: '',
      goodsAudit: '',
      sortColumns:'',
    }
    let result = this.submit.getData(url,data);
    me.data = new Page(result);
    console.log(me.data)
  }

  /**
   * 是否允许批发
   */
  startState(data) {
    if (data.state == "HIDE") data.state = "SHOW"; else data.state = "HIDE";
    let url = "/goodsEdit/updateIsBatch", _this = this;
    this.ajax.put({
      url: url,
      data: {
        goodsCode:'' ,
        isBatch:'',
      },
      success: (res) => {
        if (res.success) AppComponent.rzhAlt("success",res.info);
        else AppComponent.rzhAlt("error","操作失败");
      },
      error: (data) => {
        AppComponent.rzhAlt("error","修改功能操作状态失败");
      }
    });
  }
}
