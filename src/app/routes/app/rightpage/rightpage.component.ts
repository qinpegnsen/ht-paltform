import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SettingsService} from '../../../core/settings/settings.service';
import {AjaxService} from '../../../core/services/ajax.service';
import {AppIndexOptComponent} from '../app-index-opt/app-index-opt.component';
import {PatternService} from '../../../core/forms/pattern.service';
import {MaskService} from "../../../core/services/mask.service";
import {FileUploader} from "ng2-file-upload";
import {AppComponent} from '../../../app.component';
import {GetUidService} from '../../../core/services/get-uid.service';
import {AppIndexTplComponent} from '../app-index-tpl/app-index-tpl.component';
const swal = require('sweetalert');

@Component({
  selector: 'app-rightpage',
  templateUrl: './rightpage.component.html',
  styleUrls: ['./rightpage.component.scss']
})
export class RightpageComponent implements OnInit {
  public queryId:number;//获取添加，修改的ID
  public  tplImgUUid;//获取模板效果图的图片暗码
  public  uuid=[];//获取模板效果图的图片暗码数组
  public  tplCheckedImgUUid;//获取模板选中效果图的图片暗码
  public optForm = {
    optTypeCode: '',
    typeDesc:'',
    isEntered:''
  }//首页模板类型
  public tplForm = {
    optTypeCode: '',
    typeDesc:'',
    isEntered:''
  }//首页模板
  public id:string;//获取首页模板ID
  public myImg: any;//上传首页模板效果图
  public myImgs: any;//上传首页模板效果图
  public tplImg:string;
  public uploader: FileUploader = new FileUploader({
    url: 'upload/basic/phoneIndexUpload',
    itemAlias: "limitFile",
    queueLimit: 1
  });
  // public uploader:FileUploader = new FileUploader({
  //   url: '/upload/basic/upload',
  //   itemAlias:"limitFile",
  // }); //初始化上传方法
  public uploaders:FileUploader = new FileUploader({
    url: 'upload/basic/phoneIndexUpload',
    itemAlias:"limitFile"
  }); //初始化上传方法

  constructor(public settings: SettingsService,public routeInfo:ActivatedRoute,public ajax:AjaxService,public router:Router,public AppIndexOptComponent:AppIndexOptComponent,public patterns: PatternService,public mask: MaskService,public getUid:GetUidService,public GetUidService:GetUidService,public AppIndexTplComponent:AppIndexTplComponent) {
    this.settings.showRightPage("30%"); // 此方法必须调用！页面右侧显示，带滑动效果,可以自定义宽度：..%  或者 ..px
  }

  ngOnInit() {
    let _this = this;
    _this.queryId = this.routeInfo.snapshot.queryParams['number'];
    _this.id = this.routeInfo.snapshot.queryParams['id'];
    _this.queryData();//请求移动端首页模板类型详细数据，并显示
    _this.queryTplData();//请求移动端首页模板详细数据，并显示
  }

