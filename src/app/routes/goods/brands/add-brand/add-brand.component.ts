import {Component, OnInit} from "@angular/core";
import {SubmitService} from "../../../../core/forms/submit.service";
import {SettingsService} from "../../../../core/settings/settings.service";
import {BrandsComponent} from "../brands.component";

@Component({
  selector: 'app-add-brand',
  templateUrl: './add-brand.component.html',
  styleUrls: ['./add-brand.component.scss'],
  providers: [BrandsComponent, SubmitService]
})
export class AddBrandComponent implements OnInit {
  private brandInfo = {}

  constructor(public settings: SettingsService,
              private parent: BrandsComponent,
              private submitForm: SubmitService) {
    this.settings.showRightPage("28%"); // 此方法必须调用！页面右侧显示，带滑动效果,可以自定义宽度：..%  或者 ..px
  }

  ngOnInit() {
    this.brandInfo['brandRecommend'] = 'Y';
    this.brandInfo['showType'] = 'IMG';
    this.brandInfo['state'] = 'SHOW';
  }

  //提交表单
  private addKindForm() {
    let me = this;
    let submitUrl, submitData;
    submitUrl = '/goodsBrand/addBrand';
    submitData = me.brandInfo;

    console.log("█ submitData ►►►", submitData);
    me.submitForm.submitFormData(submitUrl, submitData);//所有表单提交用的都是AddAdminService里的submitRightPageData方法
    me.parent.queryDatas()//刷新父页面数据
  }

  // 取消
  private cancel() {
    this.settings.closeRightPageAndRouteBack(); //关闭右侧滑动页面
  }

}
