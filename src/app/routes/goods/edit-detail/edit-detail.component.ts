import {Component, OnInit} from "@angular/core";
import {PublishComponent} from "../publish/publish.component";
import {isNullOrUndefined} from "util";
import {ActivatedRoute, Router} from "@angular/router";
import {SubmitService} from "../../../core/forms/submit.service";
import {GoodsService} from "../goods.service";
import {FileUploader} from "ng2-file-upload";
import {FormBuilder, FormGroup} from "@angular/forms";
import {CustomValidators} from "ng2-validation";
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

  valForm: FormGroup;// 表单值验证
  private defaultUploader: FileUploader = new FileUploader({
    url: '/goodsBrand/uploadBrandImage',
    itemAlias: "limitFile"
  })

  constructor(private publishComponent: PublishComponent,
              private route: ActivatedRoute,
              private submit: SubmitService,
              private goods: GoodsService,
              private router: Router,
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
          $('.sku-table input[name="' + inputObjName + '"]').val(inputVal);// 表格中name属性与它相等的输入框的值等于它的值
          $(this).parents('.dropdown-menu').slideUp(200);
        });

      })
    }
    this.publishComponent.changeStep();

    //初始化图片上传属性对象
    me.skuImg = {
      attrName: '',
      vals: []
    }

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
        valCode: val.id,
        valName: val.val(),
        uploader: new FileUploader({
          url: '/goodsBrand/uploadBrandImage',
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
    console.log("█ skuData ►►►", skuData);
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


}
