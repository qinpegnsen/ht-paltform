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

  private uuid=[];                                 //存储暗码的数组
  public linkType: string;
  public contents: string;
  public reason: string;
  public flag: boolean = false;                    //开关，用来判断是否显示图片路径
  public articleId: number                          // 路由传递过来的文章的id
  public queryArticleData: any                      //用来保存根据文章的id查询出来的文章的信息
  public articleCoverType;                          //初始化的时候设置默认选中的值
  public articleCoverTypes;                         //文章封面的类型数据
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
  private articleClasssId:number;                    //存储子组件发射过来的id
  private emitClasssId:number;                       //修改审核的时候把当前的id发送到子组件
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

    this.deletebutton = {//删除按钮
      title: "删除",
      type: "delete"
    };


    /**
     * 文章的封面三种类型
     * @type {[{key: string; text: string},{key: string; text: string},{key: string; text: string}]}
     */
    this.articleCoverTypes = [
      {key: 'AUTO', text: '自动'},
      {key: 'ONE', text: '单图'},
      {key: 'THREE', text: '三图'}
    ]

    /**
     * 审核时候的两种状态
     * @type {[{id: number; name: string},{id: number; name: string}]}
     */
    this.autionOptions = [
      {id: 'SUCCESS', name: '成功'},
      {id: 'FAILURE', name: '失败'}
    ]


    /**
     * 解决拖拽时候默认出现的框
     */
    setTimeout(() => {
      $(".note-dropzone").css("display", 'none')
    }, 0)

    this.getDataById()
  }

  /**
   * 修改或者是审核的时候根据id查询文章的数据或者新增的时候初始化编辑器的值
   */
  getDataById(){
    if (this.linkType == 'updateArticle' || this.linkType == 'auditArticle') {
      let url = '/article/queryArticle';
      let data = {
        articleId: this.articleId
      }
      this.queryArticleData = this.service.getData(url, data);
      console.log("█ this.queryArticleData ►►►",  this.queryArticleData);
      this.emitClasssId=this.queryArticleData.articleClassId;//获取到当前的类别id，并且展示其名称
      console.log("█ expr ►►►",  this.queryArticleData.coverType);
      this.coverType(this.queryArticleData.coverType);//初始化的时候对上传的文件的数量做修改，要不然默认都是1
      console.log("█ this.emitClasssId ►►►",  this.emitClasssId);
      console.log(this.queryArticleData);
      setTimeout(() => {//初始化编辑器和给编辑器赋值
        let me = this;
        $('#summernote').summernote({
          height: 280,
          dialogsInBody: true,
          callbacks: {
            onChange: (contents, $editable) => {
              me.contents = contents;
              // console.log(contents);
            },
            onImageUpload: function (files) {
              for (let file of files) me.sendFile(file);
            }
          }
        });
        $('#summernote').summernote('code', this.queryArticleData.articleBody.articleContent);
      }, 0);
      if(this.linkType == 'updateArticle' ){//如果是修改的时候要添加删除按钮
        console.log("█ 1 ►►►",  1);
        setTimeout(()=>{
          let str = `<div class="col-lg-2 text-center _del" ><label  class="extra p10 ml _desc"><i   class="icon-trash" style="color:red"></i></label></div>`;
          console.log("█ $(\"._myAppend\").find($('li')).children('div') ►►►",  $("._myAppend").find($('li')).children('div'));
          $("._myAppend").find($('li')).children('div').append(str);//在给每个里追加一个删除按钮
          $('._myAppend').on('click','._del',function(){
            this.excuDel(this)
          })
        },0)

      }
    }else if(this.linkType == 'addArticle'){
      setTimeout(() => {//新增的时候初始化编辑器的值
        let me = this;
        $('#summernote').summernote({
          height: 280,
          dialogsInBody: true,
          callbacks: {
            onChange: (contents) => {
              me.contents = contents;
            },
            onImageUpload: function (files) {
              for (let file of files) me.sendFile(file);
            }
          }
        });
      }, 0);

    }
  }

  /**
   * 修改的时候删除文章封面的图片
   */
  remove(obj){
    $(obj).css("display",'none');
  }

  /**
   * 获取到子组件发射过来的分类编码
   * @param menuCode
   */
  getData(menuCode){
    this.articleClasssId=menuCode;
  }

  /**
   * 文章关联商品选择分类
   * @param data  选择分类组件输出数据
   */
  getKind(data) {
    this.kindId = data.kindId;
    this.getLinkGoods();
    this.getBrandList(this.kindId)
  }

  /**
   * 文章关联商品选择品牌名
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
   * 文章关联商品品牌名搜索
   */
  refreshValue(value: any): void {
    this.brandName = value.text;
    this.getLinkGoods();
  }

  /**
   * 文章关联商品商品名称搜索
   */
  search() {
    this.getLinkGoods();
  }

  /**
   * 文章关联商品获取关联的商品的数据
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
      if (code == 'THREE') {//这里重新写的原因是为了让下次点击的时候没有图片
        this.uploader = new FileUploader({
          url: uploadUrl,
          itemAlias: "limitFile",
          queueLimit: 3
        });
      }else if(code == 'ONE'){//这里重新写的原因是为了让下次点击的时候没有图片
        this.uploader = new FileUploader({
          url: uploadUrl,
          itemAlias: "limitFile",
          queueLimit: 1
        });
      }
    } else {
      this.flag = false;
    }
  }


  /**
   * 编辑器上传图片并显示
   * @param file
   */
  sendFile(file) {
    let _this = this, img = _this.tools.uploadImg(file);
    if (!isNullOrUndefined(img)) {
      $("#summernote").summernote('insertImage', img,function($image){
        $image.css({
          width: '20%'
        });
      });
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
   * 新增文章取消
   */
  cancel() {
    this.router.navigate(['/main/operation/article/manage']);
  }

  /**
   * 取消弹框(关联商品)
   */
  closeAlert() {
    this.goodShow = !this.goodShow;
    $("session").css('z-index', 0);
    $(".note-dropzone").css("display",'none');//解决关联商品后编辑器有遮罩层层的bug
    this.listTeamOne=[];//清空已经选择的数组
  }

  /**
   * 获取弹框选择的商品的信息（关联商品提交时）
   */
  alertResult() {
    let  me = this;
    this.closeAlert();//关闭弹窗

    $("._myAppend").append($(".panel-success").find('li'));//把已经选择的追加到里面

    if( $('._myAppend').find($('.list-group-item')).length==0){ //如果长度为0，把他隐藏
      $("._myAppend").css("height", '0px')
    }else{
      $("._myAppend").css("height", '300px')
    }

    let str = `<div class="col-lg-2 text-center _del" ><label  class="extra p10 ml _desc"><i   class="icon-trash" style="color:red"></i></label></div>`

    let obj=$("._myAppend").find($('li')).children('div');
    for(let i=0;i<obj.length;i++){//循环一遍给没有删除按钮的加删除按钮
      if($(obj[i]).find('._del').length==0){
        $(obj[i]).append(str)
      }
    }
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
   * 图片上传
   */
  uploadImg(){
    let me = this;
    /**
     * 构建form时，传入自定义参数
     * @param item
     */
    me.uploader.onBuildItemForm = function (fileItem, form) {
      let uuid=me.GetUidService.getUid();
      form.append('uuid',uuid);
      me.uuid.push(uuid);
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
        console.log("█ '上传图片成功' ►►►",  '上传图片成功');
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


    /**
     * 所有图片都上传成功后执行添加文章
     */
    me.uploader.onCompleteAll=function(){
      console.log("█ 3333 ►►►",  3333);
      me.addArticleExtra();
    }
  }

  /**
   * 提交（文章新增修改的提交）
   * @param obj
   * @param state
   */
  submit(obj, state) {
    console.log("█ 1 ►►►",  1);
    this.submitObj = obj;
    this.submitState = state;
    let me = this;
    if (me.linkType == 'addArticle') {
      console.log("█  ►►►", me.uuid.length );
      if(me.uuid.length==0){
        this.addArticleExtra()
      }else{
        me.uploadImg();//执行图片上传的方法
      }
    } else if (this.linkType == 'updateArticle') {
      var sHTML = $('#summernote').summernote('code')//获取编辑器的值
      let idStr = ''; //获取关联的商品
      let goodObj = $("._myAppend").find('._copy').find('input');
      for (let i = 0; i < goodObj.length; i++) {
        idStr += `${$(goodObj[i]).val()},`
      }
      this.linkGoodStr = idStr.slice(0, idStr.length - 1);
      let url = '/article/updateArticle';
      obj.articleContent = sHTML;  //赋值编辑器的值
      console.log("█ sHTML ►►►",  sHTML);
      obj.addArticleEnum = state //默认文章的类型是草稿
      obj.articleClassId = this.articleClasssId;
      console.log("█ this.articleClasssId ►►►",  this.articleClasssId);
      obj.goodIds = this.linkGoodStr;
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
    let sHTML = $('#summernote').summernote('code')//获取编辑器的值
    if(sHTML=='<p><br></p>'){   //默认就有的标签，提交的时候如果文章内容为空，不跳转页面
      sHTML='';
    }
    let idStr = ''; //获取关联的商品
    let obj = $("._myAppend").find('._copy').find('input');
    for (let i = 0; i < obj.length; i++) {
      idStr += `${$(obj[i]).val()},`
    }
    this.linkGoodStr = idStr.slice(0, idStr.length - 1);

    let url = '/article/addArticle';

    this.submitObj.articleContent = sHTML;  //把编辑器的值保存下来
    this.submitObj.uuid = this.uuid.join(',');
    this.submitObj.addArticleEnum = this.submitState //默认文章的类型是草稿
    this.submitObj.goodIds = this.linkGoodStr;
    this.submitObj.articleClassId = this.articleClasssId;
    let data = this.submitObj;
    console.log("█ data ►►►",  data);
    let result=this.operationService.addNewArticle(url, data);
    if(result=='文章内容不能为空'||result=='请选择文章所属类型'){
      return;
    }else{
      this.router.navigate(['/main/operation/article/manage']);
    }
  }
}
