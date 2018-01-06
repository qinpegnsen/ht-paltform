import {Component, OnInit, ViewChild} from "@angular/core";
import {PublishComponent} from "../publish/publish.component";
import {isNullOrUndefined, isUndefined} from "util";
import {ActivatedRoute, Router} from "@angular/router";
import {SubmitService} from "../../../core/forms/submit.service";
import {GoodsService} from "../goods.service";
import {FileUploader} from "ng2-file-upload";
import {RzhtoolsService} from "../../../core/services/rzhtools.service";
import {AppComponent} from "../../../app.component";
import {MaskService} from "../../../core/services/mask.service";
import {Location} from "@angular/common";
import {SelectComponent} from "ng2-select";
import {Setting} from "../../../core/settings/setting";
declare var $: any;
const swal = require('sweetalert');

@Component({
  selector: 'app-edit-detail',
  templateUrl: './edit-detail.component.html',
  styleUrls: ['./edit-detail.component.scss']
})
export class EditDetailComponent implements OnInit {
  public path: string;           // 当前路径
  public kindId: string;         //商品分类id
  public stores: Array<any> = new Array();//店铺列表
  public saleAttrList: any;       // 所有规格数据
  public brandsList: any;        // 品牌列表
  public unitList: any;           // 计量单位列表
  public baseAttrList: any;      // 商品基本属性列表
  public goodsBaseCode: string;  //商品基本编码
  public enum: any;              // 所选规格，用于请求sku接口的数据
  public skuAttr = [];           //属性列表
  public skuImg: any = {           // 图片属性
    vals: []
  };
  public goodsImgList: any = {};       // 商品上传图片列表
  public oldImgs: any = {};        // 商品已经有的图片列表
  public goodsEditData: any;     // 修改商品时商品的原有数据
  public isOwnPlat: string;      // 修改商品时商品是否自营
  public goodsBody: any;          //PC端商品详情
  public mobileBody: any;          //移动端商品详情
  public storeCode: string;          //店铺编码
  public logistics: any;             // 物流规则列表
  public tplVals: any;               // 运费模板内容
  public unit: string = '件';       // 运费价格
  public refresh: boolean = false;    //是否刷新列表页
  @ViewChild('allStores') public allStores: SelectComponent;//监听选择店铺组件

  public publishData: any = {
    goodsExpressInfo: {
      freightType: null,
      fixedFreight: null,
      expressTplId: null,
      weight: null,
      volume: null,
    }
  };// 商品发布数据，所有数据

  public defaultUploader: FileUploader = new FileUploader({
    url: GoodsService.goodsUploadRetUrl,
    itemAlias: "limitFile",
    allowedFileType: ["image"]
  })

  constructor(public publishComponent: PublishComponent,
              public route: ActivatedRoute,
              public submit: SubmitService,
              public goods: GoodsService,
              public router: Router,
              public location: Location,
              public tools: RzhtoolsService) {
    this.publishData.storeCode = Setting.SELF_STORE;//默认自营店铺
  }

  back() {
    this.location.back()
  }

