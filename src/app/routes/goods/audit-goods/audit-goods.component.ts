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
  templateUrl: './audit-goods.component.html',
  styleUrls: ['./audit-goods.component.scss']
})
export class AuditGoodsComponent implements OnInit {
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
  private myReadOnly: boolean = true;     // 商品详情或审核商品时是只读状态
  private goodsBody: any;          //商品详情
  private audit: any;              // 商品审核
  private goodsAudits: any;        // 商品审核状态列表
  public storeCode:string;          //店铺编码
  public logistics:any;             // 物流规则列表
  public tplVals:any;               // 运费模板内容
  private unit:string = '件';       // 运费价格
  addLogisticsModuleUrl = location.protocol+'//'+location.host+location.hash+'/main/operation/freight-template/add-formoek?linkType=addArticle'; //新增模流模板地址
  lookLogisticsModuleUrl = location.protocol+'//'+location.host+location.hash+'/main/operation/freight-template'; //查看物流模板详情跳转地址

  private publishData: any = {
    goodsExpressInfo: {
      freightType: null,
      fixedFreight: null,
      expressTplId: null
    },
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
  constructor(private publishComponent: PublishComponent,
              private submit: SubmitService,
              private goods: GoodsService,
              private tools: RzhtoolsService) {
  }


  ngOnInit() {
    let me = this;
    me.goodsBaseCode = me.submit.getParams('baseCode');
    me.getPageData();// 获取当前页面需要的数据
    me.publishComponent.step = 0;
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
      /**
       * JQuery初始化后执行事件
       */
    $(function () {
      me.specsCheckedWhenEdit();  //当修改商品时改变选中的规格的输入框和文本显示
      me.genTempGoodsImgsList();  // 将商品的图片组生成me.goodsImgList一样的数据，方便后续追加图片
      me.genMblItemList();        //将html字符串生成移动端图片文字组合
    })

    //初始化图片上传属性对象,后续需要往vals里添加对象，做此初始配置可保HTML与后续添加时不报错
    me.skuImg = {
      attrName: '',
      vals: []
    };
  }

  /**
   * 获取发布页面所需数据
   */
  private getPageData() {
    let me = this, pageData;
    me.getExpressTpl(); //获取物流模板
    pageData = me.submit.getData('/goodsQuery/pageDataEdit', {goodsBaseCode: me.goodsBaseCode});
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
    me.goodsEditData = pageData.goodsSave;
    me.publishData = me.goodsEditData;                  // 商品发布数据
    me.genClearArray(me.goodsEditData.goodsSkuList);    // 生成所选属性组合
    me.goodsBody = me.goodsEditData.goodsBody.replace(/\\/, '');
    me.tempMblHtml = me.goodsEditData.mobileBody.replace(/\\/, '');        //为了容易生成移动端详情图片文字组合，将html字符串先放入html再取
    if(!isNullOrUndefined(me.publishData.goodsExpressInfo.expressTplId)) me.getTplValById();    //根据物流模板ID获取模板值
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
      me.oldImgs[item.valCode].push(item.goodsImage);       // 往老图片组中添加这个图片
    });
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
          idx: $val.attr('name')
        };
        me.skuImg.vals.push(obj);
      }
    }
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
   * edit修改或审核商品时将移动端详情html字符串生成图片与文字组合
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
   * 审核商品
   */
  auditGoods() {
    let me = this;
    MaskService.showMask();//显示遮罩层
    me.goods.putRequest('/goodsEdit/auditGoods', me.audit, true)
  }

}
