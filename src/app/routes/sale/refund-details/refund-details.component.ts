import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-refund-details',
  templateUrl: './refund-details.component.html',
  styleUrls: ['./refund-details.component.scss']
})
export class RefundDetailsComponent implements OnInit {

  private queryParams:string;
  private flag:boolean=true;
  constructor( private routeInfo: ActivatedRoute,private router:Router) { }

  ngOnInit() {
    let me=this;
    me.queryParams = me.routeInfo.snapshot.queryParams['queryParams'];

    me.router.events
      .subscribe((event) => {
        if (event instanceof NavigationEnd) { // 当导航成功结束时执行
          if(event.url.indexOf('bb')>0){
            me.flag=false;
          }else if(event.url=='/main/sale/refund-details'){
            me.flag=true;
            // this.qeuryAllService() //刷新内容页面
          }
        }
      });
  }

}
