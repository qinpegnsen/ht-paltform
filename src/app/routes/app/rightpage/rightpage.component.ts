import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SettingsService} from '../../../core/settings/settings.service';
import {AjaxService} from '../../../core/services/ajax.service';
import {AppIndexOptComponent} from '../app-index-opt/app-index-opt.component';
import {PatternService} from '../../../core/forms/pattern.service';
import {MaskService} from "../../../core/services/mask.service";
import {FileUploader} from "ng2-file-upload";
import {isNullOrUndefined} from 'util';
import {AppComponent} from '../../../app.component';
import {GetUidService} from '../../../core/services/get-uid.service';
import {isUndefined} from 'ngx-bootstrap/bs-moment/utils/type-checks';
const swal = require('sweetalert');

@Component({
  selector: 'app-rightpage',
  templateUrl: './rightpage.component.html',
  styleUrls: ['./rightpage.component.scss']
})
export class RightpageComponent implements OnInit {
  private queryId:number;//获取添加，修改的ID
  private limitForm = {
    optTypeCode: '',
    typeDesc:'',
    isEntered:''
  }
  public id:string;//获取首页模板ID
  private myImg: any;//上传首页模板效果图
  private myImgs: any;//上传首页模板效果图
  private tplImg:string;
  public uploader:FileUploader = new FileUploader({
    url: '/upload/basic/upload',
    itemAlias:"limitFile"
  }); //初始化上传方法
  public uploaders:FileUploader = new FileUploader({
    url: '/upload/basic/upload',
    itemAlias:"limitFile"
  }); //初始化上传方法

  constructor(public settings: SettingsService,private routeInfo:ActivatedRoute,private ajax:AjaxService,private router:Router,private AppIndexOptComponent:AppIndexOptComponent,private patterns: PatternService,private mask: MaskService,private getUid:GetUidService) {
    this.settings.showRightPage("30%"); // 此方法必须调用！页面右侧显示，带滑动效果,可以自定义宽度：..%  或者 ..px
  }

  ngOnInit() {
    let _this = this;
    _this.queryId = this.routeInfo.snapshot.queryParams['number'];
    _this.id = this.routeInfo.snapshot.queryParams['id'];
    _this.queryData();//请求详细数据，并显示
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

    if(typeof(this.id)) {

      this.ajax.get({
        url: '/phone/indexOptType/load',
        async: false, //同步请求
        data: {id: this.id},
        success: (res) => {
          this.limitForm = res;

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
            swal('添加模板类型提交失败====！', 'error');
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
            swal(res.info, '', 'error');
          }
        },
        error: (data) => {
          swal('修改模板类型失败！', '','error');
        }
      });
    }
    //添加首页模板
    else if(_this.queryId == 3){
      _this.uploadImg(value);

    }
    //修改首页模板
    else{
      _this.ajax.post({
        url: '/phone/indexTpl/update',
        data: {
          'tplCode': value.tplCode,
          'tplName': value.tplName,
          'tplUrl': value.tplUrl,
          'tplImg':value.tplImg,
          'tplCheckedImg':value.tplCheckedImg,
          'tplDesc':value.tplDesc,
          'tplImgCount':value.tplImgCount,
          'tplAuthor':value.tplAuthor,
          'tplType':value.tplType
        },
        success: (res) => {
          if (res.success) {
            _this.router.navigate(['/main//app/app-index-opt'], {replaceUrl: true}); //路由跳转
            swal('修改首页模板提交成功！', '','success');
            _this.AppIndexOptComponent.getAgentList()//实现刷新
          } else {
            swal('修改首页模板提交失败====！', 'error');
          }
        },
        error: (data) => {
          swal('修改首页模板提交失败！', '','error');
        }
      })
    }
  }

  private submitDatas(value){
    let _this = this;
    _this.ajax.post({
      url: '/phone/indexTpl/insert',
      data: {
        'tplCode': value.tplCode,
        'tplName': value.tplName,
        'tplUrl': value.tplUrl,
        'tplImg':value.tplImg,
        'tplCheckedImg':value.tplCheckedImg,
        'tplDesc':value.tplDesc,
        'tplImgCount':value.tplImgCount,
        'tplAuthor':value.tplAuthor,
        'tplType':value.tplType
      },
      success: (res) => {
        if (res.success) {
          _this.router.navigate(['/main//app/app-index-opt'], {replaceUrl: true}); //路由跳转
          swal('添加首页模板提交成功！', '','success');
          _this.AppIndexOptComponent.getAgentList()//实现刷新
        } else {
          swal('添加首页模板提交失败====！', 'error');
        }
      },
      error: (data) => {
        swal('添加首页模板提交失败！', '','error');
      }
    })
  }

  /**
   * 商品规格图片上传
   */
  private uploadImg(value) {
    let me = this, uploadedNum = 0;
    let allUploaders = [
      me.uploader,
      me.uploaders
    ];
    allUploaders.forEach((uploader, i) => {
      uploader.uploadAll();//全部上传
      if (!uploader.isUploading) uploadedNum += 1;  //如果该组不需要上传图片则uploadedNum+1
      uploader.queue.forEach((item, index) => {
        item.onSuccess = function (response, status, headers) {
          if (!isNullOrUndefined(response)) {
            let res = JSON.parse(response);
            if (!res.success) {
              AppComponent.rzhAlt('error',uploader.queue[0]._file.name+'上传失败')
            }
          }
        }
      })
      uploader.onCompleteAll = function () {
        uploadedNum += 1;     // 该组上传完之后uploadedNum+1；
        if (uploadedNum == allUploaders.length) {  // 当有图片上传，并且是图片组的最后一个时
          me.submitDatas(value)     //整理数据并且提交数据
        }
      }
      // 每张图片上传结束后，判断如果是最后一组图片则提交，不是最后一组会进入下一个循环
      if (uploadedNum == allUploaders.length) {  // 当有图片上传，并且是图片组的最后一个时
        me.submitDatas(value)       //整理数据并且提交数据
      }
    })
  }
}
