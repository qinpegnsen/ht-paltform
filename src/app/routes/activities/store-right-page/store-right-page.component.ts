import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {SettingsService} from "../../../core/settings/settings.service";
import {PatternService} from "../../../core/forms/pattern.service";
import {FileUploader} from "ng2-file-upload";
import {GetUidService} from "../../../core/services/get-uid.service";
import {AppComponent} from "../../../app.component";
import {RzhtoolsService} from "../../../core/services/rzhtools.service";
import {ActivitiesService} from "../activities.service";
declare var $;

@Component({
  selector: 'app-store-right-page',
  templateUrl: './store-right-page.component.html',
  styleUrls: ['./store-right-page.component.scss']
})
export class StoreRightPageComponent implements OnInit {

  public type: string;           //储存地址栏传递过来的类型，从而显示不同的页面
  public qieryId: number;        //储存地址栏传递过来的id，从而获取当前id的内容，并修改
  public storeSstateList: any;   //企业状态
  public curPage;                //修改的对象当前在第几页
  public loadData;               //load当前id的数据
  public logoUUID;               //logo暗码
  public sloganPicUUID;          //宣传图暗码
  public myLogoImg: any;        //logo图片
  public mySloganImg: any;      //宣传图片
  public uploaderLogo: FileUploader = new FileUploader({
    url: '/upload/basic/upload',
    itemAlias: "limitFile",
    queueLimit: 1,
    allowedFileType:["image"]
  });
  public uploaderSloganPic: FileUploader = new FileUploader({
    url: '/upload/basic/upload',
    itemAlias: "limitFile",
    autoUpload: true,
    allowedFileType:["image"]
  });

  constructor(public settings: SettingsService,
              public routeInfo: ActivatedRoute,
              public GetUidService: GetUidService,
              public service: ActivitiesService,
              public rzhtoolsService: RzhtoolsService,
              public patterns: PatternService) {
    this.settings.showRightPage("30%");
  }

  /**
   * 1.获取参数的类型
   * 2.对按钮进行赋值
   */
  ngOnInit() {
    this.type = this.routeInfo.snapshot.queryParams['type'];
    this.curPage = this.routeInfo.snapshot.queryParams['curPage'];

    /**
     * 获取地址栏的参数，并且根据id查询当前id的信息，从而做修改
     * @type {any}
     * 如果id存在的话，就说明是修改，这时候才执行以下的代码
     */
    this.qieryId = this.routeInfo.snapshot.queryParams['id'];
    if (this.qieryId) {
      let url = '/rpStore/loadRpStoreById';
      let data = {
        id: this.qieryId
      };
      this.loadData = this.service.loadRpStoreData(url, data);
    }
    this.storeSstateList = this.rzhtoolsService.getEnumDataList('2101');
  }

  /**
   * 取消
   */
  cancel() {
    this.settings.closeRightPageAndRouteBack(); //关闭右侧滑动页面
  }

  /**
   * 提交
   * @param obj
   */
  submit(obj) {
    let _this = this;
    _this.uploadImglogo();
    _this.uploadImgSloganPic();
    _this.submitDatas(obj);
  }

  /**
   * 提交数据
   */
  submitDatas(obj) {
    if (this.type == 'add') {
      let url = '/rpStore/addRpStore';
      let data = {
        epSubname: obj.epSubname,
        slogan: obj.slogan,
        logoUUID: this.logoUUID,
        sloganPicUUID: this.sloganPicUUID
      };
      let result=this.service.addRedPackRules(url, data);
      if(result=='请上传logo'||result=='请上传宣传图'||result=='该企业简称已存在'){
        return;
      };
    } else if (this.type == "edit") {
      let url = '/rpStore/updateRpStoreSlogan';
      let data = {
        id: this.qieryId,
        epSubname: obj.epSubname,
        slogan: obj.slogan,
        logoUUID: this.logoUUID,
        sloganPicUUID: this.sloganPicUUID,
        state: obj.state
      };
      let result=this.service.updateRpStore(url, data);
      if(result=='请上传logo'||result=='请上传宣传图'||result=='该企业简称已存在'){
        return;
      };
    }
    this.settings.closeRightPageAndRouteBack(); //关闭右侧滑动页面
  }

  /**
   * 监听logo图片选择
   * @param $event
   */
  fileChangeListenerLogo() {
    // 当选择了新的图片的时候，把老图片从待上传列表中移除
    if (this.uploaderLogo.queue.length > 1) this.uploaderLogo.queue[0].remove();
    this.myLogoImg = true;  //表示已经选了图片
  }

  /**
   * 监听宣传图片的选择
   */
  fileChangeListenerSloganPic() {
    // 当选择了新的图片的时候，把老图片从待上传列表中移除
    if (this.uploaderSloganPic.queue.length > 1) this.uploaderSloganPic.queue[0].remove();
    this.mySloganImg = true;  //表示已经选了图片
  }

  /**
   * logo图片上传
   */
  uploadImglogo() {
    let me = this;
    /**
     * 构建form时，传入自定义参数
     * @param item
     */
    me.uploaderLogo.onBuildItemForm = function (fileItem, form) {
      let uuid = me.GetUidService.getUid();
      form.append('uuid', uuid);
      me.logoUUID = uuid;
    };

    /**
     * 执行上传
     */
    me.uploaderLogo.uploadAll();
    /**
     * 上传成功处理
     * @param item 上传列表
     * @param response 返回信息
     * @param status 状态
     * @param headers 头信息
     */
    me.uploaderLogo.onSuccessItem = function (item, response, status, headers) {
      let res = JSON.parse(response);
      if (res.success) {
        console.log("█ expr ►►►", 'logo图片上传成功');
      } else {
        AppComponent.rzhAlt('error', '上传失败', '图片上传失败！');
      }
    };


    /**
     * 上传失败处理
     * @param item 上传列表
     * @param response 返回信息
     * @param status 状态
     * @param headers 头信息
     */
    me.uploaderLogo.onErrorItem = function (item, response, status, headers) {
      AppComponent.rzhAlt('error', '上传失败', '图片上传失败！');
    };
  }


  /**
   * 宣传图片上传
   */
  uploadImgSloganPic() {
    let me = this;
    /**
     * 构建form时，传入自定义参数
     * @param item
     */
    me.uploaderSloganPic.onBuildItemForm = function (fileItem, form) {
      let uuid = me.GetUidService.getUid();
      form.append('uuid', uuid);
      me.sloganPicUUID = uuid;

    };

    /**
     * 执行上传
     */
    me.uploaderSloganPic.uploadAll();
    /**
     * 上传成功处理
     * @param item 上传列表
     * @param response 返回信息
     * @param status 状态
     * @param headers 头信息
     */
    me.uploaderSloganPic.onSuccessItem = function (item, response, status, headers) {
      let res = JSON.parse(response);
      if (res.success) {
        console.log("█ expr ►►►", '宣传图图上传成功');
      } else {
        AppComponent.rzhAlt('error', '上传失败', '图片上传失败！');
      }
    };


    /**
     * 上传失败处理
     * @param item 上传列表
     * @param response 返回信息
     * @param status 状态
     * @param headers 头信息
     */
    me.uploaderSloganPic.onErrorItem = function (item, response, status, headers) {
      AppComponent.rzhAlt('error', '上传失败', '图片上传失败！');
    };

  }
}
