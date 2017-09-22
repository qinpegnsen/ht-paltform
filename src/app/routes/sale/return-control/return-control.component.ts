import { Component, OnInit } from '@angular/core';
import {Page} from "../../../core/page/page";
import {PageEvent} from "../../../shared/directives/ng2-datatable/DataTable";
import {NavigationEnd, Router} from "@angular/router";
import {SubmitService} from "../../../core/forms/submit.service";
const swal = require('sweetalert');
@Component({
  selector: 'app-return-control',
  templateUrl: './return-control.component.html',
  styleUrls: ['./return-control.component.scss']
})
export class ReturnControlComponent implements OnInit {

  private data: Page = new Page();
  private goodsName:any;
  private seebutton:object;//查看按钮
  private handlebutton:object;//处理按钮
  public flag:boolean=true;//定义boolean值用来控制内容组件是否显示

  constructor(private submit:SubmitService,private router:Router) { }

  ngOnInit() {
    let me=this;
    me.seebutton = {
      title: "查看",
      type: "details",
      text:'查看'
    };
    me.handlebutton = {
      title: "处理",
      type: "set",
      text:'处理'
    };

    me.router.events
      .subscribe((event) => {
        if (event instanceof NavigationEnd) { // 当导航成功结束时执行
          if(event.url.indexOf('qq')>0){
            me.flag=false;
          }else if(event.url=='/main/sale/refund-control'){
            me.flag=true;
            this.qeuryAllService() //刷新内容页面
          }
        }
      });
    this.qeuryAllService();
  }
  /**
   * 根据商品名称搜索
   */
  search(){
    this.qeuryAllService();
  }

  /**
   * 查询买家评价分页
   */
  qeuryAllService(event?: PageEvent){
    let me = this, activePage = 1;
    if (typeof event !== "undefined") activePage = event.activePage;
    let url = "/goodsQuery/querySku";
    let data={
      curPage: activePage,
      pageSize:10,
      goodsName:me.goodsName,
    }
    let result = this.submit.getData(url,data);
    me.data = new Page(result);
    console.log("█ result ►►►",  result);
  }

  /**
   * 当点击tr的时候，让隐藏的tr出来
   */
  showDetail(data:any){
    data.isShow = !data.isShow;
  }

  /**
   * 鼠标放在图片上时大图随之移动
   */
  showImg(event, i){
    i.style.display = 'block';
    i.style.top = (event.clientY+20) + 'px';
    i.style.left =(event.clientX+30) + 'px';
    // console.log("█ i.style.top = 100 ►►►",  i.style.top);
  }

  /**
   * 鼠标离开时大图随之隐藏
   */
  hideImg(i) {
    i.style.display = 'none';
  }
}
