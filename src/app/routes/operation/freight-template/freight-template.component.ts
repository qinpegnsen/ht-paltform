import { Component, OnInit } from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-freight-template',
  templateUrl: './freight-template.component.html',
  styleUrls: ['./freight-template.component.scss']
})
export class FreightTemplateComponent implements OnInit {
  private addButton;//新增运费模板按钮配置
  public flag:boolean=true;//定义boolean值用来控制内容组件是否显示

  constructor(private router:Router) {

  }

  ngOnInit() {
    let _this = this;
    /**
     * 按钮配置
     * @type {{type: string, text: string, title: string}}
     */
    this.addButton = {
      type:"add",
      text:"新增运费模板",
      title:'新增运费模板',
    };


    /**
     * 路由事件用来监听地址栏的变化
     * 1.当添加代理商出现的时候，代理商列表组件隐藏
     * 2.路由变化的时候，刷新页面
     */
    _this.router.events
      .subscribe((event) => {
        if (event instanceof NavigationEnd) { // 当导航成功结束时执行
          console.log(event.url)
          if(event.url.indexOf('linkType')>0){
            _this.flag=false;
          }else if(event.url=='/main/agent/agentperson'){
            _this.flag=true;
          }
        }
      });
  }

}
