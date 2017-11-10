import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SubmitService} from "../../../../../core/forms/submit.service";
import {ContentService} from "../../article-manage/content/content.service";
import { Location }from '@angular/common';
import {ArticleAuditComponent} from "../article-audit.component";

declare var $: any;
@Component({
  selector: 'app-audit-page',
  templateUrl: './audit-page.component.html',
  styleUrls: ['./audit-page.component.scss']
})
export class AuditPageComponent implements OnInit {

  public articleId: number                          // 路由传递过来的文章的id
  public queryArticleData: any                      //用来保存根据文章的id查询出来的文章的信息
  public articleCommend: any                        //文章是否推荐
  public articleCommentFlag: any                    //文章是否评论
  public autionOptions;                             //审核状态的列表
  public articleCoverTypes;                         //文章封面的类型数据
  public curPage;                                   //当前的页面

  constructor(
    public routeInfo: ActivatedRoute,
    public ContentService: ContentService,
    public router: Router,
    public location: Location,
    public articleAuditComponent: ArticleAuditComponent,
    public service: SubmitService) { }

  /**
   * 1、获取当前id的文章信息
   */
  ngOnInit() {
    this.articleId = this.routeInfo.snapshot.queryParams['id'];//获取地址栏传递过来的文章给的id
    this.curPage = this.routeInfo.snapshot.queryParams['curPage'];//获取地址栏传递过来的文章给的id
    let url = '/article/queryArticle';
    let data = {
      articleId: this.articleId
    }
    this.queryArticleData = this.service.getData(url, data);
    this.articleCommend=this.queryArticleData.articleCommend;
    this.articleCommentFlag=this.queryArticleData.articleCommentFlag;

    setTimeout(() => {//初始化编辑器和给编辑器赋值
      let me = this;
      $('#summernote').summernote({
        height: 280,
        dialogsInBody: true,
        lang: 'zh-CN',
        callbacks: {
          onChange: (contents, $editable) => {}
        }
      });
      $('#summernote').summernote('code', this.queryArticleData.articleBody.articleContent);
      $('#summernote').summernote('disable');
    }, 0);

    /**
     * 审核时候的两种状态
     * @type {[{id: number; name: string},{id: number; name: string}]}
     */
    this.autionOptions = [
      {id: 'SUCCESS', name: '成功'},
      {id: 'FAILURE', name: '失败'}
    ];

    /**
     * 文章的封面三种类型
     * @type {[{key: string; text: string},{key: string; text: string},{key: string; text: string}]}
     */
    this.articleCoverTypes = [
      {key: 'AUTO', text: '自动'},
      {key: 'ONE', text: '单图'},
      {key: 'THREE', text: '三图'}
    ];
  };

  /**
   * 提交审核
   */
  submit(obj){
    let data = {
      articleId: this.articleId,
      auditState: obj.auditState,
      reason: obj.reason
    };
    let url = "/article/AuditArticle";
    let result = this.ContentService.auditArticle(url, data)
    if (result) {
      this.location.back();
      sessionStorage.setItem('auditCurPage',this.curPage);
      this.router.navigate(['/main/operation/article/audit']);
    }
  }
}
