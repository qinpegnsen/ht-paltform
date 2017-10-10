import {Component, OnInit} from '@angular/core';
import {PageEvent} from '../../../shared/directives/ng2-datatable/DataTable';
import {SubmitService} from '../../../core/forms/submit.service';
import {ActivatedRoute} from '@angular/router';
import {FileUploader} from 'ng2-file-upload';
import {isNullOrUndefined} from 'util';
import {AppComponent} from '../../../app.component';

@Component({
  selector: 'app-app-set',
  templateUrl: './app-set.component.html',
  styleUrls: ['./app-set.component.scss']
})
export class AppSetComponent implements OnInit {
  public items;
  private moduleList = [];
  private contentList = [];
  private item;
  private curItem;
  private flag = [];
  private isShowContent=false;
  public optType: Array<any> = new Array();
  public isEntered: Array<any> = new Array();
  public typeDesc: Array<any> = new Array();
  private optTypeList: any;
  private myImg: any;
  public uploader:FileUploader = new FileUploader({
    url: '/upload/basic/upload',
    itemAlias:"limitFile"
  }); //初始化上传方法

  constructor(private submit: SubmitService, private routeInfo: ActivatedRoute) {
  }

  ngOnInit() {
    let _this = this;
    _this.queryDatas(_this.item);
    _this.queryData();
  }

  /**
   * 监听图片选择
   * @param $event
   */
  fileChangeListener() {
    console.log("█ this.uploader.queue ►►►",  this.uploader.queue);
    
    // 当选择了新的图片的时候，把老图片从待上传列表中移除
    if(this.uploader.queue.length > 1) this.uploader.queue[0].remove();
    this.myImg = true;  //表示已经选了图片
  }


  /**
   * 查询列表
   * @param event
   * @param curPage
   */
  public queryDatas(event?: PageEvent) {
    let _this = this, activePage = 1;
    if (typeof event !== 'undefined') {
      activePage = event.activePage;
    }
    let requestUrl = '/phone/indexTpl/list';
    let requestData = {};
    _this.items = _this.submit.getData(requestUrl, requestData);
  }

  /**
   *数组添加中心模块
   * @param item
   */
  public addTpl(item) {
    this.isShowContent=false;
    this.moduleList.push({reslut:item.tplCheckedImg, index: this.moduleList.length + 1, data: item});

  }

  /**
   * 点击模板获取操作提示小信息p
   * @param item
   */
  public addTplCont(item) {
    this.isShowContent=true;
    let _this = this;
    _this.curItem = item;
    this.contentList.splice(0,this.contentList.length);
    for(let i=0;i<item.tplImgCount;i++){
      this.contentList.push(i);
    }

  }


  /**
   * 获取点击下拉框是当前的模板类型和模板类型小提示
   * @param i
   */
  public showDesc(i){
    let _this = this;
    _this.isEntered[i]= _this.optType[i].isEntered;
    _this.typeDesc[i]= _this.optType[i].typeDesc;
  }

  /**
   * 点击模板获取操作类型
   */
  queryData() {
    let _this = this;
    let requestUrl = '/phone/indexOptType/list';
    let requestData = {};
    _this.optTypeList = _this.submit.getData(requestUrl, requestData);
  }

  /**
   * 上传图片时鼠标滑过显示遮罩层
   */
  showMask1(i){
    this.flag[i]=true;
  }

  /**
   * 上传图片时鼠标离开时遮罩层消失
   */
  hideMask1(i){
    this.flag[i]=false;
  }
  /**
   * 首页模板图片上传
   */
  private uploadImg(value) {
    let me = this, uploadedNum = 0;
    let allUploaders = [
      me.uploader,
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
        }
      }
      // 每张图片上传结束后，判断如果是最后一组图片则提交，不是最后一组会进入下一个循环
      if (uploadedNum == allUploaders.length) {  // 当有图片上传，并且是图片组的最后一个时
      }
    })
  }


  private addModel(){

  }
}
