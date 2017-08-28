import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {ContentService} from "./content.service";
import {PageEvent} from "../../../../../shared/directives/ng2-datatable/DataTable";
const swal = require('sweetalert');

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit,OnChanges  {

  @Input()  //导航栏传过来的文章的状态，从未获取不同的文章列表
  public state;

  @Input()  //导航栏传过来的文章的状态，从未获取不同的文章列表
  public searchKey;

  public articleState;

  public articleManListdata;//存储文章列表的数据

  public flag:boolean=true;//定义boolean值用来控制内容组件是否显示

  private updatebutton:Object;//更新文章按钮
  private deletebutton:Object;//删除文章按钮
  private detailsbutton:Object;//查看详情按钮
  private publishbutton:Object;//草稿文章发布按钮
  private auditbutton:Object;//待审核文章审核按钮

  constructor(private router:Router,public ContentService:ContentService) {
    this.articleState='DRAFT'
  }

  ngOnInit() {
    /**
     * 路由事件用来监听地址栏的变化，当新增文章出现的时候吗，内容组件隐藏
     */

    this.router.events
      .subscribe((event) => {
        if (event instanceof NavigationEnd) { // 当导航成功结束时执行
          if(event.url.indexOf('linkType')>0){
            this.flag=false;
          }else if(event.url=='/main/operation/article/manage'){
            this.flag=true;
          }
        }
      });
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
    this.publishbutton={
      title:"发布",
      type: "submit"
    };
    this.publishbutton={
      title:"审核通过",
      type: "agree"
    };

    this.queryArticManleList()//调用文章的列表
    console.log(this.state)
  }

  ngOnChanges(){
    this.queryArticManleList()
    this.articleState=this.state;
    console.log(this.articleState)
    console.log(this.searchKey)
    // console.log(this.articleState)
  }

  /**
   * 获取文章管理的列表数据(初始化的时候和点击页码的时候都会调用)
   * @param event 点击页码时候的事件对象
   * addArticlestate 新增文章的时候传递过来的状态，然后刷新当前状态
   */
  public queryArticManleList(event?:PageEvent,addArticlestate?) {
    let activePage = 1;
    if(typeof event !== "undefined") activePage =event.activePage;
    let data={
      curPage:activePage,
      pageSize:8,
      articleState:'',
      articleTitle:this.searchKey
    }
    console.log(data)
    if(addArticlestate){
      data.articleState=addArticlestate;
    }else{
      data.articleState=this.articleState?this.articleState:'DRAFT';
    }

    let url= "/article/queryAllArticle";
    let result=this.ContentService.queryData(url,data);
    this.articleManListdata= result;
  }

  /**
   * 删除文章 首先进行确认是否删除
   */
  delArticle(delId){
    let that=this;
    swal({
      title: "您确定要删除吗？",
      text: "您确定要删除这条数据？",
      type: "warning",
      showCancelButton: true,
      closeOnConfirm: false,
      confirmButtonText: "确认",
      cancelButtonText: '取消',
      confirmButtonColor: "#ec6c62"
    },function(isConfirm){
      if (isConfirm) {
        swal.close(); //关闭弹框
        let url='/article/deleteArticleByState';
        let data={
          articleId:delId
        }
        let  flag = that.ContentService.confirmDel(url,data)
        if(flag){
          that.queryArticManleList()
        }
      } else {
        swal("Cancelled", "Your imaginary file is safe :)", "error");
      }
    });
  }

  /**
   * 发布文章
   */
  publishArticle(id){
    let data={
      articleId:id
    }
    let url= "/article/pubArticle";
    let result=this.ContentService.publishArticle(url,data)
    if(result){
      let result=this.queryArticManleList()//调用文章的列表
      this.articleManListdata= result;//获取到数据，刷新页面
    }
  }

  /**
   * 审核文章
   */
  auditArticle(id){
    let data={
      articleId:id
    }
    let url= "/article/AuditArticle";
    let result=this.ContentService.isTop(url,data)
    if(result){
      let data={
        articleId:id,
        auditState:'SUCCESS',
        reason:id
      }
      let url= "/article/queryAllArticleBySort";
      let result=this.ContentService.queryTopList(url,data);
      this.articleManListdata= result;//获取到数据，刷新页面
    }
  }


  /**
   * 文章是否推荐
   * @param data 当前获取到得数据
   */
  isRecom(article){
    if(article.articleCommend=="Y"){
      article.articleCommend="N"
    }else if(article.articleCommend=="N"){
      article.articleCommend="Y"
    }
    let data={
      articleId:article.id,
      commendState:article.articleCommend
    }
    let url= "/article/updateArticleIsCommend";
    let result=this.ContentService.isRecom(url,data)
    if(result){
      this.queryArticManleList()
    }
  }

  /**
   * 文章是否置顶,置顶成功以后调用专门呈现置顶成功后的文章列表接口,刷新页面
   * @param data
   */
  isTop(article){
    console.log(this.articleState)
    let that=this;
    console.log(article)
    if(article.isTop=="Y"){
      article.isTop="N"
    }else if(article.isTop=="N"){
      article.isTop="Y"
    }
    let data={
      articleId:article.id,
      isTopState:article.isTop
    }
    let url= "/article/pubArticle";
    let result=that.ContentService.isTop(url,data)
    console.log(that.articleState)
    if(result){
      let data={
        articleState:that.articleState
      }
      console.log(data)
      let url= "/article/queryAllArticleBySort";
      let result=that.ContentService.queryTopList(url,data);
      console.log(result)
      that.articleManListdata= result;//获取到数据，刷新页面
    }
  }

}
