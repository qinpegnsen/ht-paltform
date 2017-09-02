import {Component, OnInit} from "@angular/core";
import {PublishComponent} from "../publish/publish.component";
import {isNullOrUndefined, isUndefined} from "util";
import {ActivatedRoute, Router} from "@angular/router";
import {SubmitService} from "../../../core/forms/submit.service";
import {GoodsService} from "../goods.service";
import {FileUploader} from "ng2-file-upload";
import {FormBuilder, FormGroup} from "@angular/forms";
import {CustomValidators} from "ng2-validation";
import {GetUidService} from "../../../core/services/get-uid.service";
import {AppComponent} from "../../../app.component";
import {RzhtoolsService} from "../../../core/services/rzhtools.service";
import {forEach} from "@angular/router/src/utils/collection";
declare var $: any;

@Component({
  selector: 'app-edit-detail',
  templateUrl: './edit-detail.component.html',
  styleUrls: ['./edit-detail.component.scss'],
  providers: [PublishComponent, GoodsService]
})
export class EditDetailComponent implements OnInit {
  private goodsKind: string;//商品分类，从上个组件中传过来
  private enumTypes: any;// 所有规格数据
  private brandsList: any;// 品牌列表
  private goodsBaseCode: string;//商品基本编码
  private enum: any;// 所选规格，用于请求sku接口的数据
  private skuAttr = [];//属性列表
  private skuVal = [];//属性值列表
  private skuImg: any;// 图片属性
  private mobileDescription: any;//移动端详情
  private mblTextAreaEditInserBtnEvent;//移动端文本编辑确定按钮事件
  private uuidsList = [];
  private mblItemList: Array<any> = new Array(); //手机端上传后的图片集合