  ngOnInit() {
    let me = this;
    me.publishComponent.step = 2
    me.route.url.subscribe(paths => {
      me.path = paths[0].path;
    })

    me.kindId = me.route.snapshot.queryParams['kindId'];
    if (me.path != 'step_two') me.goodsBaseCode = me.submit.getParams('baseCode');
    me.getPageData();// 获取当前页面需要的数据
    if (me.path == 'step_two' && isNullOrUndefined(me.kindId)) {
      me.router.navigate([Setting.URLS.goods.chooseKind], {replaceUrl: true});
    } else {
      if (me.path == 'step_two' && !isNullOrUndefined(me.kindId)) {
        me.publishData.kindSelectName = me.route.snapshot.queryParams['choosedKind'].replace(/>>/g, '>');
        // 默认值
        me.publishData.isFreight = 'N';                  //是否有运费
        me.publishData.haveGift = 'Y';                   //是否有赠品
        me.publishData.isJoinLimitime = 'Y';             //是有参加活动
        me.publishData.brandCode = '';                   //品牌
      }

      /**
       * JQuery初始化后执行事件
       */
      $(function () {
        //调用富文本编辑器，初始化编辑器
        $('#goodsBody').summernote({
          minHeight: 200,
          maxHeight: 800,
          dialogsInBody: true,
          placeholder: 'write here...',
          callbacks: {
            onChange: (contents) => {
              this.contents = contents;
            },
            onImageUpload: function (files) {
              for (let file of files) me.sendFile(file, 'goodsBody');
            }
          }
        });
        $('#mobileBody').summernote({
          toolbar: [
            ['style', ['bold', 'italic', 'underline', 'clear']],
            ['fontsize', ['fontsize']],
            ['color', ['color']],
            ['table', ['table']],//表单
            ['insert', ['link', 'picture', 'hr']],//插入链接，图片，下划线
            ['view', ['fullscreen', 'codeview']]//全屏，代码视图,帮助
          ],
          height: 420,
          dialogsInBody: true,
          placeholder: 'write here...',
          callbacks: {
            onChange: (contents) => {
              this.contents = contents;
            },
            onImageUpload: function (files) {
              for (let file of files) me.sendFile(file, 'mobileBody');
            }
          }
        });

        //当点击批量修改价格的按钮时
        $('.sku-table').on('click', '.s-menu', function () {
          $(this).next().slideToggle(200)
        });

        //当点击批量修改小窗口的关闭时
        $('.sku-table').on('click', '.close', function () {
          $(this).parents('.dropdown-menu').slideUp(200);
        });

        //当点击批量设置按钮的时候
        $('.sku-table').on('click', '.set', function () {
          let target = this;
          $(target).parents('dropdown-menu').slideUp(200);
        })

        if (me.path == 'edit') {
          if (!isNullOrUndefined(me.goodsEditData.goodsBody)) $('#goodsBody').summernote('code', me.goodsEditData.goodsBody);   //PC端详情
          if (!isNullOrUndefined(me.goodsEditData.mobileBody)) $('#mobileBody').summernote('code', me.goodsEditData.mobileBody);   //移动端详情
        }
      })
    }
  }

  /**
   * 选择分类操作提示
   */
  selectKind() {
    let me = this;
    swal({
        title: "操作警示",
        text: "重新选择分类，本页面数据将不会保留",
        type: "warning",
        html: true,
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        cancelButtonText: "取消",
        confirmButtonText: "确认",
        closeOnConfirm: false
      },
      function () {
        swal.close();
        me.location.back()
      });
  }

//添加物流模板
  addLogisticsModule() {
    window.open('/#/main/operation/freight-template/add-formoek?linkType=addArticle')
  }

//查看物流模板
  lookLogisticsModule() {
    window.open('/#/main/operation/freight-template')
  }

  /**
   * 获取发布页面所需数据
   */
  public getPageData() {
    let me = this, pageData;
    if (me.path != 'step_two') {
      pageData = me.submit.getData('/goodsQuery/pageDataEdit', {goodsBaseCode: me.goodsBaseCode});
    } else {
      pageData = me.submit.getData('/goodsQuery/pageDataAdd', {kindId: me.kindId});
    }
    if (!isNullOrUndefined(pageData)) {
      me.allotPageData(pageData);  //分配获取的页面数据
    }
  }

  /**
   * 分配获取的页面数据
   * @param pageData
   */
  public allotPageData(pageData) {
    let me = this;
    // 商品基本基本信息
    me.stores = me.goods.getAllStores();
    me.baseAttrList = pageData.baseAttrList;      // 商品基本属性
    me.unitList = pageData.unitList;              // 计量单位
    me.brandsList = pageData.brandList;           // 品牌列表
    me.saleAttrList = pageData.saleAttrList;      // 规格
    if (me.path == 'step_two') {
      me.getExpressTpl();
      me.goodsBaseCode = pageData.goodsBaseCode;  // 商品基本编码
      me.allStores.active = [{id: me.publishData.storeCode, text: '三楂红平台自营店'}];
    }
    if (me.path != 'step_two') {
      me.goodsEditData = pageData.goodsSave;
      me.publishData = me.goodsEditData;         // 商品发布数据
      me.isOwnPlat = pageData.isOwnPlat;
      me.getExpressTpl();
      me.checkedBaseAttr();                         //已选中的基本属性
      me.genClearArray(me.goodsEditData.goodsSkuList);    // 生成所选属性组合
      me.genTempGoodsImgsList();  // 将商品的图片组生成me.goodsImgList一样的数据，方便后续追加图片
      me.genImgSku();       //已选中属性的图片组
      if (isNullOrUndefined(me.publishData.goodsExpressInfo)) {
        me.publishData.goodsExpressInfo = {
          freightType: null,
          fixedFreight: null,
          expressTplId: null,
        };
      } else if (!isNullOrUndefined(me.publishData.goodsExpressInfo.expressTplId)) {
        me.getTplValById();  //根据物流模板ID获取模板值
      }
    }
  }

