import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SettingsService} from "../../../../../core/settings/settings.service";
import {GetUidService} from "../../../../../core/services/get-uid.service";
import {FileUploader} from "ng2-file-upload";
import {AppComponent} from "../../../../../app.component";
import {ContentService} from "../content/content.service";
import {SubmitService} from "../../../../../core/forms/submit.service";
import {isNullOrUndefined, isUndefined} from "util";
import {RzhtoolsService} from "../../../../../core/services/rzhtools.service";
import {OperationService} from "../../../operation.service";
import {GoodsService} from "../../../../goods/goods.service";
import {MaskService} from "../../../../../core/services/mask.service";
declare var $: any;

const uploadUrl = "/upload/basic/upload";  //图片上传路径(调取上传的接口)
@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.scss']
})
export class AddArticleComponent implements OnInit {
  /**
   * 图片上传
   * @type {FileUploader}
   * url  图片上传的接口地址
   * itemAlias  文件别名
   * queueLimit 上传文件控制
   */
  public uploader: FileUploader = new FileUploader({
    url: uploadUrl,
    itemAlias: "limitFile",
    queueLimit: 1
  });

  private uuid: any;
  public linkType: string;
  public contents: string;
  public reason: string;
  public flag: boolean = false;                    //开关，用来判断是否显示图片路径
  public articleClassList;                          // 文章分类列表的数据
  public articleId: number                          // 路由传递过来的文章的id
  public queryArticleData: any                      //用来保存根据文章的id查询出来的文章的信息
  public articleCoverType;                          //初始化的时候设置默认选中的值
  public articleCoverTypes;                         //初始化的时候设置默认选中的值
  public submitObj;                                 //用来保存提交的时候的数据，在addArticleExtra里面使用
  public submitState;                               //用来保存提交的时候的状态，在addArticleExtra里面使用
  public autionOptions;                             //审核状态的列表
  public goodShow: boolean = false;                 //关联商品的弹框
  public linkGoods: any;                             //关联商品的数据
  private kindId: any = '';                          //品牌名
  public brandList: any;                              //品牌列表
  linkGoodsList: Array<any>;                          //可以选择的商品
  listTeamOne: Array<any> = [];                       //已经选择的商品
  private brandName: any = '';                       //品牌名
  private goodsName: any = '';                       //商品名
  private linkGoodStr: any = '';                     //关联商品id的拼接
  private deletebutton: Object;                       //删除按钮
  constructor(public settings: SettingsService,
              private routeInfo: ActivatedRoute,
              public router: Router,
              public GetUidService: GetUidService,
              public ContentService: ContentService,
              public service: SubmitService,
              private tools: RzhtoolsService,
              private goods: GoodsService,
              private operationService: OperationService) {
    this.settings.showRightPage("30%");
  }

  /**
   * 1.获取地址栏的参数，进行判断
   * 2.对按钮进行赋值
   * 3.调用关联的商品
   */
  ngOnInit() {
    this.linkType = this.routeInfo.snapshot.queryParams['linkType'];//获取地址栏的参数
    this.articleId = this.routeInfo.snapshot.queryParams['id'];//获取地址栏传递过来的文章给的id

    this.articleCoverType = 'AUTO'//文章封面类型默认的样式

    this.articleCoverTypes = [
      {key: 'AUTO', text: '自动'},
      {key: 'ONE', text: '一个封面'},
      {key: 'THREE', text: '三个封面'}

    ]

    this.deletebutton = {//删除按钮
      title: "删除",
      type: "delete"
    };

    /**
     * 初始化的时候调取文章分类的接口
     * @type {string}
     */
    let url = '/articleClass/queryArticleClassByAcName';
    let data = {}
    this.articleClassList = this.service.getData(url, data)

    /**
     * 调用富文本编辑器，初始化编辑器
     */

    setTimeout(() => {
      let me = this;
      $('#summernote').summernote({
        height: 280,
        dialogsInBody: true,
        callbacks: {
          onChange: (contents, $editable) => {
            this.contents = contents;
            // console.log(contents);
          },
          onImageUpload: function (files) {
            for (let file of files) me.sendFile(file);
          }
        }
      });
    }, 0);


    /**
     * 解决拖拽时候默认出现的框
     */
    setTimeout(() => {
      $(".note-dropzone").css("display", 'none')
    }, 0)

    /**
     * 根据id查询文章的数据
     * @type {string}
     */
    if (this.linkType == 'updataArticle' || this.linkType == 'auditArticle') {
      let queryArticleurl = '/article/queryArticle';
      let queryArticledata = {
        articleId: this.articleId,
        queryState: 'BLACK'
      }
      this.queryArticleData = this.service.getData(queryArticleurl, queryArticledata);
      setTimeout(() => {
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
        $('#summernote').summernote('code', this.queryArticleData.articleBody.articleContent);//给编辑器赋值
      }, 0);
    }

    /**
     * 审核时候的两种状态
     * @type {[{id: number; name: string},{id: number; name: string}]}
     */
    this.autionOptions = [
      {id: 'SUCCESS', name: '成功'},
      {id: 'FAILURE', name: '失败'}
    ]
  }


