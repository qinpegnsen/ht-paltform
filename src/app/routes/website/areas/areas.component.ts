import { Component, OnInit } from '@angular/core';
import {Page} from "../../../core/page/page";
import {PageEvent} from "../../../shared/directives/ng2-datatable/DataTable";
import {AjaxService} from "../../../core/services/ajax.service";
import {ActivatedRoute,Router} from '@angular/router';
import {isNullOrUndefined} from "util";
import {AreasService} from "./areas.service";
import {AppComponent} from "../../../app.component";

@Component({
  selector: 'app-areas',
  templateUrl: './areas.component.html',
  styleUrls: ['./areas.component.scss'],
  providers:[AreasService]
})
export class AreasComponent implements OnInit {
  private queryId:number;//获取添加，修改的ID
  private addButton;//新增数据按钮配置
  private updatebutton;//修改按钮配置
  private deletebutton;//删除按钮配置
  private option;//添加子集地区
  private areas:Page= new Page();
  private controlData:Page = new Page();
  private childMenuCode; //菜单编码，查询子集用
  private childMenuTitList:Array<any> = []; //菜单级别面包屑
  private area_code;

  private table = {
    curPage:1,
    lastPage:true,
    needCountQuery:false,
    optObject:null,
    optObjectList:null,
    pageSize:20,
    params:{},
    sortColumns:null,
    totalPage:1,
    totalRow:5,
    voList:[]
  }

  constructor(private ajax:AjaxService,private routeInfo:ActivatedRoute,private AreasService:AreasService) {

  }

  ngOnInit() {
    this.queryId = this.routeInfo.snapshot.queryParams['id'];
    //按钮配置
    this.addButton = {
      type:"add",
      text:"新增数据",
      title:'新增数据',
      size: 'xs'
    };
    this.updatebutton = {
      type:"update",
      title:'编辑',
      size: 'xs'
    };
    this.deletebutton={
      title:"删除",
      type: "delete",
      size: 'xs'
    };
    this.option={
      title:"添加",
      type: "add",
      size: 'xs'
    };


    /**
     * 获取地区的列表
     * @param event
     */
    let data={area_code:'',level:1}
    let url= "/res/area/queryAreasByCode";
    let result = this.AreasService.controlDatas(url,data);
    //this.AreasService.controlDatas()//页面元素信息加载
    //let result=this.AreasService.controlDatas();
    console.log("█ result ►►►",result  );
    if(isNullOrUndefined(result)){

    }else{
      this.table.voList = result.data;
    }

    this.areas = new Page(this.table);
  }


  /**
   * 根据分类的父id查询子分类
   * @param parentId
   */
  queryChildSortList(childCode?, menuName?, isTit?:boolean) {
    this.area_code=childCode;
    console.log(this.area_code)
    let me = this, num = 0;
    if (isNullOrUndefined(childCode)) {
      this.childMenuCode = null, this.childMenuTitList = []; //清空子集查询
    } else {
      me.childMenuCode = childCode;
      let item = {name: menuName, code: childCode};
      if (!isTit){
        me.childMenuTitList.push(item); //非点击面包屑路径时，添加面包屑
      }
      else { //点击面包屑路径时，提出点击地址后的面包屑路径
        for (var i = 0; i < me.childMenuTitList.length; i++) {  //获取点击面包屑的路径地址下标
          if (item.code == me.childMenuTitList[i].code) num = i;
        }
        me.childMenuTitList.splice(num + 1); //剔除下标后的路径
      }
    }
    console.log(this.childMenuTitList.length)
    let data={
      level:this.childMenuTitList.length+1,
      area_code:this.area_code
    }
    console.log(this.area_code)
    let url= "/res/area/queryAreasByCode";
    let result = this.AreasService.controlDatas(url,data);
    //this.AreasService.controlDatas()//页面元素信息加载
    //let result=this.AreasService.controlDatas();
    console.log("█ result ►►►",result  );
    this.table.voList = result.data;

    this.areas = new Page(this.table);

  }

  /**
   * 返回上一级菜单列表
   */
  goBackMenu() {
    let num = this.childMenuTitList.length;
    if (num - 2 < 0) this.queryChildSortList();
    else this.queryChildSortList(this.childMenuTitList[num - 2].code, this.childMenuTitList[num - 2].name, true);
  }














 /* public controlDatas() {
    console.log(1)
    let me = this

    this.ajax.get({
      url: "/res/area/queryAreasByCode",
      data: {
        area_code:'',
        level:1
      },
      success: (data) => {
        console.log(data)

        me.table.voList = data.data;
        console.log("█ list ►►►", data.data);

        me.areas = new Page(me.table);
        console.log("█ me.areas ►►►", me.areas);

      },
      error: (data) => {
        console.log("获取地区错误");
      }
    });
  }*/


}
