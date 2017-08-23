import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  /**
   * 输入属性，文章列表的数据，然后在页面呈现出来
   */
  @Input()
  articleManListdata;

  public flag:boolean=true;//定义boolean值用来控制内容组件是否显示


  private updatebutton:Object;//更新文章按钮
  private deletebutton:Object;//删除文章按钮
  private detailsbutton:Object;//查看详情按钮

  constructor(private router:Router) {
  }

  ngOnInit() {
    /**
     * 路由事件用来监听地址栏的变化，当新增文章出现的时候吗，内容组件隐藏
     */
    this.router.events
      .subscribe((event) => {
        if (event instanceof NavigationEnd) { // 当导航成功结束时执行
          if(event.url.indexOf('addArticle')!=-1){
            this.flag=!this.flag;
          }
        }
      });

    this.updatebutton={
      title:"编辑",
      type: "update"
    };
    this.deletebutton={
      title:"删除",
      type: "delete"
    };
    this.detailsbutton={
      title:"详情",
      type: "details"
    };
  }

}
