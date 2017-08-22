import { Component, OnInit } from '@angular/core';
import {AddArticleManService} from "./add-article-man.service";
import {ActivatedRoute} from "@angular/router";
import {SettingsService} from "../../../../../core/settings/settings.service";
declare var $: any;
@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.scss']
})
export class AddArticleComponent implements OnInit {

  public linkType:string;

  public contents: string;

  public articleClassList;//文章分类列表的数据

  constructor(public settings: SettingsService,private routeInfo: ActivatedRoute,public AddArticleManService: AddArticleManService) {
    this.settings.showRightPage("30%");
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
  }

  // 取消
  cancel(){
    this.settings.closeRightPageAndRouteBack(); //关闭右侧滑动页面
  }
  // 提交
  submit(obj,RichText){

    console.log(obj)
    console.log(RichText)
    obj.addArticleEnum='DRAFT'
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
        articleCoverType:obj.articleCoverType,
        url:obj.url,
        addArticleEnum:'DRAFT'
      }
      this.AddArticleManService.addArticle(url,data);
    }
  }
}