  /**
   * 选择分类
   * @param data  选择分类组件输出数据
   */
  getKind(data) {
    this.kindId = data.kindId;
    this.getLinkGoods();
    this.getBrandList(this.kindId)
  }

  /**
   * 选择品牌名
   * @param data  选择分类组件输出数据
   */
  getBrandList(kindId?) {
    if (isUndefined(kindId)) kindId = '';
    let list = this.goods.getBrandListByKind(kindId), newList = [];
    if (!isNullOrUndefined(list)) {
      for (let item of list) {
        let obj = {
          id: item.id,
          text: item.brandName,
        }
        newList.push(obj);
      }
    }
    this.brandList = newList;
  }

  /**
   * 品牌名搜索
   */
  refreshValue(value: any): void {
    this.brandName = value.text;
    this.getLinkGoods();
  }

  /**
   * 商品名称搜索
   */
  search() {
    this.getLinkGoods();
  }

  /**
   * 获取关联的商品的数据
   */
  getLinkGoods() {
    let url = "/goodsQuery/queryForArticle";
    let data = {
      kindId: this.kindId,
      brandName: this.brandName,
      goodsName: this.goodsName,
      sortColumns: ''
    }
    this.linkGoods = this.operationService.linkGoods(url, data);
    if (this.linkGoods) this.linkGoodsList = this.linkGoods.voList;
    console.log("█  this.linkGoodsList ►►►", this.linkGoodsList);
  }


  /**
   * 点击选择封面类型，然后来决定是否显示封面路径,同时获取暗码，写到图片上传的点击事件
   * @param code
   */
  coverType(code) {
    if (code == 'ONE' || code == 'THREE') {
      this.flag = true;
      if (code == 'THREE') {
        this.uploader = new FileUploader({
          url: uploadUrl,
          itemAlias: "limitFile",
          queueLimit: 3
        });
      }
    } else {
      this.flag = false;
    }
    this.uuid = this.GetUidService.getUid();
  }


  /**
   * 编辑器上传图片并显示
   * @param file
   */
  sendFile(file) {
    let _this = this, img = _this.tools.uploadImg(file);
    if (!isNullOrUndefined(img)) {
      $("#summernote").summernote('insertImage', img, '');
    }
  }


  /**
   *为文章关联商品
   */
  linkGood() {
    this.getLinkGoods()  //获取商品分类的数据
    // MaskService.simpleShowMask(); //显示遮罩层
    $("session").css('z-index', 120)
    this.goodShow = !this.goodShow;
  }

  /**
   * 取消
   */
  cancel() {
    this.router.navigate(['/main/operation/article/manage']);
  }

  /**
   * 取消弹框
   */
  closeAlert() {
    this.goodShow = !this.goodShow;
    // MaskService.simpleHideMask(); //隐藏遮罩层
    $("session").css('z-index', 0)
  }

