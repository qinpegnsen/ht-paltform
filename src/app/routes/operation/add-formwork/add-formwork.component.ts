import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-add-formwork',
  templateUrl: './add-formwork.component.html',
  styleUrls: ['./add-formwork.component.scss']
})
export class AddFormworkComponent implements OnInit {
  public linkType:string;

  constructor(private routeInfo:ActivatedRoute, private router:Router) { }

  ngOnInit() {
    this.linkType = this.routeInfo.snapshot.queryParams['linkType'];//获取地址栏的参数
  }

  /**
   * 关闭右侧滑动页面
   */
  cancel() {
    //this.settings.closeRightPageAndRouteBack(); //关闭右侧滑动页面
    this.router.navigate(['/main/operation/freight-template']);
  }
}