  valForm: FormGroup;// 表单值验证
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
              fb: FormBuilder) {
    this.valForm = fb.group({
      'minvalue': [null, CustomValidators.min(6)],
    })
  }


  ngOnInit() {
    let me = this;

    let kindId = me.route.snapshot.queryParams['kindId'];
    if (isNullOrUndefined(kindId)) {
      me.router.navigate(['/main/goods/publish/step_one'], {replaceUrl: true});
    } else {
      me.getPageData();// 获取当前页面需要的数据
      me.goodsKind = me.route.snapshot.queryParams['choosedKind'].replace('>>', '>').replace('>>', '>');
      /**
       * JQuery初始化后执行事件
       */
      $(function () {
        $('.tip').hover(function () {
          $(this).css('color', '#000');
        }, function () {
          $(this).css('color', '#bbb');
        });
        /**
         * 调用富文本编辑器，初始化编辑器
         */
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
          $(this).next().slideToggle(200)
        });
        //当点击批量修改小窗口的关闭时
        $('.sku-table').on('click', '.close', function () {
          $(this).parents('.dropdown-menu').slideUp(200);
        });
        //当点击设置按钮时
        $('.sku-table').on('click', '.set', function () {
          let inputObjName = $(this).prev('input').attr('name'),
            inputVal = $(this).prev('input').val();
          if (!isNullOrUndefined(inputVal) && inputVal !== '') {
            $('.sku-table input[name="' + inputObjName + '"]').val(inputVal);// 表格中name属性与它相等的输入框的值等于它的值
            $(this).parents('.dropdown-menu').slideUp(200);
          }
        });
        //当点击移动端编辑图片的时候
        $('.app-control').on('click', '.app-img-box', function () {
          let target = this;
          let editState = !$(target).find('._edit').hasClass('hide');//编辑状态：true-编辑状态，false-普通状态
          if (editState) {
            $(target).find('._edit').addClass('hide');
          } else {
            $(target).find('._edit').removeClass('hide');
            $(target).siblings().find('._edit').addClass('hide');
          }
        })
      })
    }
    this.publishComponent.changeStep();

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
   * 替换图片
   * @param e 选择图片事件
   * @param i 需要替换掉的图片的索引值
   */
  mblReplaceImg(e,i){
    let _this = this,file = e.target.files[0],imgs: Array<any> = _this.tools.uploadImg(file);
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
    for (let img of imgs) $("#summernote").summernote('insertImage', img, '');
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

  //显示移动端编辑框
  private showEdit(index?) {
    $('.app-img-box ._edit').addClass('hide');
    $('.app-box .mobile-edit-area').removeClass('hide');
    this.scrollBottom();//使移动端详情编辑滚动条一直保持在最底部
  }

  //隐藏移动端文本编辑框
  private hideEdit() {
    $('.mobile-edit-area').addClass('hide');
  }
  /**
   * 使移动端详情编辑滚动条一直保持在最底部
   */
  private scrollBottom(){
    $('.app-control')[0].scrollTop = $('.app-control')[0].scrollHeight;// 使滚动条一直保持在最底部
  }

  /**
   * 插入文本
   * @param target
   */
  private insertText(index?) {
    let me = this;
    let textArea = $('.mobile-edit-area .textarea');
    if (me.counter(textArea) > 0) {
      let obj = {
        type: 'text',
        value: textArea.val()
      };
      me.mblItemList.push(obj);
      textArea.val('');// 清除文本区域内容
      me.hideEdit();// 隐藏文本编辑区域
    }
  }
  //手机端详情编辑编辑文本
  mblReplaceText(target,index, quondamText){
    let me = this;
    console.log("█ quondamText ►►►",  quondamText);
    $('.mobile-edit-area .textarea').html(quondamText);
    $(target).parents('.app-img-box').find('.text').remove();
    $(target).parents('.app-img-box').find('.mobile-edit-area').removeClass('hide')
  }
  //移动端详情编辑向上移动图片
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

  private removeItem(index) {
    let me = this;
    me.mblItemList.splice(index, 1);
  }

  /**
   * 获取发布页面所需数据
   */
  private getPageData() {
    let me = this;
    let pageData = me.submit.getData('/goodsQuery/pageData', '');
    console.log("█ pageData ►►►", pageData);
    me.enumTypes = pageData.enumTypeList;// 规格
    me.brandsList = pageData.brandList;// 品牌列表
    me.goodsBaseCode = pageData.goodsBaseCode;// 商品基本编码
  }

  /**
   * 选择规格值的方法
   * @param obj
   */
  private checkSpecVal(obj) {
    let me = this, $obj = $(obj);
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
   * 改变规格值的方法
   * @param obj
   */
  private changeSpecVal(obj) {
    let me = this, $obj = $(obj);
    let spec = $obj.parents('.enumType');
    me.genObject(spec);//生成选中的数据对象

    // 如果是第一个规格，则改变图片列表的选值数组
    if (spec.attr('id') == '1') me.genImgSku($obj)
  }

  /**
   * 改变规格属性的方法
   * @param obj
   */
  private changeSpecAttr(obj) {
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
    let checkedAttr = $obj.parents('.enumType').find('._val:checked');
    if (checkedAttr.length > 0) me.skuImg.attrName = $obj.parents('.enumType').find('._attrName').next().find('input').val();
    let attrVals = [];
    for (let i = 0; i < checkedAttr.length; i++) {
      let val = checkedAttr.eq(i).parents('._attr').find('._value').next().find('input');
      let obj = {
        valCode: val.attr('id'),
        valName: val.val(),
        uploader: new FileUploader({
          url: '/goodsEdit/uploadGoodsImage',
          itemAlias: "limitFile"
        })
      };
      attrVals.push(obj)
    }
    me.skuImg.vals = attrVals;

    //生成多个uploader

    console.log("█ me.skuImg ►►►", me.skuImg);
  }

  /**
   * 将所选规格生成一个的对象
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
        idx: getValObj.attr('name')
      };
      attrsList.push(attrTemp);
    }
    ;
    me.enum = {
      attrsVOList: attrsList,
      type: spec.attr('id'),
      goodsBaseCode: me.goodsBaseCode
    };
    console.log("█ me.enum ►►►", me.enum);
    let skuData = me.goods.getSkuData('/goodsEdit/genesku', me.enum);
    if (!isNullOrUndefined(skuData)) {
      me.genClearArray(skuData.data);//将数据生成易解析的新数组
    }

  }

  /**
   * 将数据生成易解析的新数组
   * @param skuData
   */
  private genClearArray(skuData) {
    let me = this;
    me.skuAttr = [];
    me.skuVal = [];
    if (skuData.length > 0) {
      let tempSkuAttr = skuData[0].attrsList;
      tempSkuAttr.forEach((attr) => {
        let obj = {
          attrCode: attr.attrCode,
          attrName: attr.attrName
        }
        me.skuAttr.push(obj);
      });
      skuData.forEach((sku) => {
        me.skuVal.push(sku.attrsList);
      })
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
    if (me.mobileUploader.queue.length > 0) {
      allUploaders.push(me.mobileUploader);// 加入移动端详情uploader
    }
    return allUploaders;
  }


  private uploadImgs() {
    let me = this;
    let allUploaders = me.togetherAllUploaders();
    me.uuidsList = [];//每次传图片先置空暗码列表
    allUploaders.forEach((uploader) => {
      let uuids = [];
      uploader.onBuildItemForm = function (fileItem, form) {
        let uuid = me.getUid.getUid()
        form.append('uuid', uuid);
        uuids.push(uuid);
      };
      uploader.queue.forEach((item, index) => {
        item.onError = function () {
          uuids.splice(index, 1)
        };
        item.onSuccess = function (response, status, headers) {
          AppComponent.rzhAlt('success', '图片上传成功', '图片上传成功')
        }
      })
      uploader.uploadAll();//全部上传
      uploader.onCompleteAll = function () {
        me.uuidsList.push(uuids);
      }
    })
  }

  private submitBtn() {
    $('.edit').remove()
  }

}
