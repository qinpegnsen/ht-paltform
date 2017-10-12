import {Component, OnInit} from '@angular/core';
import {PageEvent} from '../../../shared/directives/ng2-datatable/DataTable';
import {SubmitService} from '../../../core/forms/submit.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FileUploader} from 'ng2-file-upload';
import {AppComponent} from '../../../app.component';
import {AjaxService} from '../../../core/services/ajax.service';
import {GetUidService} from '../../../core/services/get-uid.service';
import {ImgUrlPipe} from '../../../shared/pipe/img-url.pipe';
import {DomSanitizer} from '@angular/platform-browser';
import {AppSetService} from './app-set.service';
const swal = require('sweetalert');

@Component({
  selector: 'app-app-set',
  templateUrl: './app-set.component.html',
  styleUrls: ['./app-set.component.scss']
})
export class AppSetComponent implements OnInit {
  public items;
  public indexTpls: Array<any> = new Array();
  private moduleList: Array<any> = new Array();
  private contentList = [];
  private ord;
  private phoneIndexId: Array<any> = new Array();
  private item;
  private curItem;
  private flag = [];
  private flags = [];
  private isShowContent = false;
  public optTypeIndex: Array<any> = new Array();
  public isEntered: Array<any> = new Array();
  public typeDesc: Array<any> = new Array();
  public optTypeCode: Array<any> = new Array();
  private optKey: Array<any> = new Array();
  private contents: Array<any> = new Array();
  private ids: Array<any> = new Array();
  public uploaders: Array<FileUploader> = new Array();
  private optTypeList: any;
  private myImg: any;
  public id: string;
  public curCancelOrderId: string;
  private showAddWindow:boolean = false;


  constructor(private submit: SubmitService, private routeInfo: ActivatedRoute, private ajax: AjaxService, private router: Router, private GetUidService: GetUidService, private AppSetService: AppSetService) {
  }

  ngOnInit() {
    let _this = this;
    _this.id = this.routeInfo.snapshot.queryParams['id'];
    _this.queryDatas(_this.item);//查询模板列表
    _this.queryData();//获取模板获取操作类型
    _this.queryTplList();//查询选中效果模板列表
  }

  // 取消
  cancel() {
    let _this = this;
    _this.isShowContent = false;
  }



  /*
   * 添加弹窗
   * */
  addNewData() {
    this.showAddWindow = true;
  }

  getUpdateResult(data) {
    this.showAddWindow = false;
    // if(data == 'success')
  }

  /**
   * 监听图片选择
   * @param $event
   */
  fileChangeListener(i) {
    let _this = this;
    // 当选择了新的图片的时候，把老图片从待上传列表中移除
    // (_this.uploaders[i].queue.length > 1) _this.uploaders[i].queue.splice(0,1);
    _this.myImg = true;  //表示已经选了图片


  }


  /**
   * 查询首页模板列表
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
   * 查询选中效果模板列表
   * @param event
   * @param curPage
   */
  public queryTplList(event?: PageEvent) {
    let _this = this, activePage = 1;
    if (typeof event !== 'undefined') {
      activePage = event.activePage;
    }
    let requestUrl = '/phone/index/tplList';
    let requestData = {};
    _this.indexTpls = _this.submit.getData(requestUrl, requestData);
    for (let indexTpl = 0; indexTpl < _this.indexTpls.length; indexTpl++) {
      this.moduleList.push({
        reslut: _this.indexTpls[indexTpl].phoneIndexTpl.tplCheckedImg,
        index: this.moduleList.length + 1,
        data: _this.indexTpls[indexTpl].phoneIndexTpl
      });
      _this.phoneIndexId[indexTpl] = _this.indexTpls[indexTpl].id;
    }
  }


  /**
   *数组添加中心模块
   * @param itemfor
   */
  public addTpl(item) {
    this.isShowContent = false;
    this.moduleList.push({reslut: item.tplCheckedImg, index: this.moduleList.length + 1, data: item});
  }

