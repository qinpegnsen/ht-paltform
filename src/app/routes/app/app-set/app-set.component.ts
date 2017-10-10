import {Component, OnInit} from '@angular/core';
import {PageEvent} from '../../../shared/directives/ng2-datatable/DataTable';
import {SubmitService} from '../../../core/forms/submit.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FileUploader} from 'ng2-file-upload';
import {isNullOrUndefined} from 'util';
import {AppComponent} from '../../../app.component';
import {AjaxService} from '../../../core/services/ajax.service';
import {GetUidService} from '../../../core/services/get-uid.service';
const swal = require('sweetalert');

@Component({
  selector: 'app-app-set',
  templateUrl: './app-set.component.html',
  styleUrls: ['./app-set.component.scss']
})
export class AppSetComponent implements OnInit {
  public items;
  private moduleList = [];
  private contentList = [];
  private ord;
  private phoneIndexId: Array<any> = new Array();
  private item;
  private curItem;
  private flag = [];
  private isShowContent = false;
  public optType: Array<any> = new Array();
  public isEntered: Array<any> = new Array();
  public typeDesc: Array<any> = new Array();
  public optTypeCode: Array<any> = new Array();
  private optKey: Array<any> = new Array();
  private contents: Array<any> = new Array();
  private optTypeList: any;
  private myImg: any;
  public uploaders: Array<FileUploader> = new Array();


  constructor(private submit: SubmitService, private routeInfo: ActivatedRoute, private ajax: AjaxService, private router: Router, private GetUidService: GetUidService) {
  }

  ngOnInit() {
    let _this = this;
    _this.queryDatas(_this.item);
    _this.queryData();
  }

  // 取消
  cancel() {
    let _this = this;
    _this.isShowContent = false;
  }

  /**
   * 监听图片选择
   * @param $event
   */
  fileChangeListener(i) {
    // 当选择了新的图片的时候，把老图片从待上传列表中移除
    // if (this.uploaders[i].queue.length > 1) this.uploaders[i].queue[0].remove();
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
    this.isShowContent = false;
    this.moduleList.push({reslut: item.tplCheckedImg, index: this.moduleList.length + 1, data: item});

  }

  /**
   * 点击模板获取信息
   * @param item
   */
  public addTplCont(item, i) {

    console.log('█ item ►►►', item);
    this.isShowContent = true;
    let _this = this;
    let indexId = _this.phoneIndexId[i-1];
    console.log('█ phoneIndexId ►►►', _this.phoneIndexId[i-1]);
    if(typeof(indexId)!='undefined'){//去load

    }else {//显示添加页面
      _this.ord = i;
      _this.curItem = item;
      _this.ord = i;
      this.contentList.splice(0, this.contentList.length);
      this.uploaders.splice(0, this.uploaders.length);
      for (let i = 0; i < item.tplImgCount; i++) {
        this.contentList.push(i);
        let uploader: FileUploader = new FileUploader({
          url: '/upload/basic/upload',
          itemAlias: 'limitFile',
        }); //初始化上传方法
        this.uploaders.push(uploader);
      }
    }
  }


  /**
   * 获取点击下拉框是当前的模板类型和模板类型小提示
   * @param i
   */
  public showDesc(i) {
    let _this = this;
    _this.isEntered[i] = _this.optType[i].isEntered;
    _this.typeDesc[i] = _this.optType[i].typeDesc;
    _this.optTypeCode[i] = _this.optType[i].optTypeCode;
    if (_this.isEntered[i] == 'N') {
      _this.optKey[i] = 0;
    }
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
  showMask1(i) {
    this.flag[i] = true;
  }

  /**
   * 上传图片时鼠标离开时遮罩层消失
   */
  hideMask1(i) {
    this.flag[i] = false;
  }

  /**
   * 添加首页模板内容
   */
  addModel() {
    this.uploadImg()
  }

  /**
   * 添加首页模板内容
   */
  addContent() {
    let _this = this;
    _this.ajax.post({
      url: '/phone/index/insert',
      data: {
        tplCode: _this.curItem.tplCode,
        ord: _this.ord,
        contents: _this.contents.join(','),
        optTypeCodes: _this.optTypeCode.join(','),
        optKeys: _this.optKey.join(',')
      },
      success: (res) => {
        if (res.success) {
          _this.router.navigate(['/main/app/app-set'], {replaceUrl: true}); //路由跳转
          swal('添加首页模板提交成功！', '', 'success');
          _this.isShowContent = false;
          _this.phoneIndexId[_this.ord-1] = res.data;
          _this.contentList.splice(0, _this.contentList.length);
          _this.uploaders.splice(0, _this.uploaders.length);

          _this.contents.splice(0, _this.contents.length);
          _this.optTypeCode.splice(0, _this.optTypeCode.length);
          _this.optType.splice(0, _this.optType.length);
          _this.typeDesc.splice(0, _this.typeDesc.length);
          _this.isEntered.splice(0, _this.isEntered.length);
          _this.optKey.splice(0, _this.optKey.length);
        } else {
          swal('添加首页模板提交失败====！', 'error');
        }
      },
      error: (data) => {
        swal('添加首页模板提交失败！', '', 'error');
      }
    })
  }

  /**
   * 图片上传
   */
  uploadImg() {
    let me = this;
    let i;
    let imgCount=me.optTypeCode.length;
    for (i=0;i < imgCount; i++) {
      /**
       * 构建form时，传入自定义参数
       * @param item
       */
      me.uploaders[i].onBuildItemForm = function (fileItem, form) {
        console.log('█ fileItem ►►►', fileItem);
        let uuid = me.GetUidService.getUid();
        form.append('uuid', uuid);
        me.contents.push(uuid);
        console.log("█ me.contents ►►►",  me.contents);
      };
      /**
       * 执行上传
       */
      me.uploaders[i].uploadAll();
      /**
       * 上传成功处理
       * @param item 上传列表
       * @param response 返回信息
       * @param status 状态
       * @param headers 头信息
       */
      me.uploaders[i].onSuccessItem = function (item, response, status, headers) {
        let res = JSON.parse(response);
        if (res.success) {
          item.remove();
          console.log('█ \'上传图片成功\' ►►►', '上传图片成功');
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
      me.uploaders[i].onErrorItem = function (item, response, status, headers) {
        AppComponent.rzhAlt('error', '上传失败', '图片上传失败！');
      };
    }
    /**
     * 所有图片都上传成功后执行添加文章
     */
    if(i==imgCount){
      me.addContent();
    }
  }
}







