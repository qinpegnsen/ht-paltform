import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SettingsService} from "../../../../../core/settings/settings.service";
import {GetUidService} from "../../../../../core/services/get-uid.service";
import {FileUploader} from "ng2-file-upload";
import {AppComponent} from "../../../../../app.component";
import {ContentService} from "../content/content.service";
import {SubmitService} from "../../../../../core/forms/submit.service";
declare var $: any;

const uploadUrl = "/article/uploadCoverImage";  //图片上传路径(调取上传的接口)
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
  public uploader:FileUploader = new FileUploader({
    url: uploadUrl,
    itemAlias:"limitFile",
    queueLimit: 1
  });

  private fileName:string = '选择图片';

  private myImg: any;

  private uuid: any;

  public linkType: string;

  public contents: string;

  public reason: string;

  public flag: boolean=false;

  public articleClassList; // 文章分类列表的数据

  public articleId:number // 路由传递过来的文章的id

  public queryArticleData:any //用来保存根据文章的id查询出来的文章的信息

  public articleCoverType;//初始化的时候设置默认选中的值
  public articleCoverTypes;//初始化的时候设置默认选中的值
  public submitObj;//用来保存提交的时候的数据，在addArticleExtra里面使用
  public submitState;//用来保存提交的时候的状态，在addArticleExtra里面使用
  public autionOptions;//审核状态的列表

  constructor(public settings: SettingsService, private routeInfo: ActivatedRoute, public router: Router, public GetUidService: GetUidService,public ContentService:ContentService,public service:SubmitService) {
    this.settings.showRightPage( "30%" );
  }

  ngOnInit() {

    this.linkType = this.routeInfo.snapshot.queryParams['linkType'];//获取地址栏的参数
    this.articleId = this.routeInfo.snapshot.queryParams['id'];//获取地址栏传递过来的文章给的id

    this.articleCoverType = 'AUTO'//文章封面类型默认的样式

    this.articleCoverTypes=[
      {key:'AUTO',text:'自动'},
      {key:'ONE',text:'一个封面'},
      {key:'THREE',text:'三个封面'}

    ]

    /**
     * 初始化的时候调取文章分类的接口
     * @type {string}
     */
    let url = '/articleClass/queryArticleClassPage';
    let data = {
      curPage:1,
      pageSize:10,
    }
    this.articleClassList = this.service.getData(url,data).voList

    /**
     * 调用富文本编辑器，初始化编辑器
     */

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
    }, 0);

    /**
     * 根据id查询文章的数据
     * @type {string}
     */
    if(this.linkType=='updataArticle'){
      let queryArticleurl = '/article/queryArticle';
      let queryArticledata = {
        articleId:this.articleId,
        queryState:'BLACK'
      }
      this.queryArticleData= this.service.getData(queryArticleurl,queryArticledata);
      console.log(this.queryArticleData)
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
        $('#summernote').summernote('code',this.queryArticleData.articleBody.articleContent );//给编辑器赋值
      }, 0);
    }

    /**
     * 审核时候的两种状态
     * @type {[{id: number; name: string},{id: number; name: string}]}
     */
    this.autionOptions=[
      {id:1,name:'SUCCESS'},
      {id:2,name:'FAILURE'}
    ]

  }

  /**
   * 单选按钮的点击事件，然后来决定是否显示封面路径,同时获取暗码，写到图片上传的点击事件不行
   * @param code
   */
  changeState(code){
    if(code=='ONE'||code=='THREE'){
      this.flag=true;
    }else {
      this.flag=false;
    }
    this.uuid=this.GetUidService.getUid();
  }

  /**
   * 监听图片选择
   * @param $event
   */
  fileChangeListener($event) {
    let that = this;
    let image: any = new Image();
    let file: File = $event.target.files[0];
    that.fileName = file.name;
    let myReader: FileReader = new FileReader();

    myReader.readAsDataURL(file);

    myReader.onloadend = function (loadEvent: any) {
      image.src = loadEvent.target.result;
      that.myImg = image.src;
    };


  }

  // 取消
  cancel() {
    this.router.navigate(['/main/operation/article/manage']);
  }

  // 提交
  submit(obj,state) {
    this.submitObj=obj;
    this.submitState=state;
    let me=this;
    if (me.linkType == 'addArticle') {
      this.addArticleExtra()//没有图片上传的时候也可以调用
      /**
       * 构建form时，传入自定义参数
       * @param item
       */
      me.uploader.onBuildItemForm = function(fileItem, form){
        console.log("█ fileItem ►►►",  fileItem);
        console.log(form)
        form.append('uuid', me.uuid);
        console.log("█ form ►►►",  form);
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
        console.log("█ res ►►►",  res);
        if(res.success){
          me.addArticleExtra()
        }else{
          AppComponent.rzhAlt('error','上传失败', '图片上传失败！');
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
        AppComponent.rzhAlt('error','上传失败', '图片上传失败！');
      };

    }else if (this.linkType == 'updataArticle') {
      var sHTML = $('#summernote').summernote('code')//获取编辑器的值
      console.log(sHTML)
      let url = '/article/updateArticle';
      obj.articleContent = sHTML;  //赋值编辑器的值
      obj.addArticleEnum = state //默认文章的类型是草稿
      obj.articleId=this.articleId
      let data = obj;
      this.service.postRequest(url,data);
      this.router.navigate(['/main/operation/article/manage']);
    }else if (this.linkType == 'auditArticle') {
      let data={
        articleId:this.articleId,
        auditState:obj.auditState,
        reason:obj.reason
      }
      let url= "/article/AuditArticle";
      let result=this.ContentService.auditArticle(url,data)
      if(result){
        this.router.navigate(['/main/operation/article/manage']);
      }

    }

  }

  /**
   * 把新增文章单独写出来，初始化(没有图片上传)和当图片上传成功的时候都可以调用
   */
  addArticleExtra(){
    var sHTML = $('#summernote').summernote('code')//获取编辑器的值
    // console.log(sHTML)
    let url = '/article/addArticle';
    this.submitObj.articleContent = sHTML;  //把编辑器的值保存下来
    this.submitObj.addArticleEnum = this.submitState //默认文章的类型是草稿
    this.submitObj.uuid=this.uuid;
    let data = this.submitObj;
    console.log(this.submitState)
    this.service.postRequest(url,data);
    this.router.navigate(['/main/operation/article/manage']);
  }
}
