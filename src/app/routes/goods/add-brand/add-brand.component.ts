import {Component, OnInit} from "@angular/core";
import {SubmitService} from "../../../core/forms/submit.service";
import {SettingsService} from "../../../core/settings/settings.service";
import {BrandsComponent} from "../brands/brands.component";
import {ActivatedRoute, Router} from "@angular/router";
import {isNullOrUndefined} from "util";
import {GetUidService} from "../../../core/services/get-uid.service";
import {FileUploader} from "ng2-file-upload";
import {AppComponent} from "../../../app.component";
import {MaskService} from "../../../core/services/mask.service";
const swal = require('sweetalert');
@Component({
  selector: 'app-add-brand',
  templateUrl: './add-brand.component.html',
  styleUrls: ['./add-brand.component.scss']
})
export class AddBrandComponent implements OnInit {
  private brandInfo = {};
  private path: string;
  private pageTitle: string;
  private editBrand: boolean = false;
  private brandDetail: boolean = false;
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
  private upBrandImg:boolean = false;
  private fileName:string = '选择图片';


  constructor(public settings: SettingsService, private route: ActivatedRoute,
              private router: Router, private getUid: GetUidService,private mask: MaskService,
              public parentComp: BrandsComponent, private submit: SubmitService) {
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
          this.brandInfo['kindparentCompId'] = this.submit.getParams('id');
          this.brandInfo['parentCompKindName'] = this.submit.getParams('pname');
          this.kindsList = this.submit.getData('/goodsKind/queryGoodsByParentId', ''); //分类列表
          break;

        //修改品牌
        case "upBrand":
          //console.log("█ \"修改品牌\" ►►►", "修改品牌");
          me.pageTitle = "修改品牌";
          me.editBrand = true;
          me.brandInfo = this.getBrandInfo('BRAND');// 获取品牌信息
          this.kindsList = this.submit.getData('/goodsKind/queryGoodsByParentId', ''); // 分类列表
          break;

        //查看品牌详情
        case "brandDetail":
          //console.log("█ \"查看品牌详情\" ►►►", "查看品牌详情");
          me.pageTitle = "品牌详情";
          me.brandDetail = true;
          me.brandInfo = me.getBrandInfo('BRANDKIND');// 获取品牌信息
          me.brandKind = me.getBrandKinds(me.brandInfo['goodsKindList']);
          break;

        case "upBrandImg":
          me.upBrandImg = true;
          me.pageTitle = '修改品牌图片';
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
    let _this = this,url = '/goodsBrand/loadBrandById',bid = _this.submit.getParams('brandId');
    let data = {id: bid, type: _type};
    return this.submit.getData(url, data);
  }

  /**
   * 从详情去修改
   */
  private toUpdateBrand() {
    let me = this, brandId = me.submit.getParams('brandId');
    me.settings.closeRightPage(); //关闭右侧滑动页面
    me.router.navigate(['/main/goods/brands/upBrand'], {replaceUrl: true, preserveQueryParams: true });
  }

  /**
   * 修改图片
   * @param id
   */
  private toUpBrandImg(id){
    let me = this, brandId = me.submit.getParams('brandId');
    me.settings.closeRightPage(); //关闭右侧滑动页面
    me.router.navigate(['/main/goods/brands/upBrandImg'],  {replaceUrl: true, preserveQueryParams: true });
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
        me.upLoadImg(submitUrl,submitData,'post'); //上传图片及提交数据
        break;
      //修改分类
      case "upBrand":
        submitUrl = '/goodsBrand/updateBrand';
        submitData.brandImageuuid = null;
        me.upLoadImg(submitUrl,submitData,'put'); //上传图片及提交数据
        break;
    }


  }
  /**
   * 上传图片及提交数据
   * @param submitData
   * @param submitUrl
   * @param method : post/put
   */
  private upLoadImg(submitUrl,submitData,method){
    let me = this;
    me.mask.showMask();//上传图片比较慢，显示遮罩层
    //上传之前
    me.uploader.onBuildItemForm = function(fileItem, form){
      me.uuid = me.getUid.getUid();
      form.append('uuid', me.uuid);
    };
    //执行上传
    me.uploader.uploadAll();
    //上传成功
    me.uploader.onSuccessItem = function (item, response, status, headers) {
      let res = JSON.parse(response);
      if (res.success) {
        if (!isNullOrUndefined(me.uuid)) submitData.brandImageuuid = me.uuid;
      } else {
        AppComponent.rzhAlt('error','上传失败', '图片上传失败！');
      }
    }
    // 上传失败
    me.uploader.onErrorItem = function (item, response, status, headers) {
      AppComponent.rzhAlt('error','上传失败', '图片上传失败！');
    };
    //上传完成，不管成功还是失败
    me.uploader.onCompleteAll = function(){
      me.submitFormDataAndRefresh(submitUrl,submitData,method)
    }

    //如果没有选择图片则直接提交
    if(!me.uploader.isUploading){   // 图片已经传过了，但是数据提交失败了，改过之后可以直接提交
      if (!isNullOrUndefined(me.uuid)) submitData.brandImageuuid = me.uuid;
      me.submitFormDataAndRefresh(submitUrl,submitData,method);
    }
  }

  /**
   * 提交数据，刷新父当前页组件数据
   * method: post
   * @param submitUrl
   * @param submitData
   */
  private submitFormDataAndRefresh(submitUrl, submitData,method){
    let me = this;
    if(method == 'post'){
      me.submit.postRequest(submitUrl, submitData, true);
    }else if(method == 'put'){
      me.submit.putRequest(submitUrl, submitData, true);
    }
    me.refreshParentCompData()// 刷新父页面数据
  }

  /**
   * 刷新父页面数据
   */
  private refreshParentCompData(){
    let me = this;
    let parentCompPage = this.submit.getParams('page');// 获取修改的项目所在的页数
    if (isNullOrUndefined(parentCompPage)) parentCompPage = 1;
    me.parentComp.queryDatas(parentCompPage)
  }

  // 取消
  private cancel() {
    this.settings.closeRightPageAndRouteBack(); //关闭右侧滑动页面
  }

}
