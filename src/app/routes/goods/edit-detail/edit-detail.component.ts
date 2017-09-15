import {Component, OnInit} from "@angular/core";
import {PublishComponent} from "../publish/publish.component";
import {isNullOrUndefined, isUndefined} from "util";
import {ActivatedRoute, Router} from "@angular/router";
import {SubmitService} from "../../../core/forms/submit.service";
import {GoodsService} from "../goods.service";
import {FileUploader} from "ng2-file-upload";
import {GetUidService} from "../../../core/services/get-uid.service";
import {RzhtoolsService} from "../../../core/services/rzhtools.service";
import {AppComponent} from "../../../app.component";
import {MaskService} from "../../../core/services/mask.service";
declare var $: any;

@Component({
  selector: 'app-edit-detail',
  templateUrl: './edit-detail.component.html',
  styleUrls: ['./edit-detail.component.scss']
})
export class EditDetailComponent implements OnInit {
  private path: string;           // 当前路径
  private kindId: string;         //商品分类id
  private saleAttrList: any;       // 所有规格数据
  private brandsList: any;        // 品牌列表
  private unitList: any;           // 计量单位列表
  private baseAttrList: any;      // 商品基本属性列表
  private goodsBaseCode: string;  //商品基本编码
  private enum: any;              // 所选规格，用于请求sku接口的数据
  private skuAttr = [];           //属性列表
  private skuImg: any;            // 图片属性
  private goodsImgList = {};       // 商品上传图片列表
  private oldImgs: any = {};        // 商品已经有的图片列表
  private mblItemList = [];         //手机端上传后的图片集合
  private goodsEditData: any;     // 修改商品时商品的原有数据
  private tempMblHtml: string;    // 修改商品时临时用的移动端详情
  private myReadOnly: boolean;     // 商品详情或审核商品时是只读状态
  private goodsBody: any;          //商品详情
  private audit: any;              // 商品审核
  private goodsAudits: any;        // 商品审核状态列表
  public storeCode:string;          //店铺编码
  public logistics:any;             // 物流规则列表
  public tplVals:any;               // 运费模板内容
  private unit:string = '件';       // 运费价格
  targetUrl = location.protocol+'//'+location.host+'/main/operation/freight-template'; //新增模流模板地址
  private publishData: any = {
    goodsExpressInfo: {},
    goodsImagesList: [],
    goodsBaseAttrList: [],
    goodsSkuList: [
      {
        attrsList: [],
        marketPrice: null,
        memberPrice: null,
        price: null,
        saGroupCode: '',
        storageNum: null
      }
    ]
  };// 商品发布数据，所有数据

  private defaultUploader: FileUploader = new FileUploader({
    url: '/goodsEdit/uploadGoodsImage',
    itemAlias: "limitFile"
  })
  private mobileUploader: FileUploader = new FileUploader({
    url: '/goodsEdit/uploadGoodsBodyImage',
    itemAlias: "limitFile",
    autoUpload: true
  })

  constructor(private publishComponent: PublishComponent,
              private route: ActivatedRoute,
              private submit: SubmitService,
              private goods: GoodsService,
              private router: Router,
              private getUid: GetUidService,
              private tools: RzhtoolsService,
              private mask: MaskService) {
  }


