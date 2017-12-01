import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {SettingsService} from "../../../core/settings/settings.service";
import {PatternService} from "../../../core/forms/pattern.service";
import {FileUploader} from "ng2-file-upload";
import {GetUidService} from "../../../core/services/get-uid.service";
import {AppComponent} from "../../../app.component";
import {WebstiteService} from "../webstite.service";

@Component({
  selector: 'app-store-right-page',
  templateUrl: './store-right-page.component.html',
  styleUrls: ['./store-right-page.component.scss']
})
export class StoreRightPageComponent implements OnInit {

  public type:string;           //储存地址栏传递过来的类型，从而显示不同的页面
  public id:number;             //储存地址栏传递过来的id，从而获取当前id的内容，并修改
  public isUseList:any;         //是否启用的数组
  public curPage;                //修改的对象当前在第几页
  public logoUUID;               //logo暗码
  public sloganPicUUID;          //宣传图暗码
  public myImg: any;//上传首页模板效果图
  public myImgs: any;//上传首页模板效果图
  public uploader: FileUploader = new FileUploader({
    url: '/upload/basic/upload',
    itemAlias: "limitFile",
    queueLimit: 1
  });
  public uploaders:FileUploader = new FileUploader({
    url: '/upload/basic/upload',
    itemAlias:"limitFile"
  });

  constructor(
    public settings: SettingsService,
    public routeInfo: ActivatedRoute,
    public GetUidService:GetUidService,
    public webstiteService:WebstiteService,
    public patterns: PatternService
  ) {
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
    this.id = this.routeInfo.snapshot.queryParams['id'];
    if(this.id){
      let url='/basicExpress/loadBasicExpressById';
      let data={
        id:this.id
      }
      // this.editData=this.service.getData(url,data);
    }

    /**
     * 是否启用的数组
     * @type {[{id: string; name: string},{id: string; name: string}]}
     */
    this.isUseList=[
      {id:'Y',name:'启用'},
      {id:'N',name:'停用'}
    ]
  }

  /**
   * 取消
   */
  cancel(){
    this.settings.closeRightPageAndRouteBack(); //关闭右侧滑动页面
  }

  /**
   * 提交
   * @param obj
   */
  submit(obj){
    let _this=this;
    _this.uploadImg();
    _this.uploadImg1();
    _this.submitDatas(obj);
  }

  /**
   * 提交数据
   */
  submitDatas(obj){
    if(this.type=='add'){
      let url='/rpStore/addRpStore';
      let data={
        epSubname:obj.epSubname,
        slogan:obj.slogan,
        logoUUID:this.logoUUID,
        sloganPicUUID:this.sloganPicUUID
      }
      let result=this.webstiteService.addRedPackRules(url,data);
      // let result=this.operationService.addNewArticle(url,data);
      // if(result=='物流公司编码已存在'||result=='物流公司名称已存在'){
      //   return;
      // }
    }else if(this.type=="edit"){
      let url='/basicExpress/updateBasicExpress';
      let data={
        epSubname:obj.epSubname,
        slogan:obj.slogan,
        logoUUID:this.logoUUID,
        sloganPicUUID:this.sloganPicUUID
      }
      let result=this.webstiteService.addRedPackRules(url,data);
      // let result=this.operationService.updataeEpress(url,data);
      // if(result=='物流公司编码已存在'||result=='物流公司名称已存在'){
      //   return;
      // }
    }
    this.settings.closeRightPageAndRouteBack(); //关闭右侧滑动页面
  }

  /**
   * 监听图片选择
   * @param $event
   */
  fileChangeListener() {

    // 当选择了新的图片的时候，把老图片从待上传列表中移除
    if(this.uploader.queue.length > 1) this.uploader.queue[0].remove();
    this.myImg = true;  //表示已经选了图片
  }
  fileChangeListeners() {
    // 当选择了新的图片的时候，把老图片从待上传列表中移除
    if(this.uploaders.queue.length > 1) this.uploaders.queue[0].remove();
    this.myImgs = true;  //表示已经选了图片
  }

  /**
   * 图片上传
   */
  uploadImg(){
    let me = this;
    /**
     * 构建form时，传入自定义参数
     * @param item
     */
    me.uploader.onBuildItemForm = function (fileItem, form) {
      let uuid=me.GetUidService.getUid();
      form.append('uuid',uuid);
      me.logoUUID=uuid;
    };

    /**
     * 执行上传
     */
    me.uploader.uploadAll();
    /**
     * 上传成功处理
     * @param item 上传列表
     * @param response 返回信息
     * @param status 状态
     * @param headers 头信息
     */
    me.uploader.onSuccessItem = function (item, response, status, headers) {
      let res = JSON.parse(response);
      if (res.success) {
        console.log("█ '上传图片成功' ►►►",  '上传图片成功');
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
    me.uploader.onErrorItem = function (item, response, status, headers) {
      AppComponent.rzhAlt('error', '上传失败', '图片上传失败！');
    };


    /**
     * 所有图片都上传成功后执行添加文章
     */
    me.uploader.onCompleteAll=function(){
      // me.submitDatas();
    }
  }


  /**
   * 图片上传
   */
  uploadImg1(){
    let me = this;
    /**
     * 构建form时，传入自定义参数
     * @param item
     */
    me.uploaders.onBuildItemForm = function (fileItem, form) {
      let uuid=me.GetUidService.getUid();
      form.append('uuid',uuid);
      me.sloganPicUUID=uuid;

    };

    /**
     * 执行上传
     */
    me.uploaders.uploadAll();
    /**
     * 上传成功处理
     * @param item 上传列表
     * @param response 返回信息
     * @param status 状态
     * @param headers 头信息
     */
    me.uploaders.onSuccessItem = function (item, response, status, headers) {
      let res = JSON.parse(response);
      if (res.success) {
        console.log("█ '上传图片成功' ►►►",  '上传图片成功');
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
    me.uploaders.onErrorItem = function (item, response, status, headers) {
      AppComponent.rzhAlt('error', '上传失败', '图片上传失败！');
    };


    /**
     * 所有图片都上传成功后
     */
    me.uploaders.onCompleteAll=function(){
      // if(me.queryId == 3){
      //   me.submitDatas(value);
      // }else if(me.queryId == 4){
      //   me.upTplDatas(value);
      // }
    }
  }
}