  // 取消
  cancel(){
    let _this = this;
    _this.settings.closeRightPageAndRouteBack(); //关闭右侧滑动页面
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
 * 请求移动端首页模板类型详细数据，并显示()
 */
queryData(){
  let that=this;
  if(typeof(this.id)) {
    this.ajax.get({
      url: '/phone/indexOptType/load',
      async: false, //同步请求
      data: {id: this.id},
      success: (res) => {
        that.optForm = res;
        console.log("█ this.optForm  ►►►",  this.optForm );
      },
      error: (res) => {
        console.log("post limit error");
      }
    });
  }
}

  /**
   * 请求移动端首页模板详细数据，并显示()
   */
  queryTplData(){
    if(typeof(this.id)) {
      this.ajax.get({
        url: '/phone/indexTpl/load',
        async: false, //同步请求
        data: {id: this.id},
        success: (res) => {
          this.tplForm = res;
        },
        error: (res) => {
          console.log("post limit error");
        }
      });
    }
  }


  /**
   * 添加/修改
   * @param value 必填信息
   */
  addLimitList(value){
    let _this = this;
    let submitUrl,submitData;
    //添加模板类型
    if(_this.queryId == 1){
      _this.ajax.post({
        url: '/phone/indexOptType/insert',
        data: {
          'optTypeCode': value.optTypeCode,
          'optTypeName': value.optTypeName,
          'typeDesc': value.typeDesc,
          'isEntered':value.isEntered
        },
        success: (res) => {
          if (res.success) {
            _this.router.navigate(['/main//app/app-index-opt'], {replaceUrl: true}); //路由跳转
            swal('添加模板类型提交成功！', '','success');
            _this.AppIndexOptComponent.getAgentList()//实现刷新
          } else {
            swal(res.info,'','error');
          }
        },
        error: (data) => {
          swal('添加模板类型提交失败！', '','error');
        }
      })
    }
    //修改模板类型
    else if(_this.queryId == 2) {
      _this.ajax.post({
        url: '/phone/indexOptType/update',
        data: {
          'id':_this.id,
          'optTypeCode': value.optTypeCode,
          'optTypeName': value.optTypeName,
          'typeDesc': value.typeDesc,
          'isEntered':value.isEntered
        },
        success: (res) => {
          console.log(res)
          if (res.success) {
            _this.router.navigate(['/main//app/app-index-opt'], {replaceUrl: true});   //路由跳转
            swal('修改模板类型信息成功！', '','success');
            _this.AppIndexOptComponent.getAgentList()//实现刷新
          } else {
            swal(res.info,'','error');
          }
        },
        error: (data) => {
          swal('修改模板类型失败！', '','error');
        }
      });
    }
    //添加首页模板
    else if(_this.queryId == 3){
      _this.uploadImg();
      _this.uploadImg1();
      _this.submitDatas(value);
    }
    //修改首页模板
    else if(_this.queryId == 4){
      if(_this.uploader.queue.length>0) {//上传第一张
        _this.uploadImg();
      }
      if(_this.uploaders.queue.length>0) {//上传第二张
        _this.uploadImg1();
      }
      _this.upTplDatas(value);
    }
  }

  /**
   * 修改首页模板
    * @param value
   */
  public upTplDatas(value){
    let _this = this;
    _this.ajax.post({
      url: '/phone/indexTpl/update',
      data: {
        'id':_this.id,
        'tplCode': value.tplCode,
        'tplName': value.tplName,
        'tplUrl': value.tplUrl,
        'tplImg':_this.tplImgUUid,
        'tplCheckedImg':_this.tplCheckedImgUUid,
        'tplDesc':value.tplDesc,
        'tplImgCount':value.tplImgCount,
        'tplAuthor':value.tplAuthor,
        'tplWidth':value.tplWidth,
        'tplHeight':value.tplHeight,
        'tplType':value.tplType
      },
      success: (res) => {
        if (res.success) {
          _this.router.navigate(['/main/app/app-index-tpl'], {replaceUrl: true}); //路由跳转
          swal('修改首页模板提交成功！', '','success');
          _this.AppIndexTplComponent.getAgentList()//实现刷新
        } else {
          swal(res.info,'','error');
        }
      },
      error: (data) => {
        swal('修改首页模板提交失败！', '','error');
      }
    })
  }

  /**
   * 添加首页模板
   * @param value
   */
  public submitDatas(value){
    let _this = this;
    _this.ajax.post({
      url: '/phone/indexTpl/insert',
      data: {
        'tplCode': value.tplCode,
        'tplName': value.tplName,
        'tplUrl': value.tplUrl,
        'tplImg':_this.tplImgUUid,
        'tplCheckedImg':_this.tplCheckedImgUUid,
        'tplDesc':value.tplDesc,
        'tplImgCount':value.tplImgCount,
        'tplAuthor':value.tplAuthor,
        'tplWidth':value.tplWidth,
        'tplHeight':value.tplHeight,
        'tplType':value.tplType
      },
      success: (res) => {
        if (res.success) {
          _this.router.navigate(['/main/app/app-index-tpl'], {replaceUrl: true}); //路由跳转
          swal('添加首页模板提交成功！', '','success');
          _this.AppIndexTplComponent.getAgentList()//实现刷新
        } else {
          swal(res.info,'','error');
        }
      },
      error: (data) => {
        swal('添加首页模板提交失败！', '','error');
      }
    })
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
      me.tplImgUUid=uuid;
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
      me.tplCheckedImgUUid=uuid;

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
