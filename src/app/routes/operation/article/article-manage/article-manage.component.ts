import {Component, OnInit, ViewChild} from '@angular/core';
import {PageEvent} from "../../../../shared/directives/ng2-datatable/DataTable";
import {TableDateService} from "./table-date.service";
import {NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-article-manage',
  templateUrl: './article-manage.component.html',
  styleUrls: ['./article-manage.component.scss']
})
export class ArticleManageComponent implements OnInit {

  private articleManAddbutton:Object;//新增文章按钮

  private articleManListdata;//用来存储服务取回来的数据

  public flag:boolean;//定义boolean值用来控制内容组件是否显示

  constructor(private TableDateService:TableDateService,private router:Router) {

  }

  /**linkType
   * 初始化
   * 1.给articleManButtonLists和articleManAddbutton赋值
   * 2.调用文章管理的接口
   * 3.button的回调方法
   */
  ngOnInit() {


    this.articleManAddbutton={
        text:"新增文章",
        title:"新增文章",
        type: "add"
      };



  }






  /**
   * 查询当前文章的信息
   */
  selecteArticle(id){
    let data={
      articleId:id,
      queryState:''
    }
    let url= "/article/queryArticle";
   this. TableDateService.selsectArticle(url,data)
  }

  /**
   * 删除文章
   */
  delArticle(id){
    console.log(id)
    let data={
      articleId:id
    }
    let url= "/article/deleteArticleByState";
    this. TableDateService.delArticle(url,data)
  }
}
