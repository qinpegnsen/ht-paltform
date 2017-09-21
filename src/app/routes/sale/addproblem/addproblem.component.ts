import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {SettingsService} from "../../../core/settings/settings.service";

@Component({
  selector: 'app-addproblem',
  templateUrl: './addproblem.component.html',
  styleUrls: ['./addproblem.component.scss']
})
export class AddproblemComponent implements OnInit {
 private linkType:string;
  constructor(public settings: SettingsService,private routeInfo: ActivatedRoute) {
    this.settings.showRightPage("30%");
  }

  ngOnInit() {
    let _this=this;
    _this.linkType = _this.routeInfo.snapshot.queryParams['linkType'];

  }
  /**
   *   取消
   */
  cancel() {
    this.settings.closeRightPageAndRouteBack(); //关闭右侧滑动页面
  }
  submit() {

  }

}