  /**
   * 获取弹框选择的商品的信息
   */
  alertResult() {
    let  me = this;


    this.closeAlert();//关闭弹窗

    if( $('._myAppend').find($('.list-group-item')).length==0){ //如果长度为0，把他隐藏
      $("._myAppend").css("height", '0px')
    }else{
      $("._myAppend").css("height", '300px')
    }
    $("._myAppend").append($(".panel-success").find('li'));

    let str = `<div class="col-lg-2 text-center _del" ><label  class="extra p10 ml _desc"><i   class="icon-trash" ></i></label></div>`

    $("._myAppend").find($('li')).children('div').append(str);
    $('._myAppend').on('click','._del',function(){
      me.excuDel(this)
    })

  }

  /**
   * 点击关联商品的删除执行的方法
   * @param obj
   */
  excuDel(obj){
    $(obj).parents('.list-group-item').remove();
    if( $('._myAppend').find($('.list-group-item')).length==0){ //如果长度为0，把他隐藏
      $("._myAppend").css("height", '0px')
    }
  }


  /**
   * 提交
   * @param obj
   * @param state
   */
  submit(obj, state) {
    console.log("█ obj ►►►", obj);
    this.submitObj = obj;
    this.submitState = state;
    let me = this;
    if (me.linkType == 'addArticle') {
      this.addArticleExtra()//没有图片上传的时候也可以调用
      /**
       * 构建form时，传入自定义参数
       * @param item
       */
      me.uploader.onBuildItemForm = function (fileItem, form) {
        form.append('uuid', me.uuid);
      };

      /**
       * 执行上传
       */
      me.uploader.uploadAll();

      /**
       * 上传成功处理
       * @param item 上传列表
       * @param response 返回信息
       * @param status 状态
       * @param headers 头信息
       */
      me.uploader.onSuccessItem = function (item, response, status, headers) {
        let res = JSON.parse(response);
        if (res.success) {
          me.addArticleExtra()
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
      me.uploader.onErrorItem = function (item, response, status, headers) {
        AppComponent.rzhAlt('error', '上传失败', '图片上传失败！');
      };

    } else if (this.linkType == 'updataArticle') {
      var sHTML = $('#summernote').summernote('code')//获取编辑器的值
      let url = '/article/updateArticle';
      obj.articleContent = sHTML;  //赋值编辑器的值
      obj.addArticleEnum = state //默认文章的类型是草稿
      obj.articleId = this.articleId
      let data = obj;
      this.service.postRequest(url, data);
      this.router.navigate(['/main/operation/article/manage']);
    } else if (this.linkType == 'auditArticle') {
      let data = {
        articleId: this.articleId,
        auditState: obj.auditState,
        reason: obj.reason
      }
      let url = "/article/AuditArticle";
      let result = this.ContentService.auditArticle(url, data)
      if (result) {
        this.router.navigate(['/main/operation/article/manage']);
      }

    }

  }

  /**
   * 把新增文章单独写出来，初始化(没有图片上传)和当图片上传成功的时候都可以调用
   */
  addArticleExtra() {
    var sHTML = $('#summernote').summernote('code')//获取编辑器的值

    let idStr = ''; //获取关联的商品
    let obj = $("._myAppend").find('._copy').find('input');
    console.log("█  $(\".panel-_myAppend\").find('._copy') ►►►",   $("._myAppend").find('._copy'));
    for (let i = 0; i < obj.length; i++) {
      idStr += `${$(obj[i]).val()},`
    }
    this.linkGoodStr = idStr.slice(0, idStr.length - 1);

    let url = '/article/addArticle';

    this.submitObj.articleContent = sHTML;  //把编辑器的值保存下来
    this.submitObj.addArticleEnum = this.submitState //默认文章的类型是草稿
    this.submitObj.uuid = this.uuid;
    this.submitObj.goodIds = this.linkGoodStr;
    let data = this.submitObj;

    this.service.postRequest(url, data);
    this.router.navigate(['/main/operation/article/manage']);
  }


}