  /**
   * 选择店铺
   * @param value
   */
  selectedStore(value: any): void {
    this.publishData.storeCode = value.id;
    this.publishData.storeName = value.text;
    this.publishData.goodsExpressInfo.expressTplId = null;
    this.getTplValById();
    this.getExpressTpl();
  }

  /**
   * 修改时 选中已选中的基本属性
   */
  checkedBaseAttr() {
    let me = this;
    me.goodsEditData.goodsBaseAttrList.forEach(val => {
      me.baseAttrList.forEach(item => {
        item.goodsEnumValList.forEach(attr => {
          if (attr.id == val.value) item.checkedId = attr.id;
        })
      })
    })
  }

  /**
   * 获取运费模板
   */
  getExpressTpl(target?) {
    let me = this, expressTpl;
    // 当切换到物流规则时，获取新的运费模板，此时target是还没切换过来的固定运费
    if (isNullOrUndefined(target) || target == 'FIXED') {
      expressTpl = me.goods.getExpressTplByStoreCode(me.publishData.storeCode);// TODO获取运费模板
    }
    if (!isNullOrUndefined(expressTpl)) me.logistics = expressTpl;
  }

  /**
   * 根据运费模板ID获取模板内容
   * @param tplId
   */
  getTplValById() {
    let me = this, tplId = me.publishData.goodsExpressInfo.expressTplId;
    let result = me.getTplVal(tplId);
    if (!isNullOrUndefined(result)) me.tplVals = result;
    if (!isNullOrUndefined(me.tplVals)) {
      if (me.tplVals.valuationType == 'VOLUME') {
        me.unit = 'm³'
      } else if (me.tplVals.valuationType == 'WEIGHT') {
        me.unit = 'kg'
      } else {
        me.unit = '件'
      }
    } else {
      me.publishData.isFreight = 'N';
      me.publishData.goodsExpressInfo = null;
    }
  }

  /**
   * 根据运费模板ID获取运费模板值
   * @param tplId   运费模板ID
   * @returns {any}   运费模板值
   */
  public getTplVal(tplId) {
    let me = this;
    for (let tpl of me.logistics) {
      if (tpl.id == tplId) {
        return tpl;
      }
    }
  }

  /**
   * 审核input框的value合不合要求
   */
  auditInputValueForNum(target, type?) {
    this.tools.auditInputValueForNum(target, type);
    if (Number(target.value) > 10000) {
      target.value = 9999.99
    }
  }

  /**
   * edit将商品的图片组生成me.goodsImgList一样的数据，方便后续追加图片
   * 同时生成一个老图片对象，用于显示与修改老图片
   */
  public genTempGoodsImgsList() {
    let me = this, list = me.goodsEditData.goodsImagesList;
    list.forEach((item) => {
      if (isUndefined(me.oldImgs[item.valCode])) me.oldImgs[item.valCode] = [];            // 检测对象中是否已经有了这个属性值对象，如果没有，给它一个空数组
      if (isUndefined(me.goodsImgList[item.valCode])) me.goodsImgList[item.valCode] = [];  // 检测对象中是否已经有了这个属性值对象，如果没有，给它一个空数组
      me.oldImgs[item.valCode].push(item.goodsImage);       // 往老图片组中添加这个图片
      me.goodsImgList[item.valCode].push(item.goodsImage);  // 往总图片组中添加这个图片
    });
  }

