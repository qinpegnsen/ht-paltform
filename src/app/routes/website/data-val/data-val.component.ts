import {Component, DoCheck, OnInit} from '@angular/core';
import {SubmitService} from "../../../core/forms/submit.service";
import {isNullOrUndefined} from "util";
import {PageEvent} from "../../../shared/directives/ng2-datatable/DataTable";
import {Page} from "../../../core/page/page";
import {ActivatedRoute} from "@angular/router";
import {AjaxService} from "../../../core/services/ajax.service";
import {AppComponent} from "../../../app.component";
import {cli} from "webdriver-manager/built/lib/webdriver";
const swal = require('sweetalert');
@Component({
  selector: 'app-data-val',
  templateUrl: './data-val.component.html',
  styleUrls: ['./data-val.component.scss']
})
export class DataValComponent implements OnInit {
  private data: Page = new Page();
  public code: number;
  private addButton;//添加按钮
  private addchildbutton: object//添加子按钮
  private updatebutton: Object;//修改按钮
  private deletebutton: Object;//删除按钮

  constructor(private submit:SubmitService, private routeInfo: ActivatedRoute,private ajax: AjaxService,) { }

  ngOnInit() {
    let me = this;
    me.code = me.routeInfo.snapshot.queryParams['code'];
    //按钮配置
    me.addButton = {
      type: "add-thc",
      text: "添加val",
      title: '添加val'
    };
    me.updatebutton = {
      title: "编辑",
      type: "update"
    };
    me.deletebutton = {
      title: "删除",
      type: "delete"
    };
    me.addchildbutton = {
      title: "添加val",
      type: "add"
    };
    this.queryDatas(1)
  }

  /**
   * 查询val
   * @param curPage
   * @param event
   * @param childCode
   */
   queryDatas(curPage,event?: PageEvent) {
    let me = this, activePage = 1;
    if(typeof event !== "undefined") {
      activePage =event.activePage
    }else if(!isNullOrUndefined(curPage)){
      activePage =curPage
    };
    let url = "/datadict/querryDatadictList";
    let data = {
      curPage: activePage,
      pageSize: 10,
      code: me.code,
    }
    let res = this.submit.getRequest(url,data);
    console.log("█ res ►►►",  res);
    me.data = new Page(res);
  }

  //删除
  delete(delid,curPage) {
    let me=this;
    let url = "/datadict/deleteDatadict";
    let data={
      code:delid
    }
    swal({
        title: '确认删除此信息？',
        type: 'info',
        confirmButtonText: '确认', //‘确认’按钮命名
        showCancelButton: true, //显示‘取消’按钮
        cancelButtonText: '取消', //‘取消’按钮命名
        closeOnConfirm: false  //点击‘确认’后，执行另外一个提示框
      },
      function () {  //点击‘确认’时执行
        swal.close(); //关闭弹框
        me.submit.delRequest(url, data); //删除数据
        me.queryDatas(curPage); //更新
      }
    );
  }

  //停启用
  startState(data) {
    if (data.enable == "Y") data.enable = "N"; else data.enable = "Y";
    let url = "/datadict/updateEnable", _this = this;
    this.ajax.put({
      url: url,
      data: {
        'code': data.code,
        'enable': data.enable
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
