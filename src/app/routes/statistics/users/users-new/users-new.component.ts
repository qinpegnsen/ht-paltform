import { Component, OnInit } from '@angular/core';
import {ColorsService} from "../../../../shared/colors/colors.service";
import {NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-users-new',
  templateUrl: './users-new.component.html',
  styleUrls: ['./users-new.component.scss']
})
export class UsersNewComponent implements OnInit {

  public flag:boolean=true;//定义boolean值用来控制内容组件是否显示

  constructor(private router:Router) { }

  ngOnInit() {
    let _this=this;
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
          }else if(event.url=='/main/users/users-new'){
            _this.flag=true;
            //_this.getAgentList() //刷新内容页面
          }
        }
      });
  }

}
