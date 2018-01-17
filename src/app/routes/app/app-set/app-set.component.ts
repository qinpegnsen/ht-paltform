import {Component, OnInit} from '@angular/core';
import {PageEvent} from '../../../shared/directives/ng2-datatable/DataTable';
import {SubmitService} from '../../../core/forms/submit.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FileUploader} from 'ng2-file-upload';
import {AppComponent} from '../../../app.component';
import {AjaxService} from '../../../core/services/ajax.service';
import {GetUidService} from '../../../core/services/get-uid.service';
import {AppSetService} from './app-set.service';
const swal = require('sweetalert');
declare var $;
@Component({
  selector: 'app-app-set',
  templateUrl: './app-set.component.html',
  styleUrls: ['./app-set.component.scss']
})

export class AppSetComponent implements OnInit {
  public items;//获取首页选中模板列表
  public indexTpls: Array<any> = new Array();//选中效果模板ID
  public moduleList: Array<any> = new Array();//获取选中效果模板列表
  public contentList: Array<any> = new Array();//获取选中模板的详细信息
  public ord;//每个选中模板的下标
  public phoneIndexId: Array<any> = new Array();//首页模板ID
  public item;//获取首页模板列表
  public curItem;//点击选中首页模板时相对应的详细信息
  public flag: Array<any> = new Array();//判断选中首页模板信息的图片遮罩层是否显示
  public flags: Array<any> = new Array();//判断选中模板的遮罩层是否显示
  public isShowContent = false;//判断选中模板信息是否显示
  public optTypeIndex: Array<any> = new Array();//获取选中模板的下标
  public isEntered: Array<any> = new Array();//获取选中模板后，判断input框是否可以输入
  public typeDesc: Array<any> = new Array();//获取选中模板的操作类型
  public optTypeCode: Array<any> = new Array();//获取选中模板的操作类型编码
  public optKey: Array<any> = new Array();//获取选中模板的input中的操作内容
  public contents: Array<any> = new Array();//获取选中模板的图片暗码或者内容
  public updateIds: Array<any> = new Array();//获取已经上传后的选中模板返回的ID
  public updateImgs: Array<any> = new Array();//获取已经上传后的选中模板返回的ID
  public ids: Array<any> = new Array();//提交后选中模板中的每个模板值的ID
  public uploaders: Array<FileUploader> = new Array();//清空选中模板的图片
  public goodsList: Array<any> = new Array();//商品列表
  public optTypeList: any;//操作类型的列表
  public myImg: any;//上传图片
  public tplImgCount: any;//模板图片数量
  public tplType: any;//模板类型
  public isAdd: boolean = true;//是否是新增内容
  public indexId: any;//没有发布的选中模板的ID
  public indexData: any;//已经发布成功的选中模板ID
  public id: string;//删除选中模板的ID
  public curCancelOrderId: string;
  public showAddWindow: boolean = false;//设置首页在某端显示的弹窗

  public updateIndexContentIds: Array<any> = new Array();//获取修改时选中模板的ID
  public updateContents: Array<any> = new Array();//获取修改时选中模板的图片暗码或者内容
  public updateOptTypeCode: Array<any> = new Array();//获取修改时选中模板的操作类型编码
  public updateOptKey: Array<any> = new Array();//获取修改时选中模板的操作内容

  constructor(public submit: SubmitService,
              public routeInfo: ActivatedRoute,
              public ajax: AjaxService,
              public router: Router,
              public GetUidService: GetUidService,
              public AppSetService: AppSetService) {
  }

  ngOnInit() {
    let _this = this;
    _this.id = this.routeInfo.snapshot.queryParams['id'];
    _this.queryDatas(_this.item);//查询模板列表
    _this.queryData();//获取模板获取操作类型
    _this.moduleList = new Array();
    _this.queryTplList();//查询选中效果模板列表
    _this.queryAllGoods();//查询出所有商品
  }

  // 取消
  cancel() {
    let _this = this;
    _this.isShowContent = false;//点击取消时选中模板的详细信息隐藏
    this.flags = this.flags.map(it => {
      return it = false;
    });
  }

