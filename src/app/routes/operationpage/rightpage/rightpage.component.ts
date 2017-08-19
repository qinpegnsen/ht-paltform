import {Component, OnInit} from '@angular/core';
import {SettingsService} from '../../../core/settings/settings.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-rightpage',
  templateUrl: './rightpage.component.html',
  styleUrls: ['./rightpage.component.scss']
})

export class RightpageComponent implements OnInit {

  // 构造 初始化
  constructor(public settings: SettingsService,private router:Router) {
      this.settings.showRightPage("30%"); // 此方法必须调用！页面右侧显示，带滑动效果,可以自定义宽度：..%  或者 ..px
  }
  ngOnInit() {
  }
  // 取消
  cancel(){
    this.settings.closeRightPageAndRouteBack(); //关闭右侧滑动页面
  }


}