  /**
   * edit将商品原有的图片删除
   * @param groupId  图片组序列
   * @param index    图片组中图片的序列
   */
  removeImgSrc(groupId, index) {
    let me = this;
    me.oldImgs[groupId].splice(index, 1);      //删除老图片组中的这个图片
    me.goodsImgList[groupId].splice(index, 1); //删除总图片组中的这个图片
  }

  /**
   * 批量设置规格时
   * @param target
   */
  setBatchSize(type, target) {
    let me = this;
    let inputVal = $(target).prev().val();
    if (!isNullOrUndefined(inputVal) && inputVal !== '') {
      me.publishData.goodsSkuList.forEach((sku) => {
        sku[type] = inputVal
      });
      $(target).parents('.dropdown-menu').slideUp(200);
    }
  }

  /**
   * 改变规格属性与值时生成新的sku
   * @param obj DOM节点
   */
  changeSpec(index) {
    let me = this;
    me.genObject(index);           //生成选中的数据对象
    if (index == 0) me.genImgSku();  // 如果是第一个规格，则改变图片列表的选值数组
  }

  /**
   * 将所选规格生成一个对象
   * @param spec
   */
  public genObject(index) {
    let me = this, enums: any = {}, attrsList: Array<any> = new Array(), checkedNum: number = 0;
    let curCheckedAttr = this.saleAttrList[index];
    for (let i = 0; i < curCheckedAttr.goodsEnumValList.length; i++) {
      let checkedEnumItem = curCheckedAttr.goodsEnumValList[i];
      if (checkedEnumItem.checked) {
        let attrTemp = {
          attrName: curCheckedAttr.name,
          attrCode: index + 1,
          valCode: (index + 1) + '' + (i + 1),
          value: checkedEnumItem.enumValue,
          idx: checkedEnumItem.idx,
          enumValId: checkedEnumItem.id,
        };
        attrsList.push(attrTemp);
        checkedNum += 1;
      }
    }
    if (checkedNum > 0) curCheckedAttr.used = true;
    else curCheckedAttr.used = false;
    enums = {
      attrsList: attrsList,
      type: index + 1,
      goodsBaseCode: me.goodsBaseCode,
    };
    if (!isNullOrUndefined(me.publishData.goodsSkuList) && me.judgeSkuListHasInputVal()) enums.skuList = me.publishData.goodsSkuList;    // 当表格中已经输入了价格则将带价格的skuList传过去保存

    $.when(me.goods.getSkuData(enums)).done(data => {
      if (data && data.length > 0) {
        me.publishData.goodsSkuList = data;
        me.skuAttr = data[0].attrsList;
      } else {
        me.publishData.goodsSkuList = new Array()
      }   // 将数据生成易解析的新数组
    })
  }

  /**
   * 如果是第一个规格，则改变图片列表的选值数组
   * @param $obj
   */
  public genImgSku() {
    let me = this, checkedAttrNum: number = 0;
    let curCheckedAttr = me.saleAttrList[0];
    for (let i = 0; i < curCheckedAttr.goodsEnumValList.length; i++) {
      let checkedEnumItem = curCheckedAttr.goodsEnumValList[i];
      if (checkedEnumItem.checked) {
        checkedAttrNum += 1;
        if (me.checkImgListIfHadGroup(1 + '' + (i + 1)).isHad) {
          let groupId = me.checkImgListIfHadGroup(1 + '' + (i + 1)).groupId;
          me.skuImg.vals[groupId].valName = checkedEnumItem.enumValue;
        } else {
          let obj = {
            attrCode: 1,
            valCode: 1 + '' + (i + 1),
            valName: checkedEnumItem.enumValue,
            idx: checkedEnumItem.idx,
            uploader: new FileUploader({
              url: GoodsService.goodsUploadRetUrl,
              itemAlias: "limitFile",
              allowedFileType: ["image"]
            })
          };
          me.skuImg.vals.push(obj);
        }
      } else {      // 取消选中
        let skuImgAry = me.skuImg.vals;
        for (let k = 0; k < skuImgAry.length; k++) {
          if (skuImgAry[k].valCode === 1 + '' + (i + 1)) {
            me.skuImg.vals.splice(k, 1);
            if (!isUndefined(me.oldImgs[1 + '' + (i + 1)])) delete me.oldImgs[1 + '' + (i + 1)];            //在老图片组中将该图片组删除
            if (!isUndefined(me.goodsImgList[1 + '' + (i + 1)])) delete me.goodsImgList[1 + '' + (i + 1)];  //在总图片组中将该图片组删除
          }
        }
      }
    }
    if (checkedAttrNum > 0) {     //选择的规格属大于0时，获取所选属性的名和值
      me.skuImg.attrName = curCheckedAttr.name;
      curCheckedAttr.used = true;
    } else curCheckedAttr.used = false;
    me.skuImg.vals.sort(me.compare('valCode'));   //根据某个属性值（valCode）排序
  }

