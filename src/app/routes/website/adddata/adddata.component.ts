import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {SettingsService} from "../../../core/settings/settings.service";

@Component({
  selector: 'app-adddata',
  templateUrl: './adddata.component.html',
  styleUrls: ['./adddata.component.scss']
})
export class AdddataComponent implements OnInit {

  constructor(public settings: SettingsService,private router:Router) {
    this.settings.showRightPage("30%"); // 此方法必须调用！页面右侧显示，带滑动效果,可以自定义宽度：..%  或者 ..px
  }

  ngOnInit() {
  }
  //提交
  submit(){

  }
  // 取消
  cancel(){
    this.settings.closeRightPageAndRouteBack(); //关闭右侧滑动页面
  }
}
