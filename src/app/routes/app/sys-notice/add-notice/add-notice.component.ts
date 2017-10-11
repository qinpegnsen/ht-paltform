import { Component, OnInit } from '@angular/core';
import {SettingsService} from "../../../../core/settings/settings.service";
import {SysNoticeComponent} from "../sys-notice.component";
import {OperationService} from "../../../operation/operation.service";
import {PatternService} from "../../../../core/forms/pattern.service";
@Component({
  selector: 'app-add-notice',
  templateUrl: './add-notice.component.html',
  styleUrls: ['./add-notice.component.scss']
})
export class AddNoticeComponent implements OnInit {

  constructor(
    public settings: SettingsService,
    public parent:SysNoticeComponent,
    private operationService: OperationService,
    public patterns: PatternService,
  ) {
    this.settings.showRightPage("30%");
  }

  /**
   * 1.获取参数的类型
   * 2.对按钮进行赋值
   */
  ngOnInit() { }

  // 取消
  cancel(){
    this.settings.closeRightPageAndRouteBack(); //关闭右侧滑动页面
  }

  // 提交
  submit(obj){
    let url='/announce/addAnnounce';
    let data={
      title:obj.title,
      content:obj.content,
      url:obj.url,
      endTime:obj.endTime
    }
    let result=this.operationService.addNewArticle(url,data);
    this.settings.closeRightPageAndRouteBack(); //关闭右侧滑动页面
    this.parent.queryNoticeList();
  }
}