  /**
   * 检测图片属性列表中是否已经有了这个属性
   * @param compareVal 用来比较的值
   * @returns {{groupId: number, isHad: boolean}}
   */
  public checkImgListIfHadGroup(compareVal) {
    let me = this, groupId: number, isHad = false;
    me.skuImg.vals.forEach((item, i) => {
      if (item.valCode == compareVal) {
        groupId = i;
        isHad = true;
      }
    })
    return {
      groupId: groupId,
      isHad: isHad
    };
  }

  /**
   * 根据某个属性值排序方法
   * @param property
   * @returns {(a:any, b:any)=>number}
   */
  public compare(property) {
    return function (a, b) {
      var value1 = a[property];
      var value2 = b[property];
      return value1 - value2;
    }
  }

  /**
   * 判断skuList中是否已经有了输入框中的值
   * @returns {boolean}
   */
  public judgeSkuListHasInputVal() {
    let me = this, hasVal: boolean = false;
    me.publishData.goodsSkuList.forEach((item) => {
      let noValObj: number = 0;
      for (var i in item) {
        if (isNullOrUndefined(item[i])) noValObj++
      }
      if (noValObj < 4) hasVal = true;// 当对象中为空的属性的数量<4时，说明有值；
    })
    return hasVal;
  }

  /**
   * 将数据生成易解析的新数组
   * @param skuData
   */
  public genClearArray(skuData) {
    let me = this;
    me.skuAttr = [];
    if (skuData.length > 0) {
      me.publishData.goodsSkuList = skuData;
      let tempSkuAttr = skuData[0].attrsList;
      tempSkuAttr.forEach((attr) => {
        let obj = {
          attrCode: attr.attrCode,
          attrName: attr.attrName,
          idx: attr.idx
        };
        me.skuAttr.push(obj);
      });
    } else {
      me.publishData.goodsSkuList = [];
    }
  }

  /**
   * 没有选规格想上传图片时的提示
   * 暂时用于商品规格必填
   */
  noAttrTip() {
    AppComponent.rzhAlt('warning', '请选择商品规格')
  }

  /**
   * 移动端详情同步PC端详情
   */
  syncGoodsBody() {
    let me = this;
    me.publishData.goodsBody = $('#goodsBody').summernote('code');
    $('#mobileBody').summernote('code', me.publishData.goodsBody);
  }

  /**
   * 编辑器上传图片并显示
   * @param file
   * editorId: 编辑器id
   */
  sendFile(file, editorId: string) {
    let _this = this, img = _this.goods.uploadImg(file);
    if (!isNullOrUndefined(img)) {
      $("#" + editorId).summernote('insertImage', img, function ($image) {
        $image.css({width: ''});//设置图片的大小
      });
      let obj = {
        type: 'img',
        value: img
      };
    }
  }


  /**
   * 上传图片,第一步，集成所有需要上传的uploader到一个集合里
   */
  public togetherAllUploaders() {
    let me = this, allUploaders = [];
    // 当选择了规格时,不上传默认的图片
    if (me.skuImg.vals.length > 0) {
      allUploaders = [];
      me.skuImg.vals.forEach((item) => {
        allUploaders.push(item.uploader);
      });
    } else {
      allUploaders = [];
      if (me.defaultUploader.queue.length > 0) {
        allUploaders.push(me.defaultUploader);// 加入默认的uploader
      }
    }
    return allUploaders;
  }


