import { Component, OnInit } from '@angular/core';
import {AjaxService} from "../../../../core/services/ajax.service";
import {SubmitService} from "../../../../core/forms/submit.service";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {AppComponent} from "../../../../app.component";
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
  private result:any;
  private kind:any;

  private id:number;
  constructor(private ajax: AjaxService,private submit: SubmitService,private router:Router, private routeInfo: ActivatedRoute,) { }

  ngOnInit() {

    let me=this;
    me.id = this.routeInfo.snapshot.queryParams['id'];//获取地址栏的参数
    console.log(me.id)
    //按钮配置
    me.addButton = {
      type: "add",
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
    /**
     * 路由事件用来监听地址栏的变化
     * 1.当添加代理商出现的时候，代理商列表组件隐藏
     * 2.路由变化的时候，刷新页面
     */
    me.router.events
      .subscribe((event) => {
        if (event instanceof NavigationEnd) { // 当导航成功结束时执行
          console.log(event.url)
          if(event.url.indexOf('aa')>0){
            me.flag=false;
          }else if(event.url=='/main/help-center/help-interlocution/problem-details'){
            me.flag=true;
            this.allproblem() //刷新内容页面
          }
        }
      });
    this.allproblem();
  }
  back(){
    this.router.navigate(['/main/operation/help-center/help-interlocution']);
  }
  //查询分类
  qeuryAllService(){
    this.kind = this.submit.getData("/helpKind/queryAll",'');
    console.log("█ this.kinds ►►►",  this.kind);
  }
    allproblem(){
      let url = "/helpQuestions/queryAll";
      let data={
        kindId:this.id,
    }
    this.result = this.submit.getData(url,data);
    console.log("█ result ►►►",  this.result);
  }

  //隐藏显示
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

  //删除
  delete(delid) {
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
        me.qeuryAllService(); //更新
      }
    );
  }
}
