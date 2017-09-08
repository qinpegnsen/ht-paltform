import {Component, forwardRef, Host, Inject, Input, OnInit, Output} from "@angular/core";
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
const swal = require('sweetalert');

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
  private goodsImgList = [];         // 商品上传图片列表
  private mblItemList = [];       //手机端上传后的图片集合
  private goodsEditData: any;     // 修改商品时商品的原有数据
  private tempMblHtml: string;    // 修改商品时临时用的移动端详情
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
    me.publishComponent.step = 2;
    me.route.url.subscribe(paths => {
      me.path = paths[0].path;
    })

    me.kindId = me.route.snapshot.queryParams['kindId'];
    me.getPageData();// 获取当前页面需要的数据
    if (me.path == 'step_two' && isNullOrUndefined(me.kindId)) {
      me.router.navigate(['/main/goods/publish/step_one'], {replaceUrl: true});
    } else{
      if (me.path == 'step_two' && !isNullOrUndefined(me.kindId)) {
        me.publishData['kindName'] = me.route.snapshot.queryParams['choosedKind'].replace(/>>/g, '>');
        // 默认值
        me.publishData['isFreight'] = 'N';                  //是否有运费
        me.publishData['haveGift'] = 'Y';                   //是否有赠品
        me.publishData['isJoinLimitime'] = 'Y';             //是有参加活动
        me.publishData['brandCode'] = '';                   //品牌
        me.publishData.goodsExpressInfo.weight = 1.00;      //重量
        me.publishData.goodsExpressInfo.volume = 1.00;      //体积
        me.publishData.goodsExpressInfo['freightType'] = 'FIXED';   //运费类型默认固定运费
      };

      /**
       * JQuery初始化后执行事件
       */
      $(function () {
        //提示信息
        $('.tip').hover(function () {
          $(this).css('color', '#000');
        }, function () {
          $(this).css('color', '#bbb');
        });
        //调用富文本编辑器，初始化编辑器
        $('#summernote').summernote({
          height: 280,
          dialogsInBody: true,
          callbacks: {
            onChange: (contents) => {
              this.contents = contents;
            },
            onImageUpload: function (files) {
              for (let file of files) me.sendFile(file);
            }
          }
        });

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

        //当点击移动端编辑图片的时候
        $('.sku-table').on('click', '.set', function () {
          let target = this;
          $(target).parents('dropdown-menu').slideUp(200);
        })

        if(me.path == 'edit'){
          me.specsCheckedWhenEdit();  //当修改商品时改变选中的规格的输入框和文本显示
          me.genTempGoodsImgsList();  // 将商品的图片组生成me.goodsImgList一样的数据，方便后续追加图片
          me.genMblItemList();        //将html字符串生成移动端图片文字组合
        }

      })
    }


    //初始化图片上传属性对象
    me.skuImg = {
      attrName: '',
      vals: []
    }


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
          for (let file of response.data) {
            let obj = {
              type: 'img',
              value: file
            };
            me.mblItemList.push(obj);
          }
        }
      }
    }
  }

  /**
   * 获取发布页面所需数据
   */
  private getPageData() {
    let me = this, pageData;
    console.log("█ me.path ►►►",  me.path);
    if (me.path == 'edit') {
      me.goodsBaseCode = me.submit.getParams('baseCode');
      console.log("█ me.goodsBaseCode ►►►",  me.goodsBaseCode);
      pageData = me.submit.getData('/goodsQuery/pageDataEdit', {goodsBaseCode: me.goodsBaseCode});
    }else{
      pageData = me.submit.getData('/goodsQuery/pageDataAdd', {kindId: me.kindId});
    }
    console.log("█ pageData ►►►", pageData);
    if (!isNullOrUndefined(pageData)) {
     me.allotPageData(pageData);  //分配获取的页面数据
    }
  }

  /**
   * 分配获取的页面数据
   * @param pageData
   */
  private allotPageData(pageData){
    let me = this;
    // 商品基本基本信息
    me.baseAttrList = pageData.baseAttrList;      // 商品基本属性
    me.unitList = pageData.unitList;              // 计量单位
    me.brandsList = pageData.brandList;           // 品牌列表
    me.saleAttrList = pageData.saleAttrList;      // 规格
    if(me.path == 'step_two') {
      me.goodsBaseCode = pageData.goodsBaseCode;  // 商品基本编码
    }
    if(me.path == 'edit') {
      me.goodsEditData = pageData.goodsSave;
      console.log("█ me.goodsEditData ►►►",  me.goodsEditData);
      me.publishData = me.goodsEditData;                  // 商品发布数据
      me.genClearArray(me.goodsEditData.goodsSkuList);    // 生成所选属性组合
      $('#summernote').summernote('code', me.goodsEditData.goodsBody.replace(/\\/,''));   //PC端详情
      me.tempMblHtml = me.goodsEditData.mobileBody.replace(/\\/,'');        //为了容易生成移动端详情图片文字组合，将html字符串先放入html再取
    }
  }

  /**
   * edit将商品的图片组生成me.goodsImgList一样的数据，方便后续追加图片
   */
  private genTempGoodsImgsList(){
    let me = this,list = me.goodsEditData.goodsImagesList,imgSrcs = [];
    list.forEach((item) => {
      imgSrcs = [];
      if (me.goodsImgList.length > 0) {
        // 检测图片组中是否有了该分组，如果有直接在里面push图片，没有的时候新建图片组
        if (me.checkImgListIfHadGroup(item.valCode).isHad) {
          let groupId = me.checkImgListIfHadGroup(item.valCode).groupId;
          me.goodsImgList[groupId].imgSrcs.push(item.goodsImage)
        } else {
          imgSrcs.push(item.goodsImage);
        }
      } else {
        imgSrcs.push(item.goodsImage);
      };
      // 检测数组中是否有了这个分组
      if (!me.checkImgListIfHadGroup(item.valCode).isHad) {
        me.goodsImgList.push({
          idx: item.valCode,
          imgSrcs: imgSrcs
        });
      }
    })
    me.goodsImgList.forEach((item,index) => {
      item.idx = index; // 将idx换成组的序列，以便后续图片的追加修改
    })
    console.log("█ me.goodsImgList ►►►",  me.goodsImgList);
  }

  /**
   * edit将商品原有的图片删除
   * @param groupId  图片组序列
   * @param index    图片组中图片的序列
   */
  private removeImgSrc(groupId,index){
    let me = this;
    me.goodsImgList[groupId].imgSrcs.splice(index,1)
  }
  /**
   * 批量设置规格时
   * @param target
   */
  private setBatchSize(target) {
    let me = this;
    let inputObjName = $(target).prev().attr('name'),
      inputVal = $(target).prev().val();
    console.log("█ inputObjName ►►►", inputObjName);
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
  private checkSpecVal(obj) {
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
   * edit当修改商品时改变选中的规格的输入框和文本显示
   */
  private specsCheckedWhenEdit(){
    for(let i = 0;i <  $('.specs ._val').length; i ++) {
      let $obj = $('.specs ._val').eq(i);
      if ($obj.prop('checked')) {
        $obj.parents('.enumType').find('._attrName').addClass('hide').next().removeClass('hide');
        $obj.parents('._attr').find('._value').addClass('hide').next().removeClass('hide');
      } else {
        $obj.parents('._attr').find('._value').removeClass('hide').next().addClass('hide');
      };
      // 如果是第一个规格，则改变图片列表的选值数组,只在i=0时触发操作就可以了，否则浪费
      if (i == 0  && $obj.parents('.enumType').attr('id') == '1') this.genImgSku($obj);
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
    let _this = this, file = e.target.files[0], imgs: Array<any> = _this.tools.uploadImg(file);
    for (let img of imgs) {
      let obj = {
        type: 'img',
        value: img
      };
      _this.mblItemList[i] = obj;
    }
  }

  /**
   * 编辑器上传图片并显示
   * @param file
   */
  sendFile(file) {
    let _this = this, imgs: Array<any> = _this.tools.uploadImg(file);
    for (let img of imgs) {
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
  private showEdit(target) {
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
  private insertMblText(target?, index?) {
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
    let me = this;
    console.log("█ quondamText ►►►", quondamText);
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
  private moveImg(index, type, item) {
    let me = this, prevItem = me.mblItemList[index - 1], nextItem = me.mblItemList[index + 1];
    if (type == 'up') {
      me.mblItemList[index - 1] = item;
      me.mblItemList[index] = prevItem;
    } else if (type == 'down') {
      me.mblItemList[index] = nextItem;
      me.mblItemList[index + 1] = item;
    }
    $('._edit').addClass('hide');
  }

  /**
   * 移动端详情移除图片
   * @param index
   */
  private removeItem(index) {
    let me = this;
    me.mblItemList.splice(index, 1);
  }

  /**
   * edit修改商品时将移动端详情html字符串生成图片与文字组合
   */
  private genMblItemList(){
    let me = this, doms = $('#mblHtml').children(),type,value;
    me.mblItemList = [];
    for(let i = 0;i<doms.length; i ++){
      type = doms.eq(i)[0].localName == 'p'? 'text': doms.eq(i)[0].localName;
      value = type == 'text'? doms.eq(i).html() : doms.eq(i).attr('src');
      let obj = {
        type: type,
        value:value
      };
      me.mblItemList.push(obj);
    }
  }

    /**
   * 改变规格属性与值时生成新的sku
   * @param obj DOM节点
   */
  private changeSpec(obj) {
    let me = this, $obj = $(obj);
    let spec = $obj.parents('.enumType');
    me.genObject(spec);//生成选中的数据对象

    // 如果是第一个规格，则改变图片列表的选值数组
    if (spec.attr('id') == '1') me.genImgSku($obj)
  }


  /**
   * 如果是第一个规格，则改变图片列表的选值数组
   * @param $obj
   */
  private genImgSku($obj) {
    let me = this;
    me.goodsImgList = [];//每次选择规格先置空暗码列表
    let checkedAttr = $obj.parents('.enumType').find('._val:checked');
    if (checkedAttr.length > 0) {
      me.skuImg.attrName = $obj.parents('.enumType').find('._attrName').next().find('input').val();
      me.skuImg.attrCode = $obj.parents('.enumType').find('._attrName').next().find('input').attr('id');
    };
    let attrVals = [];
    for (let i = 0; i < checkedAttr.length; i++) {
      let val = checkedAttr.eq(i).parents('._attr').find('._value').next().find('input');
      let obj = {
        attrCode: me.skuImg.attrCode,
        valCode: val.attr('id'),
        valName: val.val(),
        idx: val.attr('name'),
        uploader: new FileUploader({
          url: '/goodsEdit/uploadGoodsImage',
          itemAlias: "limitFile"
        })
      };
      attrVals.push(obj)
    }
    me.skuImg.vals = attrVals;
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
    ;
    me.enum = {
      attrsList: attrsList,
      type: spec.attr('id'),
      goodsBaseCode: me.goodsBaseCode,
    };
    if(me.judgeSkuListHasInputVal()) me.enum.skuList = me.publishData.goodsSkuList;
    console.log("█ me.enum ►►►", me.enum);
    let skuData = me.goods.getSkuData('/goodsEdit/genesku', me.enum);
    console.log("█ skuData ►►►",  skuData);
    if (!isNullOrUndefined(skuData)) {
      me.genClearArray(skuData.data);   // 将数据生成易解析的新数组
    }
  }

  /**
   * 判断skuList中是否已经有了输入框中的值
   * @returns {boolean}
   */
  private judgeSkuListHasInputVal(){
    let me = this,hasVal: boolean = false;
    me.publishData.goodsSkuList.forEach((item) => {
      let noValObj: number = 0;
      for(var i in item){
        if(isNullOrUndefined(item[i])) noValObj ++
      }
      if(noValObj < 4) hasVal = true;// 当对象中为空的属性的数量<4时，说明有值；
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
      // console.log("█ skuData ►►►", skuData);
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
    let me = this;
    let allUploaders = me.togetherAllUploaders();
    allUploaders.forEach((uploader, i) => {
      let imgSrcs = [];
      uploader.queue.forEach((item, index) => {
        item.onSuccess = function (response, status, headers) {
          if (!isNullOrUndefined(response)) {
            response = JSON.parse(response);
            if (response.success && !isNullOrUndefined(response.data)) {
              if (me.goodsImgList.length > 0) {
                if (me.checkImgListIfHadGroup(i).isHad) {
                  let groupId = me.checkImgListIfHadGroup(i).groupId;
                  me.goodsImgList[groupId].imgSrcs.push(response.data)
                } else {
                  imgSrcs.push(response.data);
                }
              } else {
                imgSrcs.push(response.data);
              }
            }
          }
        }
      })
      uploader.uploadAll();//全部上传
      uploader.onCompleteAll = function () {
        if (!me.checkImgListIfHadGroup(i).isHad) {
          me.goodsImgList.push({
            idx: i,
            imgSrcs: imgSrcs
          });
        }
        console.log("█ me.goodsImgList ►►►", me.goodsImgList);
        if (me.skuImg.vals.length > 0 && me.goodsImgList.length == me.skuImg.vals.length) {  // 图片上传成功(成功暗码列表与选择的属性一样长)再生成图片列表
          me.genPublishDataAndPublish()// 整理数据并且发布商品
        }
      }

      // 图片已经上传，但是商品发布失败，修改后可直接发布（uploader.isUploading=false 表示图片已经上传）
      //i == allUploaders.length 表示最后一次循环才发布商品，否则会提交多次
      if (i == allUploaders.length - 1 && me.skuImg.vals.length > 0 && me.goodsImgList.length == me.skuImg.vals.length && !uploader.isUploading) {
        me.genPublishDataAndPublish()// 整理数据并且发布商品
      }
    })
  }

  /**
   * 检测图片列表中是否已经有了这个图片组
   * @param index 组序列或对象中idx的值
   * @returns {{groupId: number, isHad: boolean}}
   * groupId 组的序列
   */
  private checkImgListIfHadGroup(index) {
    let me = this, groupId: number, isHad = false;
    me.goodsImgList.forEach((imgGroup, i) => {
      if (imgGroup.idx == index) {
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
   * 生成商品基本属性列表
   */
  genGoodsBaseAttrList() {
    let me = this, baseAttr = $('.base-attr').find('select');
    me.publishData.goodsBaseAttrList = []; // 先置空
    for (let i = 0; i < baseAttr.length; i++) {
      let obj = {
        name: baseAttr.eq(i).find("option:selected").text(),
        value: baseAttr.eq(i).val(),
        idx: baseAttr.eq(i).find("option:selected").attr('class')
      }
      me.publishData.goodsBaseAttrList.push(obj)
      console.log("█ me.publishData.goodsBaseAttrList ►►►", me.publishData.goodsBaseAttrList);
    }
  }

  /**
   * 生成商品图片列表，整合图片并排序
   */
  private genGoodsImgList() {
    let me = this, goodsImgList: Array<any> = new Array(), imgList: Array<string> = new Array(), item: any;
    //当选择了商品规格时
    if (me.skuImg.vals.length > 0) {
      for (var i = 0; i < me.skuImg.vals.length; i++) {
        item = me.skuImg.vals[i];
        for (let img of me.goodsImgList) {
          if (img['idx'] == i) {
            for (let k = 0; k < img.imgSrcs.length; k++) {
              const temp: any = {attrCode: '', valCode: '', valName: '', idx: '', goodsImage: ''};
              Object.assign(temp, item);
              temp.idx = k + 1;
              temp.goodsImage = img.imgSrcs[k];
              delete(temp.uploader);
              goodsImgList.push(temp);
            }
          }
        }
      }
      //当没有选择商品规格时
    } else if (me.defaultUploader.queue.length > 0) {
      swal('数据缺失', "请选择商品规格", 'warning');
    }
    console.log("█ goodsImgList ►►►",  goodsImgList);
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
  private publishGoods() {
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
    // console.log("█ me.publishData['goodsImagesList'] ►►►",  me.publishData['goodsImagesList']);
    if(me.path == 'step_two') me.publishData['kindId'] = me.kindId;
    me.publishData['goodsBaseCode'] = me.goodsBaseCode;                 // 商品基本编码
    me.genGoodsBaseAttrList();                                          // 商品基本属性
    me.publishData['goodsBody'] = $('.summernote').summernote('code');  // 商品详情 PC
    me.publishData['mobileBody'] = me.genMblDetailHtml();               // 商品详情 App
    console.log("█ me.publishData ►►►", me.publishData);
    me.goods.publishGoods('/goodsEdit/save', me.publishData);
  }

}