  /*
   * 添加弹窗
   * */
  addNewData(indexData) {
    this.indexId = indexData.indexId;//没有发布的选中模板的ID
    this.indexData = indexData;//已经发布成功的选中模板ID
    this.showAddWindow = true;//设置首页在某端显示的弹窗显示
  }

  /**
   * 提交设置在某端显示
   * @param data
   */
  getUpdateResult() {
    this.showAddWindow = false;//弹窗隐藏
  }

  /**
   * 监听图片选择
   * @param $event
   */
  fileChangeListener(i) {
    let _this = this;
    // 当选择了新的图片的时候，把老图片从待上传列表中移除
    if (_this.uploaders[i].queue.length > 1) _this.uploaders[i].queue.splice(0, 1);
    _this.myImg = true;  //表示已经选了图片

    /**
     * 首页模板发布成功后会返回一个ID
     * 发布成功后在选中模板中
     * 如果没有ID的时候是undefined
     * @type {any}
     */
    _this.addUpdateId(i);
    _this.updateImgs[i] = 1;
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
      let tplItem = _this.indexTpls[indexTpl], content: Array<any> = tplItem.indexContentList.map(item => {
        return item.content;
      });
      this.moduleList.push({
        tplCode: tplItem.tplCode,
        reslut: tplItem.phoneIndexTpl.tplCheckedImg,
        tplWidth: tplItem.phoneIndexTpl.tplWidth,
        tplHeight: tplItem.phoneIndexTpl.tplHeight,
        index: this.moduleList.length + 1,
        indexData: tplItem,
        data: tplItem.phoneIndexTpl,
        content: content
      });
      _this.phoneIndexId[indexTpl] = tplItem.indexId;
    }
  }


  /**
   *数组添加选中模块
   * @param itemfor
   */
  public addTpl(item) {
    //隐藏模板信息是否显示
    this.isShowContent = false;
    //点击模板的时候pus到中心，添加选中的模板
    this.moduleList.push({
      reslut: item.tplCheckedImg,
      tplWidth: item.tplWidth,
      tplHeight: item.tplHeight,
      index: this.moduleList.length + 1,
      indexData: null,
      data: item,
    });
    setTimeout(_ => {$('.main_centerOne')[0].scrollTop = $('.main_centerOne')[0].scrollHeight;},0)// 使滚动条一直保持在最底部
  }

  /**
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
        /**
         * 点击当前的获取当前的信息，点击其他模板的时清空
         */
        this.contentList = new Array();//清空选中模板的详细信息
        this.uploaders = new Array();//清空选中模板的图片
        this.contents = new Array();//清空选中模板的图片暗码或者内容
        this.optTypeCode = new Array();//清空选中模板的操作类型编码
        this.optTypeIndex = new Array();//清空选中模板的下标
        this.typeDesc = new Array();//清空选中模板的操作类型
        this.isEntered = new Array();//清空选中模板的input是否可以输入
        this.optKey = new Array();//清空选中模板的input中的操作内容
        this.ids = new Array();//提交后选中模板中的每个模板值的ID

        /**
         * 查询模板信息说明这个模板已经发布过了
         * 把上传图片循环（因为模板值不止一个，也是未知的）模板值上传图片只能唯一，但是可以有多个模板值
         */
        this.tplImgCount = res.length;
        this.tplType = res[0].tplType;
        for (let i = 0; i < this.tplImgCount; i++) {
          this.contents[i] = res[i].content;//选中模板的图片暗码或者内容
          this.ids[i] = res[i].id;//提交后选中模板中的每个模板值的ID

          this.optKey[i] = res[i].optKey;//选中模板的input中的操作内容
          this.optTypeCode[i] = res[i].optTypeCode;//选中模板的操作类型编码

          this.isEntered[i] = res[i].phoneIndexOptType && res[i].phoneIndexOptType.isEntered ? res[i].phoneIndexOptType.isEntered : 'N';//选中模板后，input框是否可以输入
          this.typeDesc[i] = res[i].phoneIndexOptType && res[i].phoneIndexOptType.typeDesc ? res[i].phoneIndexOptType.typeDesc : '';//选中模板的操作类型

          for (let j = 0; j < this.optTypeList.length; j++) {
            if (res[i].optTypeCode == this.optTypeList[j].optTypeCode) {
              this.optTypeIndex.push(j);
            }
          }
          this.contentList.push(i);//选中模板的详细信息
          let uploader: FileUploader = new FileUploader({
            url: 'upload/basic/phoneIndexUpload',
            itemAlias: 'limitFile'
          }); //初始化上传方法
          this.uploaders.push(uploader);
        }

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
    _this.indexId = _this.phoneIndexId[i - 1];
    if (typeof(_this.indexId) != 'undefined') {//去load
      _this.isAdd = false;
      _this.queryContentList(item, _this.indexId, i);
    } else { //显示添加页面
      _this.isAdd = true;
      _this.curItem = item;
      _this.ord = i;
      /**
       * 点击当前的获取当前的信息，点击其他模板的时清空
       */
      _this.contentList = new Array();//清空选中模板的详细信息
      _this.uploaders = new Array();//清空选中模板的图片
      _this.contents = new Array();//清空选中模板的图片暗码或者内容
      _this.optTypeCode = new Array();//清空选中模板的操作类型编码
      _this.typeDesc = new Array();//清空选中模板的操作类型
      _this.isEntered = new Array();//清空选中模板的input是否可以输入
      _this.optKey = new Array();//清空选中模板的input中的操作内容
      _this.ids = new Array();//提交后选中模板中的每个模板值的ID
      _this.optTypeIndex = new Array();//选中模板的下标

      _this.tplImgCount = item.tplImgCount;
      _this.tplType = item.tplType;
      for (let i = 0; i < _this.tplImgCount; i++) {
        this.contentList.push(i);
        let uploader: FileUploader = new FileUploader({
          url: 'upload/basic/phoneIndexUpload',
          itemAlias: 'limitFile',
        }); //初始化上传方法
        this.uploaders.push(uploader);
      }
    }
    _this.show(i - 1);
  }

  /**
   * 操作首页模板的遮罩层
   * @param i
   */
  show(i) {
    this.flags = this.flags.map(it => {
      return it = false;
    });
    this.flags[i] = true;
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
    _this.addUpdateId(i);
  }

  /**
   * addUpdateId
   */
  addUpdateId(i) {
    let _this = this;
    let upid = _this.ids[i];
    if (typeof(upid) != 'undefined') {
      _this.updateIds[i] = i;
    }
  }

  /**
   * 选择完商品
   */
  selectedGoods(event, i) {
    this.optKey[i] = event[0].goodsBaseCode;
    this.addUpdateId(i);
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
   * 上移下移模板时翻新moduleList
   */
  fanxin() {
    let _this = this;
    let newModuleList: Array<any> = new Array();
    for (let k = 0; k < _this.moduleList.length; k++) {
      let item = _this.moduleList[k].data,
        itemIndexContentList = _this.moduleList[k].indexData.indexContentList,
        content: Array<any> = itemIndexContentList.map(it => {
          return it.content;
        });
      newModuleList.push({
        tplCode: item.tplCode,
        reslut: item.tplCheckedImg,
        tplWidth: item.tplWidth,
        tplHeight: item.tplHeight,
        index: newModuleList.length + 1,
        indexData: _this.moduleList[k].indexData,
        data: item,
        content: content
      });
      _this.phoneIndexId[k] = _this.moduleList[k].indexData.indexId;
    }
    _this.moduleList = newModuleList
  }

  /**
   * 模板上移
   */
  moveUp() {
    let _this = this;
    if (_this.ord > 1) {
      let m1 = _this.moduleList[_this.ord - 1];//当前
      let m2 = _this.moduleList[_this.ord - 1 - 1];//前一个
      _this.moduleList[_this.ord - 1] = m2;
      _this.moduleList[_this.ord - 1 - 1] = m1;
      _this.flags[_this.ord - 1] = false;
      _this.flags[_this.ord - 1 - 1] = true;
      _this.fanxin();
      _this.ord = _this.ord - 1;
    }

    _this.ajax.post({
      url: '/phone/index/updateOrd',
      data: {
        indexId: _this.indexId,
        moves: '1',
        sx: 'SY'
      },
      error: (data) => {
        swal('失败！', '', 'error');
      }
    })
  }

  /**
   * 模板下移
   */
  moveDown() {
    let _this = this;
    if (_this.ord < _this.moduleList.length) {
      let m1 = _this.moduleList[_this.ord - 1];
      let m2 = _this.moduleList[_this.ord + 1 - 1];
      _this.moduleList[_this.ord - 1] = m2;
      _this.moduleList[_this.ord + 1 - 1] = m1;
      _this.flags[_this.ord - 1] = false;
      _this.flags[_this.ord + 1 - 1] = true;
      _this.ord = _this.ord + 1;
      _this.fanxin();
    }

    _this.ajax.post({
      url: '/phone/index/updateOrd',
      data: {
        indexId: _this.indexId,
        moves: '1',
        sx: 'XY'
      },
      error: (data) => {
        swal('失败！', '', 'error');
      }
    })
  }

  /**
   * 添加首页模板内容
   */
  addModel() {
    let _this = this;
    let flag = true;
    if (_this.isAdd && _this.tplType == 'IMG') {//说明是新增，新增判断是否上传图片
      let imgCount = _this.tplImgCount;
      //校验添加首页模板内容时的操作类型值必填
      for (let n = 0; n < imgCount; n++) {
        if ($('.optKey')[n].value == '') {
          if ($($('.optKey')[n]).attr('disabled') == 'disabled') {
          } else {
            flag = false;
            swal('第' + (n + 1) + '个操作类型值没有填');
            break;
          }
        }
      }
      //校验添加首页模板内容时的操作类型必填
      for (let j = 0; j < imgCount; j++) {
        if ($('.optTypeList')[j].value == '') {
          flag = false;
          swal('第' + (j + 1) + '个操作类型没有选');
          break;
        }
      }
      //校验添加首页模板内容时的图片必填
      for (let i = 0; i < imgCount; i++) {
        if (_this.uploaders[i].queue.length < 1) {
          flag = false;
          swal('第' + (i + 1) + '个图片未上传');
          break;
        }
      }
    }
    if (flag) {
      this.uploadImg()
    }
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
        contents: _this.contents.join('szhgj'),
        optTypeCodes: _this.optTypeCode.join('szhgj'),
        optKeys: _this.optKey.join('szhgj')
      },
      success: (res) => {
        if (res.success) {
          setTimeout(_ => {
            _this.moduleList = new Array();
            _this.queryTplList();
          }, 1000);
          // _this.router.navigate(['/main/app/app-set'], {replaceUrl: true}); //路由跳转
          swal('添加首页模板提交成功！', '', 'success');
          _this.indexId = res.data.indexId;
          _this.phoneIndexId[_this.ord - 1] = _this.indexId;
          _this.moduleList[_this.ord - 1].indexData = res.data;
        } else {
          swal('添加首页模板提交失败====！', '', 'error');
        }
      },
      error: (data) => {
        swal('添加首页模板提交失败！', '', 'error');
      }
    })
    this.isShowContent = false;
    /**
     * 清空模板的信息
     */
    _this.contentList = new Array();
    _this.uploaders = new Array();
    _this.contents = new Array();
    _this.optTypeCode = new Array();
    _this.typeDesc = new Array();
    _this.isEntered = new Array();
    _this.optKey = new Array();
  }


  /**
   * 修改首页模板内容
   * 1.获取到发布时返回的ID
   * 2.因为模板的模板值不是唯一并且是未知的个数，修改时有可能只修改某一个模板值，所以修改哪个模板值就提交某个模板值，没有修改的不提交
   * 3.把修改后的模板信息再push到模板信息中然后发布
   */
  updateContent() {
    let _this = this, flag = true, uplength = _this.updateIds.length;
    if (uplength > 0) {
      for (let h = 0; h < uplength; h++) {
        let updateIndex = _this.updateIds[h];
        if (typeof(updateIndex) != 'undefined') {
          _this.updateIndexContentIds.push(_this.ids[updateIndex]);
          if (_this.updateImgs[h] == 1 || _this.tplType == 'TXT') {
            _this.updateContents.push(_this.contents[updateIndex]);
          } else {
            _this.updateContents.push('0');
          }
          _this.updateOptTypeCode.push(_this.optTypeCode[updateIndex]);
          _this.updateOptKey.push(_this.optKey[updateIndex]);
        }
      }
    } else {
      flag = false;
      swal('未做任何修改！', '', 'success');
    }

    if (flag) {
      _this.ajax.post({
        url: '/phone/index/updateContent',
        data: {
          phoneIndexId: _this.indexId,
          phoneIndexContentId: _this.updateIndexContentIds.join('szhgj'),
          tplType: _this.curItem.tplType,
          contents: _this.updateContents.join('szhgj'),
          optTypeCodes: _this.updateOptTypeCode.join('szhgj'),
          optKeys: _this.updateOptKey.join('szhgj')
        },
        success: (res) => {
          if (res.success) {
            setTimeout(_ => {
              _this.moduleList = new Array();
              _this.queryTplList();
            }, 1000);
            // _this.router.navigate(['/main/app/app-set'], {replaceUrl: true}); //路由跳转
            swal('修改首页模板提交成功！', '', 'success');
          } else {
            swal('修改首页模板提交失败====！', 'error');
          }
        },
        error: (data) => {
          swal('修改首页模板提交失败！', '', 'error');
        }
      })

      _this.cancel();
      /**
       * 清空模板的信息
       */
      _this.contentList = new Array();//清空选中模板的详细信息
      _this.uploaders = new Array();//清空选中模板的图片
      _this.contents = new Array();//清空选中模板的图片暗码或者内容
      _this.optTypeCode = new Array();
      _this.typeDesc = new Array();
      _this.isEntered = new Array();
      _this.optKey = new Array();
      _this.updateIndexContentIds = new Array();
      _this.updateContents = new Array();
      _this.updateOptTypeCode = new Array();
      _this.updateOptKey = new Array();
      _this.updateIds = new Array();
      _this.updateImgs = new Array();
    }
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

        /**
         * 判断是否有ID
         * 1.两种可能，一是单纯的push了选中模板，直接把图片删除掉就OK,二是已经发不过的模板值，发布后会返回一个ID,删除时获取模板的ID，之后删除
         * 没有ID则是undefined、
         * 2.每个选中模板都有下标，删除其中一个模板后，下一个模板减一
         */
        if (typeof(indexId) != 'undefined') {
          data = {
            indexId: indexId
          }
          _this.AppSetService.delCode(url, data); //删除数据
        }
        _this.phoneIndexId.splice(i - 1, 1);//删除添加后返回的ID
        _this.moduleList.splice(i - 1, 1);//删除选中模板后，模板下标上移
        _this.flags[i - 1] = false;//删除选中模板后，遮罩层上移
        _this.isShowContent = false;
      }
    );
  }

  getGoodsList() {
    this.goodsList = []
  }

  /**
   * 图片上传
   */
  uploadImg() {
    let me = this, i, imgCount = me.optTypeCode.length;
    for (i = 0; i < imgCount; i++) {
      /**
       * 构建form时，传入自定义参数
       * @param item
       */
      me.uploaders[i].onBuildItemForm = function (fileItem, form) {
        let uuid = me.GetUidService.getUid();
        form.append('uuid', uuid);
        me.contents[i] = uuid;
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
      if (me.isAdd) {
        me.addContent();//调用添加模板
      } else {
        me.updateContent();//调用修改模板
      }
    }
  }

  /**
   * 首页发布
   */
  release() {
    let me = this;
    let url = "/phone/index/release";
    let data = {}
    swal({
        title: '首页发布后会替换当前使用的首页，你确定要发布吗？',
        // type: 'info',
        confirmButtonText: '确认', //‘确认’按钮命名
        showCancelButton: true, //显示‘取消’按钮
        cancelButtonText: '取消', //‘取消’按钮命名
        closeOnConfirm: false  //点击‘确认’后，执行另外一个提示框
      },
      function () {  //点击‘确认’时执行
        swal.close(); //关闭弹框
        me.AppSetService.release(url, data);
      }
    );
  }

  public queryAllGoods() {
    this.ajax.get({
      url: '/goodsQuery/queryAll',
      async: false,
      success: (data) => {
        let info = data.info;
        if (data.success) {
          this.goodsList = data.data;
        } else {
          AppComponent.rzhAlt("error", info);
        }
      },
      error: () => {
        console.log('连接数据库失败');
      }
    });
  }
}







