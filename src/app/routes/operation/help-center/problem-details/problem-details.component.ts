import { Component, OnInit } from '@angular/core';
import {AjaxService} from "../../../../core/services/ajax.service";
import {SubmitService} from "../../../../core/forms/submit.service";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {AppComponent} from "../../../../app.component";
import {PageEvent} from "../../../../shared/directives/ng2-datatable/DataTable";
import {isNullOrUndefined} from "util";
import {Page} from "../../../../core/page/page";
const swal = require('sweetalert');
@Component({
  selector: 'app-problem-details',
  templateUrl: './problem-details.component.html',
  styleUrls: ['./problem-details.component.scss']
})
export class ProblemDetailsComponent implements OnInit {
  public flag:boolean=true;//定义boolean值用来控制内容组件是否显示
  private addButton;//添加按钮
  private updatebutton: Object;//修改按钮
  private deletebutton: Object;//删除按钮
  private data: Page = new Page();
  private result:any;
  private kind:any;

  private id:number;
  constructor(private ajax: AjaxService,private submit: SubmitService,private router:Router, private routeInfo: ActivatedRoute,) { }

  ngOnInit() {
    let me=this;
    me.id = this.routeInfo.snapshot.queryParams['id'];//获取地址栏的参数
    //按钮配置
    me.addButton = {
      type: "add-thc",
      text: "添加问题",
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
    this.allproblem(1);
  }

  /**
   * 返回上级页面
   */
  back(){
    this.router.navigate(['/main/operation/help-center/help-interlocution']);
  }

  /**
   * 查询分类
   */
  qeuryAllService(){
    this.kind = this.submit.getData("/helpKind/queryAll",'');
  }

  /**
   * 查询问题
   */
  allproblem(curPage,event?: PageEvent){
    let me = this, activePage = 1;
    if(typeof event !== "undefined") {
      activePage =event.activePage
    }else if(!isNullOrUndefined(curPage)){
      activePage =curPage
    };
    let url = "/helpQuestions/pageQuery";
    let data={
      curPage: activePage,
      pageSize:10,
      kindId:this.id,
    }
   let result = this.submit.getData(url,data);
    me.data = new Page(result);
  }

  /**
   * 隐藏显示
   */
  startState(data) {
    if (data.state == "HIDE") data.state = "SHOW"; else data.state = "HIDE";
    let url = "/helpQuestions/updateHelpKindState", _this = this;
    this.ajax.put({
      url: url,
      data: {
        'id': data.id,
        'state': data.state
      },
      success: (res) => {
        if (res.success) {
          AppComponent.rzhAlt("success", res.info);
        }
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
    let url = "/helpQuestions/deleteHelpQuestions";
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
        me.allproblem(this.curPage); //更新
      }
    );
  }
}
