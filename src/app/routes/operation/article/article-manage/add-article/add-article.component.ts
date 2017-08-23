import {Component, OnInit, Output} from '@angular/core';
import {AddArticleManService} from "./add-article-man.service";
import {ActivatedRoute, Router} from "@angular/router";
import {SettingsService} from "../../../../../core/settings/settings.service";
import {ArticleManageComponent} from "../article-manage.component";
import {EventEmitter} from "selenium-webdriver";
import {ContentComponent} from "app/routes/operation/article/article-manage/content/content.component";
declare var $: any;
@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.scss']
})
export class AddArticleComponent implements OnInit {

  public linkType:string;

  public contents: string;

  public flag: boolean;

  public articleClassList;//文章分类列表的数据

  constructor(public settings: SettingsService,private routeInfo: ActivatedRoute,public AddArticleManService: AddArticleManService,public ArticleManageComponent:ArticleManageComponent,public router:Router,public ContentComponent:ContentComponent) {
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

    /**
     * 调用富文本编辑器
     */
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
    this.router.navigate(['/main/operation/article/manage']);
  }
  // 提交
  submit(obj,RichText){
    if(this.linkType=='addArticle'){
      var sHTML = $('#summernote').summernote('code')//获取编辑器的值
      console.log(sHTML)
      let url='/article/addArticle';
      obj.articleContent=sHTML;  //赋值编辑器的值
      obj.addArticleEnum='DRAFT' //默认文章的类型是草稿
      let data=obj;
      this.AddArticleManService.addArticle(url,data);
      this.router.navigate(['/main/operation/article/manage']);
      this.ContentComponent.queryArticManleList()
    }
  }
}
