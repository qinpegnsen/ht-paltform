import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {SettingsService} from "../../../core/settings/settings.service";
import {AddArticleManService} from "./add-article-man.service";

@Component({
  selector: 'app-add-article-man',
  templateUrl: './add-article-man.component.html',
  styleUrls: ['./add-article-man.component.scss']
})
export class AddArticleManComponent implements OnInit {

  public linkType:string;

  public articleClassList;//文章分类列表的数据

  constructor(private routeInfo: ActivatedRoute,public settings: SettingsService,public AddArticleManService: AddArticleManService) {
    this.settings.showRightPage("80%");
  }

  ngOnInit() {
    this.linkType = this.routeInfo.snapshot.queryParams['linkType'];
    /**
     * 初始化的时候调取文章分类的接口
     * @type {string}
     */
    let url='/articleclass/queryArticleClass';
    let data={}
    this.articleClassList=this.AddArticleManService.articleClass(url,data)
    console.log(this.articleClassList)
  }

  // 取消
  cancel(){
    this.settings.closeRightPageAndRouteBack(); //关闭右侧滑动页面
  }
  // 提交
  submit(obj){
    console.log(obj)
    if(this.linkType=='addArticle'){
      let url='/article/addArticle';
      console.log("█ obj ►►►",  obj);
      let data={
        articleTitle:obj.articleTitle,
        articleTitleShort:obj.articleTitleShort,
        articleClassId:obj.articleClassId,
        articleAbstract:obj.articleAbstract,
        articlekeyword:obj.articlekeyword,
        articleTag:obj.articleTag,
        articleLink:obj.articleLink,
        articleContent:obj.articleContent,
        goodIds:obj.goodIds,
        articleCommend:obj.articleCommend,
        articleCommentFlag:obj.articleCommentFlag,
        articleCoverType:'AUTO',
        url:obj.url,
        articleState:'DRAFT'
      }
      this.AddArticleManService.addArticle(url,data);
    }

  }
}
