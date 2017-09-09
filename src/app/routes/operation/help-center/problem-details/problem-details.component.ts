import { Component, OnInit } from '@angular/core';
import {AjaxService} from "../../../../core/services/ajax.service";
import {SubmitService} from "../../../../core/forms/submit.service";
import {NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-problem-details',
  templateUrl: './problem-details.component.html',
  styleUrls: ['./problem-details.component.scss']
})
export class ProblemDetailsComponent implements OnInit {
  public flag:boolean=true;//定义boolean值用来控制内容组件是否显示
  constructor(private ajax: AjaxService,private submit: SubmitService,private router:Router) { }

  ngOnInit() {
    let me=this;
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
          }else if(event.url=='/main/help-center/help-assortment'){
            me.flag=true;
            //_this.getAgentList() //刷新内容页面
          }
        }
      });
  }

}
