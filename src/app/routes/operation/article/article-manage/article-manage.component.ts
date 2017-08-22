import { Component, OnInit } from '@angular/core';
import {PageEvent} from "../../../../shared/directives/ng2-datatable/DataTable";
import {TableDateService} from "./table-date.service";

@Component({
  selector: 'app-article-manage',
  templateUrl: './article-manage.component.html',
  styleUrls: ['./article-manage.component.scss']
})
export class ArticleManageComponent implements OnInit {

  private articleManAddbutton:Object;//新增文章按钮

  private articleManListdata;//用来存储服务取回来的数据

  constructor(private TableDateService:TableDateService) {

  }

  /**
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

    this.queryArticManleList()
  }



  /**
   * 获取文章管理的列表数据(初始化的时候和点击页码的时候都会调用)
   * @param event 点击页码时候的事件对象
   */
  public queryArticManleList(event?:PageEvent) {
    let activePage = 1;
    if(typeof event !== "undefined") activePage =event.activePage;
    let data={
      curPage:activePage,
      pageSize:6,
      articleState:'AUDIT'
    }
    let url= "/article/queryAllArticle";
    let result=this.TableDateService.queryData(data,url);
    this.articleManListdata= result;
    console.log(this.articleManListdata)
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