  /**
   * 商品规格图片上传
   */
  public uploadImgs() {
    let me = this, uploadedNum = 0;
    let allUploaders = me.togetherAllUploaders();
    allUploaders.forEach((uploader, i) => {
      uploader.uploadAll();//全部上传
      if (uploader.getNotUploadedItems().length == 0) uploadedNum += 1;  //如果该组不需要上传图片则uploadedNum+1
      uploader.queue.forEach((item, index) => {
        item.onSuccess = function (response, status, headers) {
          if (!isNullOrUndefined(response)) {
            response = JSON.parse(response);
            if (response.success && !isNullOrUndefined(response.data)) {
              // 图片上传成功的时候，检测图片组里该属性值对象是否已存在，不存在则添加对象
              if (isUndefined(me.goodsImgList[me.skuImg.vals[i].valCode])) {
                me.goodsImgList[me.skuImg.vals[i].valCode] = [];
              }
              // 将图片存入该属性值对应的对象图片数组中
              me.goodsImgList[me.skuImg.vals[i].valCode].push(response.data);
            }
          }
        }
      })
      uploader.onCompleteAll = function () {
        uploadedNum += 1;     // 该组上传完之后uploadedNum+1；
        if (uploadedNum == allUploaders.length) {  // 当有图片上传，并且是图片组的最后一个时
          me.genPublishDataAndPublish()     //整理数据并且发布商品
        }
      }
      // 每张图片上传结束后，判断如果是最后一组图片则发布商品，不是最后一组会进入下一个循环
      if (uploadedNum == allUploaders.length) {  // 当有图片上传，并且是图片组的最后一个时
        me.genPublishDataAndPublish()     //整理数据并且发布商品
      }
    })
  }


  /**
   * 生成商品基本属性列表
   */
  public genGoodsBaseAttrList() {
    let me = this;
    me.publishData.goodsBaseAttrList = []; // 先置空
    me.baseAttrList.forEach(val => {
      if (!isNullOrUndefined(val.checkedId)) {
        val.goodsEnumValList.forEach(attr => {
          if (attr.id == val.checkedId) {
            let obj = {
              name: attr.enumValue,
              value: attr.id,
              idx: attr.idx
            }
            me.publishData.goodsBaseAttrList.push(obj)
          }
        })
      }
    })
  }

  /**
   * 生成商品图片列表，整合图片并排序
   */
  public genGoodsImgList() {
    let me = this, goodsImgList: Array<any> = new Array(), item: any;
    //当选择了商品规格时
    if (me.skuImg.vals.length > 0) {
      for (var i = 0; i < me.skuImg.vals.length; i++) {
        item = me.skuImg.vals[i];
        let itemImgSrcs = me.goodsImgList[item.valCode];
        if (isNullOrUndefined(itemImgSrcs)) {
          AppComponent.rzhAlt('warning', '请上传规格为' + item.valName + '的商品的图片');
          MaskService.hideMask();//关闭遮罩层
          return null;// 当某个规格没有图片时，提示必须上传
        }
        if (!isNullOrUndefined(itemImgSrcs)) {
          for (let k = 0; k < itemImgSrcs.length; k++) {
            const temp: any = {attrCode: '', valCode: '', valName: '', idx: '', goodsImage: ''};
            Object.assign(temp, item);
            temp.idx = k + 1;
            temp.goodsImage = itemImgSrcs[k];
            delete(temp.uploader);
            goodsImgList.push(temp);
          }
        }
      }
      //当没有选择商品规格时
    } else if (me.defaultUploader.queue.length > 0) {
      AppComponent.rzhAlt('warning', '数据缺失', "请选择商品规格");
      MaskService.hideMask();//关闭遮罩层
      return null;
    }
    return goodsImgList;
  }

  /**
   * 发布商品
   */
  publishGoods() {
    let me = this;
    if (me.judgeSkuPrices() && me.judgeGoodsImgs() && me.judgeDetailInfo() && me.judgeLogistics()) {
      MaskService.showMask();//显示遮罩层
      me.uploadImgs();// 先上传图片
    }
  }

  /**
   * 判断商品图片是否上传
   * @returns {boolean}
   */
  judgeGoodsImgs() {
    let me = this, targets = me.skuImg.vals;
    // 当商品发布时，如果选了规格，但没有选择图片
    if (me.path == 'step_two') {
      if (targets.length > 0) {
        for (let i = 0; i < targets.length; i++) {
          if (targets[i].uploader.queue.length == 0) {
            AppComponent.rzhAlt('warning', '请上传' + me.skuImg.attrName + '为' + targets[i].valName + '的商品的图片');
            return false
          }
        }
      } else {
        AppComponent.rzhAlt('warning', '请选择商品规格');
        return false
      }
    }
    return true
  }

