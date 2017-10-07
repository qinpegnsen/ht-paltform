import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {SubmitService} from "../../../../../core/forms/submit.service";

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
  constructor(
    private routeInfo: ActivatedRoute,
    public service: SubmitService) { }

  /**
   * 1、获取当前id的文章信息
   */
  ngOnInit() {
    this.articleId = this.routeInfo.snapshot.queryParams['id'];//获取地址栏传递过来的文章给的id
    let url = '/article/queryArticle';
    let data = {
      articleId: this.articleId
    }
    this.queryArticleData = this.service.getData(url, data);
    console.log("█ this.queryArticleData ►►►",  this.queryArticleData);
    this.articleCommend=this.queryArticleData.articleCommend;
    this.articleCommentFlag=this.queryArticleData.articleCommentFlag;


    /**
     * 审核时候的两种状态
     * @type {[{id: number; name: string},{id: number; name: string}]}
     */
    this.autionOptions = [
      {id: 'SUCCESS', name: '成功'},
      {id: 'FAILURE', name: '失败'}
    ]
  }
}
