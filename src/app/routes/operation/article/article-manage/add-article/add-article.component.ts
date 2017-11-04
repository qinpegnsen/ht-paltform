import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
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
    queueLimit: 1,
    allowedFileType:["image"]
  });
  private uuid = [];                                 //存储暗码的数组
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
  public brandList: any;                             //品牌列表
  public linkGoodsList: Array<any>;                  //可以选择的商品
  public listTeamOne: Array<any> = [];               //已经选择的商品
  public copylistTeamOne: Array<any> = [];           //已经赋值选择的商品
  private brandName: any = '';                       //品牌名
  private goodsName: any = '';                       //商品名
  private linkGoodStr: any = '';                     //关联商品id的拼接
  private deletebutton: Object;                       //删除按钮
  private articleClasssId: number;                    //存储子组件发射过来的id
  private emitClasssId: number;                       //修改审核的时候把当前的id发送到子组件
  public linkGoodsLength: number = 0;                   //获取到选择的商品的长度 从而决定关联商品html的高度
  public coverCode = 'AUTO';                            //封面的编码，用来判断是否执行图片上传的类型
  public coverChange: boolean = false;                  //修改的时候是否点击修改封面了，点击执行图片上传
  public coverID = [];                                  //存储删除封面图片的id的数组
  public removeCover: boolean = false;                  //上传图片的按钮

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
    let curPage = this.routeInfo.snapshot.queryParams['curPage'];//当前的页码
    sessionStorage.setItem('curPage', curPage)//由于这里的情况特殊不能采取传统的方式
    this.articleCoverType = 'AUTO'//文章封面类型默认的样式
    this.deletebutton = {//删除按钮
      title: "删除",
      type: "delete"
    };

    /**
     * 实现修改的时候可以点击添加
     * @type {AddArticleComponent}
     */
    let that=this;
    that.router.events
      .subscribe((event) => {
        if (event instanceof NavigationEnd) { // 当导航成功结束时执行
          if(event.url.indexOf('=addArticle')>0){
            that.ngOnInit();
          }
        }
      });

    /**
     * 文章的封面三种类型
     * @type {[{key: string; text: string},{key: string; text: string},{key: string; text: string}]}
     */
    this.articleCoverTypes = [
      {key: 'AUTO', text: '自动'},
      {key: 'ONE', text: '单图'},
      {key: 'THREE', text: '三图'}
    ];

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
   * 鼠标放在info 上显示商品名字
   */
  showGoodName(event, i) {
    i.style.display = 'block';
    i.style.top = 17 + 'px';
    i.style.left = '0px';
  }

  /**
   * 鼠标离开时隐藏商品名字
   */
  hideGoodName(i) {
    i.style.display = 'none';
  }

  /**
   * 修改或者是根据id查询文章的数据或者新增的时候初始化编辑器的值
   */
  getDataById() {
    if (this.linkType == 'updateArticle') {
      let url = '/article/queryArticle';
      let data = {
        articleId: this.articleId
      }
      this.queryArticleData = this.service.getData(url, data);
      this.emitClasssId = this.queryArticleData.articleClassId;//获取到当前的类别id，并且展示其名称
      this.coverType(this.queryArticleData.coverType);//初始化的时候对上传的文件的数量做修改，要不然默认都是1
      setTimeout(() => {//初始化编辑器和给编辑器赋值
        let me = this;
        $('#summernote').summernote({
          popover: {  //防止点击图片产生的弹框
            air: []
          },
          height: 280,
          dialogsInBody: true,
          lang: 'zh-CN',
          fontNames: [ '微软雅黑', '黑体','宋体 ','华文楷体','仿宋','方正舒体','方正姚体','楷体','隶书','Helvetica', 'Arial'],
          toolbar: [
            ['Misc', ['undo','redo']],
            ['fontname', ['fontname']],
            ['fontsize', ['fontsize']],
            ['color', ['color']],
            ['style', ['bold', 'italic', 'underline', 'clear']],
            ['font', ['strikethrough', 'superscript', 'subscript']],
            ['para', ['ul', 'ol', 'paragraph','style','height','hr']],
            ['Insert', ['picture','link','video','table',]],
            ['Misc', ['fullscreen', 'help']],
          ],
          callbacks: {
            onChange: (contents, $editable) => {
              me.contents = contents;
              $(".note-editable *").css({'width':'100%',',margin':'0px'});//解决复制过来的p和图片太宽出现横向滚动条
              $(".note-editable img").removeAttr('width');//解决复制过来的p和图片太宽出现横向滚动条
            },
            onImageUpload: function (files) {
              for (let file of files) me.sendFile(file);
            }
          }
        });
        $('#summernote').summernote('code', this.queryArticleData.articleBody.articleContent);
      }, 0);
      let me = this;
      setTimeout(() => {
        let str = `<div class="col-lg-2 text-center _del" ><label  class="extra p10 ml _desc"><i   class="icon-trash" style="color:red"></i></label></div>`;

        $("._myAppend").find($('li')).children('div').append(str);//在给每个里追加一个删除按钮
        $('._myAppend').on('click', '._del', function () {
          me.excuDel(this)
        })
      }, 10)
    } else if (this.linkType == 'addArticle') {
      setTimeout(() => {//新增的时候初始化编辑器的值
        let me = this;
        $('#summernote').summernote({
          popover: {  //防止点击图片产生的弹框
            air: []
          },
          placeholder:'请输入文章内容',
          height: 280,
          dialogsInBody: true,
          lang: 'zh-CN',
          fontNames: [ '微软雅黑', '黑体','宋体 ','华文楷体','仿宋','方正舒体','方正姚体','楷体','隶书','Helvetica', 'Arial'],
          toolbar: [
            ['Misc', ['undo','redo']],
            ['fontname', ['fontname']],
            ['fontsize', ['fontsize']],
            ['color', ['color']],
            ['style', ['bold', 'italic', 'underline', 'clear']],
            ['font', ['strikethrough', 'superscript', 'subscript']],
            ['para', ['ul', 'ol', 'paragraph','style','height','hr']],
            ['Insert', ['picture','link','video','table',]],
            ['Misc', ['fullscreen', 'help']],
          ],
          callbacks: {
            onChange: (contents) => {
              me.contents = contents;
              $(".note-editable *").css({'width':'100%',',margin':'0px'});//解决复制过来的p和图片太宽出现横向滚动条
              $(".note-editable img").removeAttr('width');//解决复制过来的p和图片太宽出现横向滚动条
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
  remove(obj, coverId) {
    this.coverID.push(coverId);
    let delLength = this.coverID.length;
    this.uploader = new FileUploader({
      url: uploadUrl,
      itemAlias: "limitFile",
      queueLimit: delLength,
      allowedFileType:["image"]
    });
    $(obj).css("display", 'none');
    this.removeCover = true;
  }

  /**
   * 获取到子组件发射过来的分类编码
   * @param menuCode
   */
  getData(menuCode) {
    this.articleClasssId = menuCode;
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
  }

  /**
   * 点击选择封面类型，然后来决定是否显示封面路径,同时获取暗码，写到图片上传的点击事件
   * @param code
   */
  coverType(code, flag?) {
    this.coverCode = code;
    if (flag) {//如果是true的话证明是前面的HTML页面点击事件，这时候让变空，否则是初始化的时候就调用然后清空就出现问题了
      this.coverChange = true;
      this.queryArticleData.articleCoverVO = null;
      this.removeCover = true;
    }
    if (code == 'ONE' || code == 'THREE') {
      this.flag = true;
      if (code == 'THREE') {//这里重新写的原因是为了让下次点击的时候没有图片
        this.uploader = new FileUploader({
          url: uploadUrl,
          itemAlias: "limitFile",
          queueLimit: 3,
          allowedFileType:["image"]
        });
      } else if (code == 'ONE') {//这里重新写的原因是为了让下次点击的时候没有图片
        this.uploader = new FileUploader({
          url: uploadUrl,
          itemAlias: "limitFile",
          queueLimit: 1,
          allowedFileType:["image"]
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
      $("#summernote").summernote('insertImage', img, function ($image) {
        $image.css({//设置图片的大小
          width: '100%'
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
    $(".note-dropzone").css("display", 'none');//解决关联商品后编辑器有遮罩层层的bug
    this.copylistTeamOne = this.listTeamOne;//先把数组复制下，用来判断关联商品的样式
    this.listTeamOne = [];//清空已经选择的数组
  }

  /**
   * 获取弹框选择的商品的信息（关联商品提交时）
   */
  alertResult() {
    let me = this;
    this.closeAlert();//关闭弹窗
    let selectGood = $(".panel-success").find('li');//在拖拽里面选择的商品;
    let articlelinkGood = $("._myAppend").find('li');//已经为文章关联的商品;
    if ($('._myAppend').find($('li')).length == 0) { //如果文章关联的商品的长度为0直接追加
      $("._myAppend").append(selectGood);
    } else {//如果追加的时候长度大于0，首先看看在已经关联的商品里面有没有现在选择的商品，因为关联同样的产品好几个没有意义
      for (let i = 0; i < selectGood.length; i++) {
        let flag = true;
        for (let j = 0; j < articlelinkGood.length; j++) {
          if ($(selectGood[i]).find("input:hidden").val() == $(articlelinkGood[j]).find("input:hidden").val()) {
            flag = false;
          }
          ;
        }
        ;
        if (flag) {
          $("._myAppend").append(selectGood[i]);//把已经选择的并且之前没有选择过的追加到关联商品里面;
        }
      }
    }
    ;
    if ($('._myAppend').find($('li')).length == 0) { //追加完之后如果长度为0，把他隐藏
      $("._myAppend").css("height", '0px');
    } else {
      $("._myAppend").removeClass('height0').css('height', '300px');
    }
    ;

    let str = `<div class="col-lg-2 text-center _del" ><label  class="extra p10 ml _desc"><i   class="icon-trash" style="color:red"></i></label></div>`

    let obj = $("._myAppend").find($('li')).children('div');
    for (let i = 0; i < obj.length; i++) {//循环一遍给没有删除按钮的加删除按钮
      if ($(obj[i]).find('._del').length == 0) {
        $(obj[i]).append(str)
      }
    }
    $('._myAppend').on('click', '._del', function () {
      me.excuDel(this)
    })
  }

  /**
   * 点击关联商品的删除执行的方法
   * @param obj
   */
  excuDel(obj) {
    $(obj).parents('.list-group-item').remove();
    if ($('._myAppend').find($('li')).length == 0) { //如果长度为0，把他隐藏
      $("._myAppend").css("height", '0px');
    }
  }

  /**
   * 图片上传
   */
  uploadImg() {
    let me = this;
    /**
     * 构建form时，传入自定义参数
     * @param item
     */
    if (me.uploader.queue.length == 0) {//解决单图或者是3图模式删除了图片但是没有提示bug
      if (this.linkType == 'updateArticle') {//修改时候防止选择了封面类型，却不上传
        if (me.queryArticleData.coverType == 'THREE') {
          AppComponent.rzhAlt('error', '请上传 3 张封面图片');
        } else if (me.queryArticleData.coverType == 'ONE') {
          AppComponent.rzhAlt('error', '请上传 1 张封面图片');
        }
      } else if (this.linkType == 'addArticle') {//新增时候防止选择了封面类型，却不上传
        if (me.articleCoverType == 'THREE') {
          AppComponent.rzhAlt('error', '请上传 3 张封面图片');
        } else if (me.articleCoverType == 'ONE') {
          AppComponent.rzhAlt('error', '请上传 1 张封面图片');
        }
      }
    }
    me.uploader.onBuildItemForm = function (fileItem, form) {
      let uuid = me.GetUidService.getUid();
      form.append('uuid', uuid);
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
    me.uploader.onCompleteAll = function () {
      me.articleExtra();
    }
  }

  /**
   * 提交（文章新增修改的提交）
   * @param obj
   * @param state
   */
  submit(obj, state?) {
    this.submitObj = obj;
    this.submitState = state;
    let me = this;
    if (me.linkType == 'addArticle') {
      if (me.coverCode == 'AUTO') {
        this.articleExtra();
      } else {
        me.uploadImg();//执行图片上传的方法
      }
    } else if (this.linkType == 'updateArticle') {
      if (me.coverChange && me.coverCode != 'AUTO') {//如果点击修改封面了并且不是没图就执行图片上传
        me.uploadImg();//执行图片上传的方法
      } else if (me.coverCode == 'THREE' && me.removeCover) {//如果默认的封面是3张图片上传并且修改了其中的几张图片也执行图片上传
        me.uploadImg();//执行图片上传的方法
      } else if (me.coverCode == 'ONE' && me.removeCover) {//如果默认的封面是1张图片上传并且修改了其中的几张图片也执行图片上传
        me.uploadImg();//执行图片上传的方法
      } else {
        me.articleExtra();
      }
    }
  }

  /**
   * 新增修改的时候都可以调用
   */
  articleExtra() {
    let sHTML = $('#summernote').summernote('code')//获取编辑器的值
    if (sHTML == '<p><br></p>') {   //默认就有的标签，提交的时候如果文章内容为空，不跳转页面
      sHTML = '';
    }
    let idStr = ''; //获取关联的商品
    let obj = $("._myAppend").find('._copy').find('input:hidden');
    for (let i = 0; i < obj.length; i++) {
      idStr += `${$(obj[i]).val()},`
    }
    ;
    this.linkGoodStr = idStr.slice(0, idStr.length - 1);
    this.submitObj.goodIds = this.linkGoodStr;
    this.submitObj.articleContent = sHTML;  //把编辑器的值保存下来
    this.submitObj.uuid = this.uuid.join(',');//暗码
    this.submitObj.coverIds = this.coverID.join(',');//删除封面图片的id
    this.submitObj.articleClassId = this.articleClasssId;
    this.submitObj.articleCommend = 'N';//文章推荐标志
    this.submitObj.articleCommentFlag = 'N';//	文章是否允许评论
    let data = this.submitObj;
    switch (this.linkType) {
      //新增地址
      case "addArticle" :
        var url = '/article/addArticle';
        this.submitObj.addArticleEnum = this.submitState //默认文章的类型是草稿
        break;
      //修改地址
      case "updateArticle" :
        var url = '/article/updateArticle';
        this.submitObj.articleId = this.articleId;
        break;
    }
    let result = this.operationService.addNewArticle(url, data);
    if (result == '文章内容不能为空' || result == '请选择文章分类' ||result == '输入项中不能包含非法字符。,fieldName:articleContent') {
      return;
    } else {
      this.router.navigate(['/main/operation/article/manage']);
    }
  }
}
