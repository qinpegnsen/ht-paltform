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
  private updatebutton:Object;//更新文章按钮
  private deletebutton:Object;//删除文章按钮
  private detailsbutton:Object;//查看详情按钮
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
    this.updatebutton={
        title:"编辑",
        type: "update"
      };
    this.deletebutton={
        title:"删除",
        type: "delete"
      };
    this.detailsbutton={
      title:"详情",
      type: "details"
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
      pageSize:6
    }
    let url= "/article/queryAllArticle";
    let result=this.TableDateService.queryData(data,url);
    this.articleManListdata= result;
  }


  /**
   * 查询文章
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
   * 查询文章
   */
  delArticle(id){
    let data={
      articleId:id,
      queryState:''
    }
    let url= "/article/queryArticle";
    this. TableDateService.selsectArticle(url,data)
  }
}