  ngOnInit() {

    let me = this;
    me.route.url.subscribe(paths => {
      me.path = paths[0].path;
    })

    me.kindId = me.route.snapshot.queryParams['kindId'];
    if (me.path != 'step_two') me.goodsBaseCode = me.submit.getParams('baseCode');
    me.getPageData();// 获取当前页面需要的数据
    if (me.path == 'step_two' && isNullOrUndefined(me.kindId)) {
      me.router.navigate(['/main/goods/publish/step_one'], {replaceUrl: true});
    } else {
      if (me.path == 'step_two' && !isNullOrUndefined(me.kindId)) {
        me.publishComponent.step = 2;
        me.publishData['kindSelectName'] = me.route.snapshot.queryParams['choosedKind'].replace(/>>/g, '>');
        // 默认值
        me.publishData['isFreight'] = 'N';                  //是否有运费
        me.publishData['haveGift'] = 'Y';                   //是否有赠品
        me.publishData['isJoinLimitime'] = 'Y';             //是有参加活动
        me.publishData['brandCode'] = '';                   //品牌
        me.publishData.goodsExpressInfo.weight = 1.00;      //重量
        me.publishData.goodsExpressInfo.volume = 1.00;      //体积
        me.publishData.goodsExpressInfo['freightType'] = 'FIXED';   //运费类型默认固定运费
        me.publishData.goodsExpressInfo.expressTplId = '';  //运费模板
      }

      if (me.path == 'edit') me.publishComponent.step = 2;
      if (me.path == 'audit') {
        me.publishComponent.step = 0;
        me.myReadOnly = true;// 商品详情或审核商品时是只读状态
        me.goodsAudits = this.tools.getEnumDataList('1014');  // 商品审核状态列表
        // 去掉待审核状态
        for (var i = me.goodsAudits.length - 1; i >= 0; i--) {
          var obj = me.goodsAudits[i];
          if (obj.key == 'AUDIT') {
            me.goodsAudits.splice(i, 1)
          }
        }
        // 初始化默认审核状态
        me.audit = {
          opinion: '',
          result: 'PASS',
          goodsBaseCode: me.goodsBaseCode
        }
      } else{
        me.myReadOnly = false;
      }

      /**
       * JQuery初始化后执行事件
       */
      $(function () {
        //调用富文本编辑器，初始化编辑器
        $('#summernote').summernote({
          height: 280,
          dialogsInBody: true,
          placeholder: 'write here...',
          callbacks: {
            onChange: (contents) => {
              this.contents = contents;
            },
            onImageUpload: function (files) {
              for (let file of files) me.sendFile(file);
            }
          }
        });

        if (me.path != 'audit') {
          //当点击批量修改价格的按钮时
          $('.sku-table').on('click', '.s-menu', function () {
            $(this).find('input').val('');
            $(this).next().slideToggle(200)
          });

          //当点击批量修改小窗口的关闭时
          $('.sku-table').on('click', '.close', function () {
            $(this).parents('.dropdown-menu').slideUp(200);
          });

          //当点击移动端编辑图片的时候
          $('.app-control').on('click', '.app-img-box', function () {
            let target = this;
            me.editMblImg(target);
          })

          $('body').click(function (e) {
            if (!$(e.target).parents().hasClass('app-img-box')) {
              $('.app-img-box ._edit').addClass('hide');
            } //关闭选框
          });

          //当点击批量设置按钮的时候
          $('.sku-table').on('click', '.set', function () {
            let target = this;
            $(target).parents('dropdown-menu').slideUp(200);
          })
        }

        if (me.path == 'edit' || me.path == 'audit') {
          me.specsCheckedWhenEdit();  //当修改商品时改变选中的规格的输入框和文本显示
          me.genTempGoodsImgsList();  // 将商品的图片组生成me.goodsImgList一样的数据，方便后续追加图片
          me.genMblItemList();        //将html字符串生成移动端图片文字组合
        }

      })
    }

    //初始化图片上传属性对象,后续需要往vals里添加对象，做此初始配置可保HTML与后续添加时不报错
    me.skuImg = {
      attrName: '',
      vals: []
    };


    /**
     * 手机端上传图片成功处理
     * @param item 信息集合
     * @param response 返回结果
     * @param status 状态码
     * @param headers 头信息
     */
    me.mobileUploader.onSuccessItem = function (item, response: any, status, headers) {
      if (!isNullOrUndefined(response)) {
        response = JSON.parse(response);
        if (response.success) {
          let img = response.data;
          let obj = {
            type: 'img',
            value: img
          };
          me.mblItemList.push(obj);
        }
      }
    }
  }

