import {Component, OnInit} from "@angular/core";
import {SubmitService} from "../../../core/forms/submit.service";
import {SettingsService} from "../../../core/settings/settings.service";
import {BrandsComponent} from "../brands/brands.component";
import {ActivatedRoute} from "@angular/router";
import {isNullOrUndefined} from "util";

@Component({
  selector: 'app-add-brand',
  templateUrl: './add-brand.component.html',
  styleUrls: ['./add-brand.component.scss'],
  providers: [BrandsComponent, SubmitService]
})
export class AddBrandComponent implements OnInit {
  private brandInfo = {};
  private path: string;
  private pageTitle: string;
  private editBrand: boolean = false;
  private tip = {
    brandSort: '0-99，默认0 , 数字越小排序越靠前',
  }

  constructor(public settings: SettingsService,private route:ActivatedRoute,
              public parent: BrandsComponent,private submit: SubmitService) {
    this.settings.showRightPage("28%"); // 此方法必须调用！页面右侧显示，带滑动效果,可以自定义宽度：..%  或者 ..px
  }

  ngOnInit() {
    let me = this;
    me.brandInfo['brandRecommend'] = 'Y';
    me.brandInfo['showType'] = 'IMG';
    me.brandInfo['state'] = 'SHOW';

    //获取当前路由
    me.route.url.subscribe(urls => {
      me.path = urls[0].path;
      //console.log("█ this.path ►►►", this.path);
      switch (me.path) {
        //新增品牌
        case "addBrand":
          //console.log("█ \"新增品牌\" ►►►", "新增品牌");
          me.pageTitle = "新增品牌";
          me.editBrand = true;
          let param = this.route.snapshot.queryParams;
          this.brandInfo['kindParentId'] = param.pid;
          this.brandInfo['parentKindName'] = param.pname;
          break;

        //修改品牌
        case "upBrand":
          //console.log("█ \"修改品牌\" ►►►", "修改品牌");
          me.pageTitle = "修改分类";
          me.editBrand = true;
          me.brandInfo = this.getBrandInfo();// 获取品牌信息
          console.log("█ me.brandInfo ►►►",  me.brandInfo);
          break;
      }
    });
  }

  getBrandInfo(){
    let url = '/goodsBrand/loadBrandById';
    let data = { id: this.submit.getParams('brandId')};
    return this.submit.getData(url,data);
  }


  //提交表单
  private addKindForm() {
    let me = this;
    let submitUrl, submitData;
    submitData = me.brandInfo;
    console.log("█ submitData ►►►", submitData);
    switch (me.path) {
      //新增分类
      case "addBrand":
        submitUrl = '/goodsBrand/addBrand';
        me.submit.postRequest(submitUrl, submitData, true);// 所有post提交用的都是SubmitService里的postRequest方法,true表示需要返回上级页面
        break;
      //修改分类
      case "upBrand":
        submitUrl = '/goodsBrand/updateBrand';
        me.submit.putRequest(submitUrl, submitData, true);// 所有put提交用的都是SubmitService里的putRequest方法,true表示需要返回上级页面
        break;
    }
    let parentPage = this.route.snapshot.queryParams.page;// 获取修改的项目所在的页数
    if(isNullOrUndefined(parentPage)) parentPage = 1;
    me.parent.queryDatas(parentPage)// 刷新父页面数据
  }

  // 取消
  private cancel() {
    this.settings.closeRightPageAndRouteBack(); //关闭右侧滑动页面
  }

}
