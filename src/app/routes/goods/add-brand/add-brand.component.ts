import {Component, OnInit} from "@angular/core";
import {SubmitService} from "../../../core/forms/submit.service";
import {SettingsService} from "../../../core/settings/settings.service";
import {BrandsComponent} from "../brands/brands.component";
import {ActivatedRoute, Router} from "@angular/router";
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
  private brandDetail: boolean = false;
  private parentPage;// 父级页面所在的页数
  private kindsList;// 分类列表
  private brandKind;// 品牌所属分类
  private tip = {
    brandSort: '0-99，默认0 , 数字越小排序越靠前',
  }

  constructor(public settings: SettingsService, private route: ActivatedRoute,
              private router: Router,
              public parent: BrandsComponent, private submit: SubmitService) {
    this.settings.showRightPage("28%"); // 此方法必须调用！页面右侧显示，带滑动效果,可以自定义宽度：..%  或者 ..px
  }

  ngOnInit() {
    let me = this;
    // 初始化默认值
    me.brandInfo['brandRecommend'] = 'Y';
    me.brandInfo['showType'] = 'IMG';
    me.brandInfo['state'] = 'SHOW';
    me.brandInfo['kindId'] = '';

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
          this.kindsList = this.submit.getData('/goodskind/queryGoodsByParentId', {}); //分类列表
          break;

        //修改品牌
        case "upBrand":
          //console.log("█ \"修改品牌\" ►►►", "修改品牌");
          me.pageTitle = "修改分类";
          me.editBrand = true;
          me.brandInfo = this.getBrandInfo('BRAND');// 获取品牌信息
          this.kindsList = this.submit.getData('/goodskind/queryGoodsByParentId', {}); // 分类列表
          console.log("█ me.brandInfo ►►►", me.brandInfo);
          break;

        //查看品牌详情
        case "brandDetail":
          //console.log("█ \"查看品牌详情\" ►►►", "查看品牌详情");
          me.pageTitle = "品牌详情";
          me.brandDetail = true;
          me.brandInfo = me.getBrandInfo('BRANDKIND');// 获取品牌信息
          me.parentPage = me.route.snapshot.queryParams.page;
          me.brandKind = me.getBrandKinds(me.brandInfo['goodsKindList']);
          console.log("█ me.brandKind ►►►",  me.brandKind);
          break;
      }
    });
  }

  private getBrandKinds(list){
    let str = '';
    list.forEach((item) => {
      str += item.kindName + '，'
    })
    return str.substring(0, str.length-1)
  }

  /**
   * 获取品牌信息
   * @returns {any}
   */
  getBrandInfo(_type) {
    let url = '/goodsBrand/loadBrandById';
    let data = {id: this.submit.getParams('brandId'), type: _type};
    return this.submit.getData(url, data);
  }

  //从详情去修改
  private toUpdateBrand() {
    let me = this, brandId = this.submit.getParams('brandId');
    me.settings.closeRightPage(); //关闭右侧滑动页面
    me.router.navigate(['/main/goods/brands/upBrand?page=' + me.parentPage, brandId], {replaceUrl: true});
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
    if (isNullOrUndefined(parentPage)) parentPage = 1;
    me.parent.queryDatas(parentPage)

  }

  // 取消
  private cancel() {
    this.settings.closeRightPageAndRouteBack(); //关闭右侧滑动页面
  }

}
