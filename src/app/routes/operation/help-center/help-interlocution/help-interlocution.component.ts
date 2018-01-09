import { Component, OnInit } from '@angular/core';
import {PageEvent} from "../../../../shared/directives/ng2-datatable/DataTable";
import {Page} from "../../../../core/page/page";
import {AjaxService} from "../../../../core/services/ajax.service";
import {SubmitService} from "../../../../core/forms/submit.service";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {AppComponent} from "../../../../app.component";
import {isNullOrUndefined} from "util";
const swal = require('sweetalert');
@Component({
  selector: 'app-help-interlocution',
  templateUrl: './help-interlocution.component.html',
  styleUrls: ['./help-interlocution.component.scss']
})
export class HelpInterlocutionComponent implements OnInit {
  public addButton;//添加按钮
  public addchildbutton: object//添加问题按钮
  public updatebutton: Object;//修改按钮
  public deletebutton: Object;//删除按钮
  public seebutton: Object;//查看按钮
  public data: Page = new Page();//查询到的帮助分类
  public flag:boolean=true;//定义boolean值用来控制内容组件是否显示

  constructor(public ajax: AjaxService,public submit: SubmitService,public router:Router,public routeInfo:ActivatedRoute) { }

  ngOnInit() {
    let me = this;
    //按钮配置
    me.addButton = {
      type: "add-thc",
      text: "添加分类",
      title: '添加分类'
    };
    me.updatebutton = {
      title: "修改",
      type: "update"
    };
    me.deletebutton = {
      title: "删除",
      type: "delete"
    };
    me.addchildbutton = {
      title: "添加问题",
      type: "add-thc"
    };
    me.seebutton = {
      title: "查看",
      type: "details"
    };
    me.qeuryAllService(1);
  }

  /**
   * 帮助分类--查询分页
   */
  qeuryAllService(curPage,event?: PageEvent){
    let me = this, activePage = 1;
    if(typeof event !== "undefined") {
      activePage =event.activePage
    }else if(!isNullOrUndefined(curPage)){
      activePage =curPage
    };
    let url = "/helpKind/pageQueryAll";
    let data={
      curPage: activePage,
      pageSize:10,
    }
    let result = me.submit.getData(url,data);
    me.data = new Page(result);
  }

  /**
   * 隐藏显示
   */
  startState(data) {
    if (data.state == "HIDE") data.state = "SHOW"; else data.state = "HIDE";
    let url = "/helpKind/updateHelpKindState", _this = this;
    _this.ajax.put({
      url: url,
      data: {
        'id': data.id,
        'state': data.state
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

  /**
   * 删除
   */
  delete(delid,curPage) {
    let me=this;
    let url = "/helpKind/deleteHelpKind";
    let data={
      id:delid
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
        me.submit.putRequest(url, data); //删除数据
        me.qeuryAllService(curPage); //更新
      }
    );
  }
}