  /**
   * 获取发布页面所需数据
   */
  private getPageData() {
    let me = this, pageData;
    me.getExpressTpl(); //获取物流模板
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
  private allotPageData(pageData) {
    let me = this;
    // 商品基本基本信息
    me.baseAttrList = pageData.baseAttrList;      // 商品基本属性
    me.unitList = pageData.unitList;              // 计量单位
    me.brandsList = pageData.brandList;           // 品牌列表
    me.saleAttrList = pageData.saleAttrList;      // 规格
    if (me.path == 'step_two') {
      me.goodsBaseCode = pageData.goodsBaseCode;  // 商品基本编码
    }
    if (me.path != 'step_two') {
      me.goodsEditData = pageData.goodsSave;
      me.publishData = me.goodsEditData;                  // 商品发布数据
      me.genClearArray(me.goodsEditData.goodsSkuList);    // 生成所选属性组合
      me.goodsBody = me.goodsEditData.goodsBody.replace(/\\/, '');
      setTimeout(function () {
        $('#summernote').summernote('code', me.goodsBody);   //PC端详情
      }, 1)
      me.tempMblHtml = me.goodsEditData.mobileBody.replace(/\\/, '');        //为了容易生成移动端详情图片文字组合，将html字符串先放入html再取
      if(me.publishData.goodsExpressInfo.expressTplId) me.getTplValById(); //根据物流模板ID获取模板值
    }
  }

  /**
   * 获取运费模板
   */
  getExpressTpl(){
    let me = this;
    let expressTpl = me.goods.getExpressTplByStoreCode();// 获取物流模板
    if(!isNullOrUndefined(expressTpl)) me.logistics = expressTpl;
  }

  /**
   * 根据运费模板ID获取模板内容
   * @param tplId
   */
  getTplValById(){
    let me = this,tplId = me.publishData.goodsExpressInfo.expressTplId;
    let result = me.goods.getTplVal(tplId);
    if(!isNullOrUndefined(result)) me.tplVals = result;
    if(me.tplVals.valuationType == 'VOLUME'){
      me.unit = 'm³'
    }else if(me.tplVals.valuationType == 'WEIGHT'){
      me.unit = 'kg'
    }else{
      me.unit = '件'
    }
  }

  /**
   * edit将商品的图片组生成me.goodsImgList一样的数据，方便后续追加图片
   * 同时生成一个老图片对象，用于显示与修改老图片
   */
  private genTempGoodsImgsList() {
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
    // console.log("█ me.goodsImgList ►►►",  me.goodsImgList);
  }

  /**
   * 批量设置规格时
   * @param target
   */
  setBatchSize(target) {
    let me = this;
    let inputObjName = $(target).prev().attr('name'),
      inputVal = $(target).prev().val();
    if (!isNullOrUndefined(inputVal) && inputVal !== '') {
      me.publishData.goodsSkuList.forEach((sku) => {
        sku[inputObjName] = inputVal
      });
      $(target).parents('.dropdown-menu').slideUp(200);
    }
  }

  /**
   * 选择规格值的方法
   * @param obj
   */
  checkSpecVal(obj) {
    let me = this, $obj = $(obj) || obj;
    //某个值选择或取消选择时，切换值和输入框的显示
    if ($obj.parents('._attr').find('._val').is(':checked')) {
      $obj.parents('.enumType').find('._attrName').addClass('hide').next().removeClass('hide');
      $obj.parents('._attr').find('._value').addClass('hide').next().removeClass('hide');
    } else {
      $obj.parents('._attr').find('._value').removeClass('hide').next().addClass('hide');
    }
    ;
    //如果某种规则没有选值的时候，切换值和输入框的显示
    if ($obj.parents('.enumType').find('._val:checked').length < 1) {
      $obj.parents('.enumType').find('._attrName').removeClass('hide').next().addClass('hide');
    }
    ;
    let spec = $obj.parents('.enumType');
    me.genObject(spec);//生成选中的数据对象

    // 如果是第一个规格，则改变图片列表的选值数组
    if ($obj.parents('.enumType').attr('id') == '1') me.genImgSku($obj)
  }

  /**
   * 改变规格属性与值时生成新的sku
   * @param obj DOM节点
   */
  changeSpec(obj) {
    let me = this, $obj = $(obj);
    let spec = $obj.parents('.enumType');
    me.genObject(spec);           //生成选中的数据对象
    if (spec.attr('id') == '1') me.genImgSku($obj);  // 如果是第一个规格，则改变图片列表的选值数组
  }


  /**
   * 如果是第一个规格，则改变图片列表的选值数组
   * @param $obj
   */
  private genImgSku($obj) {
    let me = this;
    let checkedAttr = $obj.parents('.enumType').find('._val:checked');  //选中的第一个规格的数量
    if (checkedAttr.length > 0) {     //选择的规格属大于0时，获取所选属性的名和值
      me.skuImg.attrName = $obj.parents('.enumType').find('._attrName').next().find('input').val();
      me.skuImg.attrCode = $obj.parents('.enumType').find('._attrName').next().find('input').attr('id');
    }
    let $val = $obj.parents('._attr').find('._value').next().find('input'); // 取到所选中的多选框对应的输入框，以便从中取值
    let targetCheckBoxObj = $obj.parents('._attr').find('._val');           // 当前选择或修改的属性的checkBox的jQ对象
    // 当前元素被选中，判断属性组中这是否已经有了这个分组
    if (targetCheckBoxObj.prop('checked')) {
      if (me.checkImgListIfHadGroup($val.attr('id')).isHad) {
        let groupId = me.checkImgListIfHadGroup($val.attr('id')).groupId;
        me.skuImg.vals[groupId].valName = $val.val();
      } else {
        let obj = {
          attrCode: me.skuImg.attrCode,
          valCode: $val.attr('id'),
          valName: $val.val(),
          idx: $val.attr('name'),
          uploader: new FileUploader({
            url: '/goodsEdit/uploadGoodsImage',
            itemAlias: "limitFile"
          })
        };
        me.skuImg.vals.push(obj);
      }
    } else {      // 取消选中
      let skuImgAry = me.skuImg.vals;
      for (let i = 0; i < skuImgAry.length; i++) {
        if (skuImgAry[i].valCode === $val.attr('id')) {
          me.skuImg.vals.splice(i, 1);
          if (!isUndefined(me.oldImgs[$val.attr('id')])) delete me.oldImgs[$val.attr('id')];            //在老图片组中将该图片组删除
          if (!isUndefined(me.goodsImgList[$val.attr('id')])) delete me.goodsImgList[$val.attr('id')];  //在总图片组中将该图片组删除
        }
      }
    }
    me.skuImg.vals.sort(me.compare('valCode'));   //根据某个属性值（valCode）排序
  }

  /**
   * 检测图片属性列表中是否已经有了这个属性
   * @param compareVal 用来比较的值
   * @returns {{groupId: number, isHad: boolean}}
   */
  private checkImgListIfHadGroup(compareVal) {
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
  private compare(property) {
    return function (a, b) {
      var value1 = a[property];
      var value2 = b[property];
      return value1 - value2;
    }
  }

  /**
   * 将所选规格生成一个对象
   * @param spec
   */
  private genObject(spec) {
    let me = this, attrsList = [];
    let checkedVal = spec.find('._val:checked');
    for (let i = 0; i < checkedVal.length; i++) {
      let getAttrObj = spec.find('[name="enumName"]');
      let getValObj = checkedVal.eq(i).parents('._attr').find('._value').next().find('input');
      let attrTemp = {
        attrName: getAttrObj.val(),
        attrCode: getAttrObj.attr('id'),
        valCode: getValObj.attr('id'),
        value: getValObj.val(),
        idx: getValObj.attr('name'),
        code: getValObj.next().attr('id'),
      };
      attrsList.push(attrTemp);
    }
    me.enum = {
      attrsList: attrsList,
      type: spec.attr('id'),
      goodsBaseCode: me.goodsBaseCode,
    };
    if (me.judgeSkuListHasInputVal()) me.enum.skuList = me.publishData.goodsSkuList;    // 当表格中已经输入了价格则将带价格的skuList传过去保存
    let skuData = me.goods.getSkuData('/goodsEdit/genesku', me.enum);
    if (!isNullOrUndefined(skuData)) {
      me.genClearArray(skuData.data);   // 将数据生成易解析的新数组
    }
  }

  /**
   * 判断skuList中是否已经有了输入框中的值
   * @returns {boolean}
   */
  private judgeSkuListHasInputVal() {
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
  private genClearArray(skuData) {
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
      me.publishData.goodsSkuList[0].attrsList = [];
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
   * edit当修改商品时改变选中的规格的输入框和文本显示
   */
  private specsCheckedWhenEdit() {
    for (let i = 0; i < $('.specs ._val').length; i++) {
      let $obj = $('.specs ._val').eq(i);
      if ($obj.prop('checked')) {
        $obj.parents('.enumType').find('._attrName').addClass('hide').next().removeClass('hide');
        $obj.parents('._attr').find('._value').addClass('hide').next().removeClass('hide');
      } else {
        $obj.parents('._attr').find('._value').removeClass('hide').next().addClass('hide');
      }
      ;
      // 如果是第一个规格，则改变图片列表的选值数组
      if ($obj.parents('.enumType').attr('id') == '1') this.genImgSku($obj);
    }
  }

  /**
   * 编辑移动端详情的图片或文本
   * @param target
   */
  private editMblImg(target) {
    if ($(target).find('.mobile-edit-area').length > 0 && !$(target).find('.mobile-edit-area').hasClass('hide')) return;// 当是修改文本的时候，点击当前板块不显示编辑工具
    let editState = !$(target).find('._edit').hasClass('hide');//编辑状态：true-编辑状态，false-普通状态
    if (editState) {
      $(target).find('._edit').addClass('hide');
    } else {
      $(target).find('._edit').removeClass('hide');
      $(target).siblings().find('._edit').addClass('hide');
    }
  }

  /**
   * 替换图片
   * @param e 选择图片事件
   * @param i 需要替换掉的图片的索引值
   */
  mblReplaceImg(e, i) {
    let _this = this, file = e.target.files[0], img = _this.tools.uploadImg(file);
    let obj = {
      type: 'img',
      value: img
    };
    _this.mblItemList[i] = obj;
  }

  /**
   * 编辑器上传图片并显示
   * @param file
   */
  sendFile(file) {
    let _this = this, img = _this.tools.uploadImg(file);
    if (!isNullOrUndefined(img)) {
      $("#summernote").summernote('insertImage', img, '');
      let obj = {
        type: 'img',
        value: img
      };
      _this.mblItemList.push(obj);
    }
  }

  /**
   * 输入框计数器
   */
  private counter(target) {
    let hadLength = $(target).val().length;
    let leaveLength = 500 - hadLength;
    $(target).parents('.mea-text').find('.counter').html(leaveLength);
    return hadLength;
  }

  /**
   * 显示移动端文本编辑框
   * @param target
   */
  showEdit(target) {
    $('.app-img-box ._edit').addClass('hide');
    $('.app-box .mobile-edit-area').removeClass('hide');
    this.counter(target);
    this.scrollBottom();//使移动端详情编辑滚动条一直保持在最底部
  }

  /**
   * 隐藏移动端文本编辑框
   * @param target
   */
  private hideEdit(target?) {
    if (!isUndefined(target)) {
      $(target).parents('.app-img-box').find('._edit').addClass('hide');
      $(target).parents('.app-img-box').find('.mobile-edit-area').addClass('hide');
    }
    $('.mobile-edit-area').addClass('hide');
  }

  /**
   * 使移动端详情编辑滚动条一直保持在最底部
   */
  private scrollBottom() {
    $('.app-control')[0].scrollTop = $('.app-control')[0].scrollHeight;// 使滚动条一直保持在最底部
  }

  /**
   * 插入文本
   * @param target
   * @param index
   */
  insertMblText(target?, index?) {
    let me = this;
    if (!isUndefined(target)) $(target).parents('.app-img-box').find('._edit').addClass('hide');
    let textArea = $('.mobile-edit-area .textarea');
    if (me.counter(textArea) > 0) {
      let obj = {
        type: 'text',
        value: textArea.val()
      };
      if (!isUndefined(index)) me.mblItemList[index] = obj;
      else me.mblItemList.push(obj);
      textArea.val('');// 清除文本区域内容
      me.hideEdit();// 隐藏文本编辑区域
    }
  }

  /**
   * 手机端详情编辑编辑文本
   * @param target
   * @param quondamText
   */
  mblReplaceText(target, quondamText) {
    $('.mobile-edit-area .textarea').html(quondamText);
    $(target).parents('.app-img-box').find('.text').remove();
    $(target).parents('.app-img-box').find('.mobile-edit-area').removeClass('hide');
    $(target).parents('.app-img-box').find('._edit').addClass('hide');
  }

  /**
   * 移动端详情编辑向上移动图片
   * @param index
   * @param type
   * @param item
   */
  moveImg(index, type, item) {
    let me = this, prevItem = me.mblItemList[index - 1], nextItem = me.mblItemList[index + 1];
    if (type == 'up') {
      me.mblItemList[index - 1] = item;
      me.mblItemList[index] = prevItem;
    } else if (type == 'down') {
      me.mblItemList[index] = nextItem;
      me.mblItemList[index + 1] = item;
    }
    $('.app-content').find('._edit').addClass('hide');
  }

  /**
   * 移动端详情移除图片
   * @param index
   */
  removeItem(index) {
    let me = this;
    me.mblItemList.splice(index, 1);
  }

  /**
   * edit修改商品时将移动端详情html字符串生成图片与文字组合
   */
  private genMblItemList() {
    let me = this, doms = $('#mblHtml').children(), type, value;
    me.mblItemList = [];
    for (let i = 0; i < doms.length; i++) {
      type = doms.eq(i)[0].localName == 'p' ? 'text' : doms.eq(i)[0].localName;
      value = type == 'text' ? doms.eq(i).html() : doms.eq(i).attr('src');
      let obj = {
        type: type,
        value: value
      };
      me.mblItemList.push(obj);
    }
  }


  /**
   * 上传图片,第一步，集成所有需要上传的uploader到一个集合里
   */
  private togetherAllUploaders() {
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
    ;
    return allUploaders;
  }


  /**
   * 商品规格图片上传
   */
  private uploadImgs() {
    let me = this, uploadedNum = 0;
    let allUploaders = me.togetherAllUploaders();
    allUploaders.forEach((uploader, i) => {
      uploader.uploadAll();//全部上传
      if (!uploader.isUploading) uploadedNum += 1;  //如果该组不需要上传图片则uploadedNum+1
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
   * 判断图片是否全部上传成功
   * @param allUploaders
   * @returns {boolean}
   */
  private allUploaded(allUploaders) {
    let uploadedNum = 0;
    allUploaders.forEach((item) => {
      if (!item.isUploading) uploadedNum += 1
    })
    if (uploadedNum == allUploaders.length) return true;
  }

  /**
   * 生成商品基本属性列表
   */
  private genGoodsBaseAttrList() {
    let me = this, baseAttr = $('.base-attr').find('select');
    me.publishData.goodsBaseAttrList = []; // 先置空
    for (let i = 0; i < baseAttr.length; i++) {
      let obj = {
        name: baseAttr.eq(i).find("option:selected").text(),
        value: baseAttr.eq(i).val(),
        idx: baseAttr.eq(i).find("option:selected").attr('class')
      }
      me.publishData.goodsBaseAttrList.push(obj)
    }
  }

  /**
   * 生成商品图片列表，整合图片并排序
   */
  private genGoodsImgList() {
    let me = this, goodsImgList: Array<any> = new Array(), item: any;
    //当选择了商品规格时
    if (me.skuImg.vals.length > 0) {
      for (var i = 0; i < me.skuImg.vals.length; i++) {
        item = me.skuImg.vals[i];
        let itemImgSrcs = me.goodsImgList[item.valCode];
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
    }
    console.log("█ goodsImgList ►►►", goodsImgList);
    return goodsImgList;
  }

  /**
   * 移动端详情
   * @returns {string}
   */
  private genMblDetailHtml() {
    let me = this, mblHtml = '';
    me.mblItemList.forEach((item) => {
      if (item.type == 'img') {
        mblHtml += '<img width="100%" src="' + item.value + '">';
      } else if (item.type == 'text') {
        mblHtml += '<p class="text mb0" style="line-height: 1.6">' + item.value + '</p>';
      }
    });
    return mblHtml;
  }

  /**
   * 发布商品
   */
  publishGoods() {
    let me = this;
    this.mask.showMask();//显示遮罩层
    me.uploadImgs();// 先上传图片
  }

  /**
   * 整理数据并且发布商品
   */
  private genPublishDataAndPublish() {
    let me = this;
    me.publishData['goodsImagesList'] = me.genGoodsImgList();           // 商品图片列表
    if (me.path == 'step_two') me.publishData['kindId'] = me.kindId;
    me.publishData['goodsBaseCode'] = me.goodsBaseCode;                 // 商品基本编码
    me.genGoodsBaseAttrList();                                          // 商品基本属性
    me.publishData['goodsBody'] = $('.summernote').summernote('code');  // 商品详情 PC
    me.publishData['mobileBody'] = me.genMblDetailHtml();               // 商品详情 App
    console.log("█ me.publishData ►►►", me.publishData);
    me.goods.publishGoods('/goodsEdit/save', me.publishData);
  }

  /**
   * 审核商品
   */
  auditGoods() {
    let me = this;
    me.goods.putRequest('/goodsEdit/auditGoods', me.audit, true)
  }

}
