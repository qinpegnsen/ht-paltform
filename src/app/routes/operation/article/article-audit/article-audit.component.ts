import { Component, OnInit } from '@angular/core';
import {PageEvent} from "../../../../shared/directives/ng2-datatable/DataTable";
import {Page} from "../../../../core/page/page";
import {SubmitService} from "../../../../core/forms/submit.service";
import {isNullOrUndefined} from "util";

@Component({
  selector: 'app-article-audit',
  templateUrl: './article-audit.component.html',
  styleUrls: ['./article-audit.component.scss']
})
export class ArticleAuditComponent implements OnInit {

  public articleManListdata;               //存储文章列表的数据
  private auditbutton:Object;              //待审核文章审核按钮

  constructor(public service:SubmitService) { }

  /**
   * 1.调用文章审核的列表
   * 2.对审核按钮进行赋值
   */
  ngOnInit() {
    let curPage=sessionStorage.getItem('auditCurPage');
    this.queryArticManleList(curPage?curPage:1);
    this.auditbutton={
      title:"审核",
      type: "agree"
    };
  }

  /**
   * 获取文章管理的审核列表数据
   * @param event 点击页码时候的事件对象
   * @paddArticlestate 新增文章的时候传递过来的状态，然后刷新当前状态
   * @pbooelean  是否调取置顶的列表
   */
  queryArticManleList(curPage,event?:PageEvent) {
    sessionStorage.removeItem('auditCurPage');
    let activePage = 1;
    if(typeof event !== "undefined") {
      activePage =event.activePage
    }else if(!isNullOrUndefined(curPage)){
      activePage =curPage
    };
    let data={
      curPage:activePage,
      pageSize:10,
      articleState:'AUDIT',
      articleTitle:'',
      isTopState:'N'
    }
    let url= "/article/queryAllArticleBySort";
    let result=new Page(this.service.getData(url,data));
    this.articleManListdata= result;
  }
}
