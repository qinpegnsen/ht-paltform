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
  constructor(private routeInfo: ActivatedRoute,public settings: SettingsService,public AddArticleManService: AddArticleManService) {
    this.settings.showRightPage("30%");
  }

  ngOnInit() {
    this.linkType = this.routeInfo.snapshot.queryParams['linkType'];
  }

  // 取消
  cancel(){
    this.settings.closeRightPageAndRouteBack(); //关闭右侧滑动页面
  }
  // 提交
  submit(obj){
    if(this.linkType=='addClass'){
      let url='/article/addArticles';
      let data={
        articleTitle:obj.articleTitle,
        articleTitleShort:obj.articleTitleShort,
        articleClassId:obj.articleClassId,
        articleAbstract:obj.articleAbstract,
        url:obj.url
      }
      this.AddArticleManService.addArticle(url,data);

    }

  }
}
