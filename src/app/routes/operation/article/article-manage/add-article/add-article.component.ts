import {Component, OnInit} from '@angular/core';
import {AddArticleManService} from "./add-article-man.service";
import {ActivatedRoute, Router} from "@angular/router";
import {SettingsService} from "../../../../../core/settings/settings.service";
import {ArticleManageComponent} from "../article-manage.component";
import {ContentComponent} from "app/routes/operation/article/article-manage/content/content.component";
import {GetUidService} from "../../../../../core/services/get-uid.service";
import {FileUploader} from "ng2-file-upload";
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
    itemAlias:"coverImg",
    queueLimit: 1
  });

  public linkType: string;

  public contents: string;

  public flag: boolean=false;

  public articleClassList; // 文章分类列表的数据

  public articleId:number // 路由传递过来的文章的id

  public queryArticleData:any //用来保存根据文章的id查询出来的文章的信息

  public articleCoverType;//初始化的时候设置默认选中的值
  public articleCoverTypes;//初始化的时候设置默认选中的值
  public articleClassId;//初始化的时候设置默认选中的值

  constructor(public settings: SettingsService, private routeInfo: ActivatedRoute, public AddArticleManService: AddArticleManService, public ArticleManageComponent: ArticleManageComponent, public router: Router, public ContentComponent: ContentComponent,public GetUidService: GetUidService) {
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
    let url = '/articleclass/queryArticleClass';
    let data = {}
    this.articleClassList = this.AddArticleManService.articleClass(url, data)

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
      this.queryArticleData= this.AddArticleManService.queryArticle(queryArticleurl,queryArticledata);
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

    console.log(this.queryArticleData)
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
    let uid=this.GetUidService.getUid();
    console.log(uid)


    /**
     * 构建form时，传入自定义参数
     * @param item
     */
    this.uploader.onBuildItemForm = function(fileItem, form){
      form.append('uuid', this.uid);
    };

    this.uploader.onSuccessItem = function (item, response, status, headers) {
      let res = JSON.parse(response);
      console.log(res)
    };
  }

  upload(){
    console.log(1)
  }

  // 取消
  cancel() {
    this.router.navigate(['/main/operation/article/manage']);
  }

  // 提交
  submit(obj,state) {
    console.log(obj)
    if (this.linkType == 'addArticle') {
      var sHTML = $('#summernote').summernote('code')//获取编辑器的值
      console.log(sHTML)
      let url = '/article/addArticle';
      obj.articleContent = sHTML;  //赋值编辑器的值
      obj.addArticleEnum = state //默认文章的类型是草稿
      let data = obj;
      this.AddArticleManService.addArticle(url, data);
      this.router.navigate(['/main/operation/article/manage']);
      this.ContentComponent.queryArticManleList(state)
    }else if (this.linkType == 'updataArticle') {
      var sHTML = $('#summernote').summernote('code')//获取编辑器的值
      console.log(sHTML)
      let url = '/article/updateArticle';
      obj.articleContent = sHTML;  //赋值编辑器的值
      obj.addArticleEnum = state //默认文章的类型是草稿
      obj.articleId=this.articleId
      let data = obj;
      this.AddArticleManService.updateArticle(url, data);
      this.router.navigate(['/main/operation/article/manage']);
      this.ContentComponent.queryArticManleList(state)
    }
  }
}