  /* **
   * 请求模板信息详细数据，并显示()
   */
  public queryContentList(item, indexId, i) {
    this.ajax.get({
      url: '/phone/index/indexContentList',
      async: false, //同步请求
      data: {phoneIndexId: indexId},
      success: (res) => {
        this.curItem = item;
        this.ord = i;
        this.contentList.splice(0, this.contentList.length);
        this.uploaders.splice(0, this.uploaders.length);
        this.contents.splice(0, this.contents.length);
        this.optTypeCode.splice(0, this.optTypeCode.length);
        this.optTypeIndex.splice(0, this.optTypeIndex.length);
        this.typeDesc.splice(0, this.typeDesc.length);
        this.isEntered.splice(0, this.isEntered.length);
        this.optKey.splice(0, this.optKey.length);
        this.ids.splice(0, this.ids.length);

        for (let i = 0; i < res.length; i++) {
          this.contents[i] = res[i].content;
          this.ids[i] = res[i].id;

          this.optKey[i] = res[i].optKey;
          this.optTypeCode[i] = res[i].optTypeCode;
          this.isEntered[i] = res[i].phoneIndexOptType.isEntered;
          this.typeDesc[i] = res[i].phoneIndexOptType.typeDesc;

          for (let j = 0; j < this.optTypeList.length; j++) {
            if (res[i].optTypeCode == this.optTypeList[j].optTypeCode) {
              this.optTypeIndex.push(j);
            }
          }
          this.contentList.push(i);
          let uploader: FileUploader = new FileUploader({
            url: '/upload/basic/upload',
            itemAlias: 'limitFile'
          }); //初始化上传方法
          this.uploaders.push(uploader);

        }
        ;

      },
      error: (res) => {
        console.log('post limit error');
      }
    });
  }

  /**
   * 点击模板获取信息
   * @param item
   */
  public addTplCont(item, i) {
    this.isShowContent = true;
    let _this = this;
    let indexId = _this.phoneIndexId[i - 1];
    if (typeof(indexId) != 'undefined') {//去load
      _this.queryContentList(item, indexId, i);
    } else { //显示添加页面
      _this.curItem = item;
      _this.ord = i;

      _this.contentList.splice(0, _this.contentList.length);
      _this.uploaders.splice(0, _this.uploaders.length);
      _this.contents.splice(0, _this.contents.length);
      _this.optTypeCode.splice(0, _this.optTypeCode.length);
      _this.typeDesc.splice(0, _this.typeDesc.length);
      _this.isEntered.splice(0, _this.isEntered.length);
      _this.optKey.splice(0, _this.optKey.length);
      _this.ids.splice(0, _this.ids.length);
      _this.optTypeIndex.splice(0, _this.optTypeIndex.length);

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
   * 操作首页模板的遮罩层
   * @param i
   */
  show(i) {
    this.flags[i] = true;
    for (let j = 0; j < this.flags.length; j++) {
      this.flags[j] = false;
      this.flags[i] = true;
    }
  }

  /**
   * 获取点击下拉框是当前的模板类型和模板类型小提示
   * @param i
   */
  public showDesc(i) {
    let _this = this;
    _this.isEntered[i] = _this.optTypeList[_this.optTypeIndex[i]].isEntered;
    _this.typeDesc[i] = _this.optTypeList[_this.optTypeIndex[i]].typeDesc;
    _this.optTypeCode[i] = _this.optTypeList[_this.optTypeIndex[i]].optTypeCode;
    if (_this.isEntered[i] == 'N') {
      _this.optKey[i] = '0';
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
          _this.phoneIndexId[_this.ord - 1] = res.data;
          _this.contentList.splice(0, _this.contentList.length);
          _this.uploaders.splice(0, _this.uploaders.length);

          _this.contents.splice(0, _this.contents.length);
          _this.optTypeCode.splice(0, _this.optTypeCode.length);
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
   * 删除首页模板
   */
  deleteModel(i) {
    let _this = this, url: string = '/phone/index/delete', data: any;
    let indexId = _this.phoneIndexId[i - 1];
    swal({
        title: '确认删除此模板？',
        type: 'info',
        confirmButtonText: '确认', //‘确认’按钮命名
        showCancelButton: true, //显示‘取消’按钮
        cancelButtonText: '取消', //‘取消’按钮命名
        closeOnConfirm: false  //点击‘确认’后，执行另外一个提示框
      },
      function () {  //点击‘确认’时执行
        swal.close(); //关闭弹框
        if (typeof(indexId) != 'undefined') {
          data = {
            id: indexId
          }
          console.log(data)
          _this.AppSetService.delCode(url, data); //删除数据
        }
        _this.moduleList.splice(i - 1, 1);
        _this.flags[i - 1] = false;
        _this.isShowContent = false;
      }
    );
  }


  /**
   * 图片上传
   */
  uploadImg() {
    let me = this;
    let i;
    let imgCount = me.optTypeCode.length;
    for (i = 0; i < imgCount; i++) {
      /**
       * 构建form时，传入自定义参数
       * @param item
       */
      me.uploaders[i].onBuildItemForm = function (fileItem, form) {
        console.log('█ fileItem ►►►', fileItem);
        let uuid = me.GetUidService.getUid();
        form.append('uuid', uuid);
        me.contents.push(uuid);
        console.log('█ me.contents ►►►', me.contents);
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
     * 所有图片都上传成功后提交
     */
    if (i == imgCount) {
      me.addContent();
    }
  }
}







