import { Component, OnInit } from '@angular/core';
import {ArticleSortService} from "app/routes/operation/article/article-sort/article-sort.service";
import {PageEvent} from "../../../../shared/directives/ng2-datatable/DataTable";
import {ArticleSortDelService} from "./article-sort-del.service";
import {isNullOrUndefined} from "util";
const swal = require('sweetalert');

@Component({
  selector: 'app-article-sort',
  templateUrl: './article-sort.component.html',
  styleUrls: ['./article-sort.component.scss'],
  providers:[ArticleSortDelService]
})
export class ArticleSortComponent implements OnInit {
  private articleSortAddbutton:Object;//新增分类按钮
  private childbutton:Object;//新增子分类按钮
  private deletebutton:Object;//删除按钮
  private updatebutton:Object;//修改按钮
  private articleSortListdata;//用来存储服务取回来的数据
  private searchKey:string='';//默认查询的分类的名称
  private childMenuCode; //菜单编码，查询子集用
  private childMenuTitList:Array<any> = []; //菜单级别面包屑

  constructor(private ArticleSortService:ArticleSortService,private ArticleSortDelService:ArticleSortDelService) { }

  /**
   * 初始化
   * 1.给按钮接口赋值
   * 2.调用文章分类的接口
   *
   */
  ngOnInit() {
    this.updatebutton={
      title:"编辑",
      type: "update"
    };
    this.childbutton={
      title:"新增子分类",
      type: "add"
    };
    this.deletebutton={
      title:"删除",
      type: "delete"
    };
    this.articleSortAddbutton={
      title:"新增分类",
      text:"新增分类",
      type: "add"
    };
    this.queryArticSortleList()
  }
  /**
   * 获取文章分类的列表数据(初始化的时候和点击页码的时候都会调用)
   * @param event 点击页码时候的事件对象
   */
  public queryArticSortleList(event?:PageEvent) {

    let activePage = 1;
    if(typeof event !== "undefined") {activePage =event.activePage};
    let data={
      curPage:activePage,
      pageSize:4,
      acName:this.searchKey
    }
    let url= "/articleClass/queryArticleClassPage";
    let queryData=this.ArticleSortService.queryData(url,data);
    this.articleSortListdata= queryData;
  }

  /**
   * 删除分类 首先进行确认是否删除
   */
  deleteSort(delSortId,acParentId){
    let that=this;
    swal({
        title: "您确定要删除吗？",
        text: "您确定要删除这条数据？",
        type: "warning",
        showCancelButton: true,
        cancelButtonText: '取消',
        closeOnConfirm: false,
        confirmButtonText: "确认",
        confirmButtonColor: "#ec6c62"
      },function(isConfirm){
        if (isConfirm) {
          swal.close(); //关闭弹框
          let url='/articleClass/deleteArticleClassById';
          let data={
            id:delSortId
          }
         let  flag = that.ArticleSortDelService.confirmDel(url,data)
          if(flag){
            that.queryChildSortList(acParentId)
          }
        } else {
          swal("Cancelled", "Your imaginary file is safe :)", "error");
        }
      });
  }


  /**
   * 根据分类的父id查询子分类
   * @param childCode 编码
   * @param menuName  名字
   * @param isTit 是否点击的面包屑导航
   */
  queryChildSortList(childCode?, menuName?, isTit?:boolean) {
    let me = this, num = 0;
    if (isNullOrUndefined(childCode)) {
      this.childMenuCode = null, this.childMenuTitList = []; //清空子集查询
    } else {
      me.childMenuCode = childCode;
      let item = {name: menuName, code: childCode};
      if (!isTit){//非点击面包屑路径时或者是点击返回上一级的时候，添加面包屑
        me.childMenuTitList.push(item);
      }else { //点击面包屑路径时，提出点击地址后的面包屑路径
        for (var i = 0; i < me.childMenuTitList.length; i++) {  //获取点击面包屑的路径地址下标
          if (item.code == me.childMenuTitList[i].code) num = i;
        }
        me.childMenuTitList.splice(num + 1); //剔除下标后的路径
      }
    }
   let data={
     curPage:1,
     pageSize:4,
     acParentId:childCode
   }
   let url= "/articleClass/queryArticleClassPage";
   let result = me.ArticleSortService.queryData(url,data);
   this.articleSortListdata= result;

  }

  /**
   * 返回上一级菜单列表
   */
  goBackMenu() {
    let num = this.childMenuTitList.length;
    if (num - 2 < 0) this.queryChildSortList();
    else this.queryChildSortList(this.childMenuTitList[num - 2].code, this.childMenuTitList[num - 2].name, true);
  }

}
