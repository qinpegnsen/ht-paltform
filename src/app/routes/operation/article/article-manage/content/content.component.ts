import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {ContentService} from "./content.service";
import {PageEvent} from "../../../../../shared/directives/ng2-datatable/DataTable";
import {NavService} from "app/routes/operation/article/article-manage/content-nav/nav.service";
import {SubmitService} from "../../../../../core/forms/submit.service";
import {Page} from "../../../../../core/page/page";
const swal = require('sweetalert');

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit,OnChanges  {

  @Input()  //导航栏传过来的文章的状态，从而获取不同的文章列表
  public state;

  @Input()  //导航栏传过来的查询字符串，从而获取到查询的文章
  public searchKey;

  @Output()  //发射获取到得总条数
  public emitTotalRow=new EventEmitter();

  public articleState;//用来储存文章的状态

  public articleManListdata;//存储文章列表的数据

  public TotalRow;//存储文章列表的数据

  public flag:boolean=true;//定义boolean值用来控制内容组件是否显示

  private updatebutton:Object;//更新文章按钮
  private deletebutton:Object;//删除文章按钮
  private detailsbutton:Object;//查看详情按钮
  private publishbutton:Object;//草稿文章发布按钮
  private auditbutton:Object;//待审核文章审核按钮

  constructor(private router:Router,public ContentService:ContentService,public NavService:NavService,public service:SubmitService) {
    this.articleState='DRAFT'
  }

  ngOnInit() {
    /**
     * 路由事件用来监听地址栏的变化
     * 1.当新增文章出现的时候，内容组件隐藏
     * 2.路由变化的时候，刷新页面
     */

    this.router.events
      .subscribe((event) => {
        if (event instanceof NavigationEnd) { // 当导航成功结束时执行
          // console.log(event.url)
          if(event.url.indexOf('linkType')>0){
            this.flag=false;
          }else if(event.url=='/main/operation/article/manage'){
            this.flag=true;
            this.queryArticManleList('N') //刷新内容页面
            this.getTotalRow()
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
      title:"发布文章",
      type: "upload"
    };
    this.auditbutton={
      title:"审核",
      type: "agree"
    };

    this.queryArticManleList('N')//调用文章的列表
  }

  /**
   * 输入属性变化的时候再次查询，获取当前状态下的系统列表
   */
  ngOnChanges(){
    this.articleState=this.state;
    this.queryArticManleList('N')
  }

  /**
   * 得到各种状态的总条数，跟多地方用到
   */
  public getTotalRow(){
    let data={}
    let url= "/article/getCountByState";
    this.TotalRow=this.NavService.queryTotalRow(url,data) //刷新导航页面
    this.emitTotalRow.emit(this.TotalRow)
  }
  /**
   * 获取文章管理的列表数据(初始化的时候和点击页码的时候都会调用)
   * @param event 点击页码时候的事件对象
   * addArticlestate 新增文章的时候传递过来的状态，然后刷新当前状态
   */
  public queryArticManleList(booelean,event?:PageEvent,addArticlestate?) {
    let activePage = 1;
    if(typeof event !== "undefined") activePage =event.activePage;
    let data={
      curPage:activePage,
      pageSize:8,
      articleState:this.articleState,
      articleTitle:this.searchKey,
      isTopState:booelean
    }

    if(addArticlestate){
      data.articleState=addArticlestate;
    }else{
      data.articleState=this.articleState?this.articleState:'DRAFT';
    }
    let url= "/article/queryAllArticleBySort";
    let result=new Page(this.service.getData(url,data));
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
          that.queryArticManleList('N')
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
    let url= "/article/publishArticle";
    let result=this.ContentService.publishArticle(url,data)
    if(result){
      this.queryArticManleList('N')//调用文章的列表，刷新页面
      this.getTotalRow()
    }
  }

  /**
   * 审核文章
   */
  auditArticle(id){
    let data={
      articleId:id,
      auditState:'SUCCESS',
      reason:''
    }
    let url= "/article/AuditArticle";
    let result=this.ContentService.auditArticle(url,data)
    if(result){
      this.queryArticManleList('N')//调用文章的列表，刷新页面
      this.getTotalRow()
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
      this.queryArticManleList('N')
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
    if(result){
      this.queryArticManleList('Y')//调用文章的列表
    }
  }

}