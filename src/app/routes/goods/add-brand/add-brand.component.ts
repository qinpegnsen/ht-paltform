import {Component, OnInit} from "@angular/core";
import {SubmitService} from "../../../core/forms/submit.service";
import {SettingsService} from "../../../core/settings/settings.service";
import {BrandsComponent} from "../brands/brands.component";
import {ActivatedRoute, Router} from "@angular/router";
import {isNullOrUndefined} from "util";
import {GetUidService} from "../../../core/services/get-uid.service";
import {FileUploader} from "ng2-file-upload";
import {AppComponent} from "../../../app.component";
const swal = require('sweetalert');
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
  private parentCompPage;// 父级页面所在的页数
  private kindsList;// 分类列表
  private brandKind;// 品牌所属分类
  private uuid: string;// 图片暗码
  private tip = {
    brandSort: '0-99，默认0 , 数字越小排序越靠前',
  }
  public uploader:FileUploader = new FileUploader({
    url: '/goodsBrand/uploadBrandImage',
    itemAlias:"limitFile"
  }); //初始化上传方法
  private myImg: any;
  private chooseImg;
  private upBrandImg:boolean = false;
  private fileName:string = '选择图片';


  constructor(public settings: SettingsService, private route: ActivatedRoute,
              private router: Router, private getUid: GetUidService,
              public parentComp: BrandsComponent, private submit: SubmitService) {
    this.settings.showRightPage("28%"); // 此方法必须调用！页面右侧显示，带滑动效果,可以自定义宽度：..%  或者 ..px
  }

  ngOnInit() {
    console.log("█ this.uuid ►►►", this.uuid = this.getUid.getUid());

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
          this.uuid = this.getUid.getUid();
          let param = this.route.snapshot.queryParams;
          if (!isNullOrUndefined(param.pid)) this.brandInfo['kindparentCompId'] = param.pid;
          if (!isNullOrUndefined(param.pname)) this.brandInfo['parentCompKindName'] = param.pname;
          this.kindsList = this.submit.getData('/goodskind/queryGoodsByParentId', ''); //分类列表
          break;

        //修改品牌
        case "upBrand":
          //console.log("█ \"修改品牌\" ►►►", "修改品牌");
          me.pageTitle = "修改品牌";
          me.editBrand = true;
          me.brandInfo = this.getBrandInfo('BRAND');// 获取品牌信息
          this.kindsList = this.submit.getData('/goodskind/queryGoodsByParentId', ''); // 分类列表
          break;

        //查看品牌详情
        case "brandDetail":
          //console.log("█ \"查看品牌详情\" ►►►", "查看品牌详情");
          me.pageTitle = "品牌详情";
          me.brandDetail = true;
          me.brandInfo = me.getBrandInfo('BRANDKIND');// 获取品牌信息
          me.parentCompPage = me.route.snapshot.queryParams.page;
          me.brandKind = me.getBrandKinds(me.brandInfo['goodsKindList']);
          break;

        case "upBrandImg":
          me.upBrandImg = true;
          me.pageTitle = '修改品牌图片';
          this.uuid = this.getUid.getUid();
      }
    });
  }

  /**
   * 监听图片选择
   * @param $event
   */
  fileChangeListener($event) {
    let that = this;
    let image: any = new Image();
    let file: File = $event.target.files[0];
    that.fileName = file.name;
    let myReader: FileReader = new FileReader();
    myReader.onloadend = function (loadEvent: any) {
      image.src = loadEvent.target.result;
      that.myImg = image.src;
    };
    myReader.readAsDataURL(file);
  }

  /**
   * 获取品牌所属分类
   * @param list
   * @returns {string}
   */
  private getBrandKinds(list) {
    let str = '';
    if (list.length > 0) {
      list.forEach((item) => {
        if (!isNullOrUndefined(item)) {
          str += item.kindName + '，'
        }
      })
    }
    return str.substring(0, str.length - 1)
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

  /**
   * 从详情去修改
   */
  private toUpdateBrand() {
    let me = this, brandId = this.submit.getParams('brandId');
    me.settings.closeRightPage(); //关闭右侧滑动页面
    me.router.navigate(['/main/goods/brands/upBrand?', brandId], {replaceUrl: true});
  }

  /**
   * 修改图片
   * @param id
   */
  private toUpBrandImg(id){
    let me = this, brandId = this.submit.getParams('brandId');
    me.settings.closeRightPage(); //关闭右侧滑动页面
    me.router.navigate(['/main/goods/brands/upBrandImg', brandId], {replaceUrl: true});
    // me.router.navigate(['/main/goods/brands/upBrandImg?page=' + me.parentCompPage, brandId], {replaceUrl: true});
  }

  //提交表单
  private addBrandForm() {
    let me = this;
    let submitUrl, submitData;
    submitData = me.brandInfo;
    switch (me.path) {
      //新增品牌
      case "addBrand":
        submitUrl = '/goodsBrand/addBrand';
        submitData.brandPic = me.uuid;

        me.uploader.onBuildItemForm = function(fileItem, form){
          console.log("█ fileItem ►►►",  fileItem);
          form.append('uuid', me.uuid);
          console.log("█ form ►►►",  form);
        };
        me.uploader.onSuccessItem = function (item, response, status, headers) {
          let res = JSON.parse(response);
          if (res.success) {
            me.submit.postRequest(submitUrl, submitData, true);
          } else {
            AppComponent.rzhAlt('error','上传失败', '图片上传失败！');
          }
        }
        /**
         * 上传失败处理
         * @param item 失败的文件列表
         * @param response 返回信息
         * @param status 状态码
         * @param headers 上传失败后服务器的返回的返回头
         */
        me.uploader.onErrorItem = function (item, response, status, headers) {
          AppComponent.rzhAlt('error','上传失败', '图片上传失败！');
        };
        /**
         * 执行上传
         */
        me.uploader.uploadAll();
        break;
      //修改分类
      case "upBrand":
        submitUrl = '/goodsBrand/updateBrand';
        me.submit.putRequest(submitUrl, submitData, true);// 所有put提交用的都是SubmitService里的putRequest方法,true表示需要返回上级页面
        break;
    }
    let parentCompPage = this.route.snapshot.queryParams.page;// 获取修改的项目所在的页数
    if (isNullOrUndefined(parentCompPage)) parentCompPage = 1;
    me.parentComp.queryDatas(parentCompPage)

  }

  // 取消
  private cancel() {
    this.settings.closeRightPageAndRouteBack(); //关闭右侧滑动页面
  }

}
