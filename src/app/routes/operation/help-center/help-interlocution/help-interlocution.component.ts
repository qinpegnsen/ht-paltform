import { Component, OnInit } from '@angular/core';
import {PageEvent} from "../../../../shared/directives/ng2-datatable/DataTable";
import {Page} from "../../../../core/page/page";
import {AjaxService} from "../../../../core/services/ajax.service";
import {SubmitService} from "../../../../core/forms/submit.service";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {AppComponent} from "../../../../app.component";
const swal = require('sweetalert');
@Component({
  selector: 'app-help-interlocution',
  templateUrl: './help-interlocution.component.html',
  styleUrls: ['./help-interlocution.component.scss']
})
export class HelpInterlocutionComponent implements OnInit {
  private addButton;//添加按钮
  private addchildbutton: object//添加问题按钮
  private updatebutton: Object;//修改按钮
  private deletebutton: Object;//删除按钮
  private seebutton: Object;//查看按钮
  private queryId:any;
  private data: Page = new Page();

  public flag:boolean=true;//定义boolean值用来控制内容组件是否显示
  constructor(private ajax: AjaxService,private submit: SubmitService,private router:Router,private routeInfo:ActivatedRoute) { }

  ngOnInit() {

    let me = this;
    me.queryId = me.routeInfo.snapshot.queryParams['id'];

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
    this.qeuryAllService();
  }

  /**
   * 帮助分类--查询分页
   */
  qeuryAllService(event?: PageEvent){
    let me = this, activePage = 1;
    if (typeof event !== "undefined") activePage = event.activePage;
    let url = "/helpKind/pageQueryAll";
    let data={
      curPage: activePage,
      pageSize:10,
    }
    let result = this.submit.getData(url,data);
    me.data = new Page(result);
  }


  /**
   * 隐藏显示
   */
  startState(data) {
    if (data.state == "HIDE") data.state = "SHOW"; else data.state = "HIDE";
    let url = "/helpKind/updateHelpKindState", _this = this;
    this.ajax.put({
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
  delete(delid) {
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
        me.qeuryAllService(); //更新
      }
    );
  }
}
