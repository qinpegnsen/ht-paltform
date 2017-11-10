import { Component, OnInit } from '@angular/core';
import {Page} from "../../../core/page/page";
import {PageEvent} from "../../../shared/directives/ng2-datatable/DataTable";
import {AjaxService} from "../../../core/services/ajax.service";
import {ActivatedRoute,Router} from '@angular/router';
import {isNullOrUndefined} from "util";
import {AreasService} from "./areas.service";
import {AppComponent} from "../../../app.component";
const swal = require('sweetalert');

@Component({
  selector: 'app-areas',
  templateUrl: './areas.component.html',
  styleUrls: ['./areas.component.scss'],
  providers:[AreasService]
})
export class AreasComponent implements OnInit {
  public queryId:number;//获取添加，修改的ID
  public addButton;//新增数据按钮配置
  public updatebutton;//修改按钮配置
  public deletebutton;//删除按钮配置
  public option;//添加子集地区
  public areas:Page= new Page();
  public controlData:Page = new Page();
  public childMenuCode; //菜单编码，查询子集用
  public childMenuTitList:Array<any> = []; //菜单级别面包屑
  public area_code;
  public areaCode;

  public table = {
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

  constructor(public ajax:AjaxService,public routeInfo:ActivatedRoute,public AreasService:AreasService) {

  }

  ngOnInit() {
    this.queryId = this.routeInfo.snapshot.queryParams['id'];
    //按钮配置
    this.addButton = {
      type:"add-thc",
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
    this.queryList()//获取地区的列表
  }


  /**
   * 查询地区的列表信息
   * @param event
   */
  public queryList() {

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
   * 返回上一级地区列表
   */
  goBackMenu() {
    let num = this.childMenuTitList.length;
    if (num - 2 < 0) this.queryChildSortList();
    else this.queryChildSortList(this.childMenuTitList[num - 2].code, this.childMenuTitList[num - 2].name, true);
  }


  /*
   *删除区域信息
   */
  delete(delCodeId) {
    let _this = this, url: string = "/res/area/deleteAreaByCode", data: any,length:number = _this.childMenuTitList.length;
    swal({
        title: '确认删除此信息？',
        type: 'info',
        confirmButtonText: '确认', //‘确认’按钮命名
        showCancelButton: true, //显示‘取消’按钮
        cancelButtonText: '取消', //‘取消’按钮命名
        closeOnConfirm: false  //点击‘确认’后，执行另外一个提示框
      },
      function () {  //点击‘确认’时执行
        swal.close(); //关闭弹框
          data = {
            areaCode:delCodeId
          }
        console.log(data)
        _this.AreasService.delCode(url, data); //删除数据
        let datas={areaCode:delCodeId}
        let urls= "/res/area/queryAreasByCode";
        _this.AreasService.controlDatas(urls,datas);//实现局部刷新
      }
    );
  }


}
