import {Component, OnInit} from '@angular/core';
import {SettingsService} from "../../../../../core/settings/settings.service";
import {SubmitService} from "../../../../../core/forms/submit.service";
import {KindManageComponent} from "../kind-manage.component";

@Component({
  selector: 'app-add-kind',
  templateUrl: './add-kind.component.html',
  styleUrls: ['./add-kind.component.scss'],
  providers: [KindManageComponent, SubmitService]
})
export class AddKindComponent implements OnInit {
  private kindInfo = {}

  constructor(public settings: SettingsService,
              private parent: KindManageComponent,
              private submitForm: SubmitService) {
    this.settings.showRightPage("28%"); // 此方法必须调用！页面右侧显示，带滑动效果,可以自定义宽度：..%  或者 ..px
  }

  ngOnInit() {
    this.kindInfo['state'] = 'SHOW';
  }

  //提交表单
  private addKindForm() {
    let me = this;
    let submitUrl, submitData;
    submitUrl = '/goodskind/addGoodsKind';
    submitData = me.kindInfo;

    console.log("█ submitData ►►►", submitData);
    me.submitForm.submitFormData(submitUrl, submitData);//所有表单提交用的都是AddAdminService里的submitRightPageData方法
    me.parent.queryDatas()//刷新父页面数据
  }

  // 取消
  private cancel() {
    this.settings.closeRightPageAndRouteBack(); //关闭右侧滑动页面
  }

}
