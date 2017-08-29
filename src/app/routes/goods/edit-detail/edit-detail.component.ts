import {Component, OnInit} from "@angular/core";
import {PublishComponent} from "../publish/publish.component";
import {isNullOrUndefined, isUndefined} from "util";
import {ActivatedRoute, Router} from "@angular/router";
import {SubmitService} from "../../../core/forms/submit.service";
import {GoodsService} from "../goods.service";
import {find} from "rxjs/operator/find";
import {FileUploader} from "ng2-file-upload";
declare var $: any;

@Component({
  selector: 'app-edit-detail',
  templateUrl: './edit-detail.component.html',
  styleUrls: ['./edit-detail.component.scss'],
  providers: [PublishComponent, GoodsService]
})
export class EditDetailComponent implements OnInit {
  private goodsKind: string;
  private enumTypes: any;
  private brandsList: any;
  private enum: any;
  private skuData: any;
  private goodsBaseCode: string;
  private myImg;
  public uploader:FileUploader = new FileUploader({
    url: '/goodsBrand/uploadBrandImage',
    itemAlias:"limitFile"
  }); //初始化上传方法

  constructor(private publishComponent:PublishComponent,
              private route: ActivatedRoute,
              private submit: SubmitService,
              private goods: GoodsService,
              private router: Router) { }

  ngOnInit() {
    let me = this;

    let kindId = me.route.snapshot.queryParams['kindId'];
    if(isNullOrUndefined(kindId)) {
      me.router.navigate(['/main/goods/publish/step_one'], {replaceUrl: true});
    }else{
      me.getPageData();// 获取当前页面需要的数据
      me.goodsKind = me.route.snapshot.queryParams['choosedKind'].replace('>>','>').replace('>>','>');
      /**
       * JQuery初始化后执行事件
       */
      $(function(){
        $('.tip').hover(function(){
          $(this).css('color', '#000');
        },function(){
          $(this).css('color', '#bbb');
        })
        /**
         * 调用富文本编辑器，初始化编辑器
         */
        $('#summernote').summernote({
          height: 280,
          dialogsInBody: true,
          callbacks: {
            onChange: (contents, $editable) => {
              this.contents = contents;
              // console.log(contents);
            }
          }
        });
      })
    }
    this.publishComponent.changeStep();

  }

  private getPageData(){
    let me = this;
    let pageData = me.submit.getData('/goodsQuery/pageData','');
    console.log("█ pageData ►►►",  pageData);
    me.enumTypes = pageData.enumTypeList;
    me.brandsList = pageData.brandList;
    me.goodsBaseCode = pageData.goodsBaseCode;
  }

  private checkSpecVal(obj){
    let me = this, $obj = $(obj);
    if($obj.parents('._attr').find('._val').is(':checked')){
      $obj.parents('.enumType').find('._attrName').addClass('hide').next().removeClass('hide');
      $obj.parents('._attr').find('._value').addClass('hide').next().removeClass('hide');
    }else{
      $obj.parents('._attr').find('._value').removeClass('hide').next().addClass('hide');
    };
    if($obj.parents('.enumType').find('._val:checked').length < 1){
      $obj.parents('.enumType').find('._attrName').removeClass('hide').next().addClass('hide');
    };
    let spec = $obj.parents('.enumType');
    me.genObject(spec);//生成选中的数据对象
  }

  private changeSpecVal(obj){
    let me = this, $obj = $(obj);
    let spec = $obj.parents('.enumType');
    me.genObject(spec);//生成选中的数据对象
  }

  private changeSpecAttr(obj){
    let me = this, $obj = $(obj);
    let spec = $obj.parents('.enumType');
    me.genObject(spec);//生成选中的数据对象
  }

  private genObject(spec){
    let me = this, attrsList = [];
    let checkedVal = spec.find('._val:checked');
    for(let i = 0; i<checkedVal.length; i ++){
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
    me.enum = {
      attrsVOList: attrsList,
      type: spec.attr('id'),
      goodsBaseCode: me.goodsBaseCode
    };
    console.log("█ me.enum ►►►",  me.enum);
    me.skuData = me.goods.getSkuData('/goodsEdit/genesku',me.enum);
    console.log("█ skuData ►►►",  me.skuData);
  }

  /**
   * 监听图片选择
   * @param $event
   */
  fileChangeListener($event) {
    let that = this;
    let image: any = new Image();
    let file: File = $event.target.files[0];
    let myReader: FileReader = new FileReader();
    myReader.onloadend = function (loadEvent: any) {
      image.src = loadEvent.target.result;
      that.myImg = image.src;
    };
    myReader.readAsDataURL(file);
  }
}