  /**
   * 比较两个数字的大小
   * @param arg1
   * @param arg2
   * @returns {boolean}
   */
  compareNumber(arg1: string, arg2: string) {
    let num1 = Number(arg1), num2 = Number(arg2);
    if (num1 < num2 || num1 == num2) return true;
  }

  /**
   * 判断物流规则是否正确
   * @returns {boolean}
   */
  judgeLogistics() {
    let me = this;
    if (me.publishData.isFreight == 'Y') {
      let obj = me.publishData.goodsExpressInfo;
      if (!isNullOrUndefined(obj.freightType)) {
        //如果使用物流模板
        if (obj.freightType == 'TPL') {
          if (obj.expressTplId == '' || isNullOrUndefined(obj.expressTplId)) {
            AppComponent.rzhAlt('warning', '请选择物流模板');
            return false;
          }
        } else {
          if (obj.fixedFreight == '' || isNullOrUndefined(obj.fixedFreight)) {
            AppComponent.rzhAlt('warning', '请设置固定运费');
            return false;
          }
        }
      } else {
        AppComponent.rzhAlt('warning', '请设置运费');
        return false;
      }
    }
    return true;
  }

  /**
   * 判断价格或库存是否符合要求
   * @returns {boolean}
   */
  judgeSkuPrices() {
    let me = this;
    if (me.skuImg.vals.length > 0) {
      let target = me.publishData.goodsSkuList;
      for (let item of target) {
        if (Number(item.marketPrice) == 0) {
          AppComponent.rzhAlt('warning', '请输入商品的市场价');
          return false;
        } else if (Number(item.price) == 0) {
          AppComponent.rzhAlt('warning', '请输入商品价格');
          return false;
        } else if (Number(item.memberPrice) == 0) {
          AppComponent.rzhAlt('warning', '请输入商品的会员价');
          return false;
        } else if (Number(item.price) > Number(item.marketPrice)) {
          AppComponent.rzhAlt('warning', '商品价格应小于市场价');
          return false;
        } else if (Number(item.memberPrice) > Number(item.price)) {
          AppComponent.rzhAlt('warning', '会员价应小于商品价格');
          return false;
        } else if (Number(item.storageNum) < 10) {
          AppComponent.rzhAlt('warning', '商品库存必须大于10');
          return false;
        } else {
          return true
        }
      }
    } else {
      AppComponent.rzhAlt('warning', '请选择商品规格');
    }
  }

  /**
   * 判断商品详情是否编辑
   */
  judgeDetailInfo() {
    let me = this;
    if ($('#goodsBody').summernote('isEmpty')) {
      AppComponent.rzhAlt('warning', '请编辑PC端商品详情');
      return false
    } else if ($('#mobileBody').summernote('isEmpty')) {
      AppComponent.rzhAlt('warning', '请编辑移动端商品详情');
      return false
    }
    return true
  }

  /**
   * 整理数据并且发布商品
   */
  public genPublishDataAndPublish() {
    let me = this;
    me.publishData.goodsImagesList = me.genGoodsImgList();           // 商品图片列表
    if (me.path == 'step_two') me.publishData['kindId'] = me.kindId;
    me.publishData.goodsBaseCode = me.goodsBaseCode;                 // 商品基本编码
    me.genGoodsBaseAttrList();                                          // 商品基本属性
    me.publishData.goodsBody = $('#goodsBody').summernote('code');  // 商品详情 PC
    me.publishData.mobileBody = $('#mobileBody').summernote('code');  // 移动端详情
    $.when(me.goods.publishGoods('/goodsEdit/save', me.publishData)).done(data => {
      if (data) {
        if (me.path == 'edit') {
          AppComponent.rzhAlt("success", '操作成功');
          me.location.back();
          me.refresh = true;
        } else {
          me.router.navigate([Setting.URLS.goods.published], {queryParams: {baseCode: data}})
        }
      }
    })

  }

}
