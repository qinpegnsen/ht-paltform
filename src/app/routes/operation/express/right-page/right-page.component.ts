import { Component, OnInit } from '@angular/core';
import {SettingsService} from "../../../../core/settings/settings.service";
import {ActivatedRoute} from "@angular/router";
import {SubmitService} from "../../../../core/forms/submit.service";
import {ExpressComponent} from "../express.component";
import {PatternService} from "../../../../core/forms/pattern.service";
import {OperationService} from "../../operation.service";

@Component({
  selector: 'app-right-page',
  templateUrl: './right-page.component.html',
  styleUrls: ['./right-page.component.scss']
})

export class RightPageComponent implements OnInit {

  public type:string;           //储存地址栏传递过来的类型，从而显示不同的页面
  public id:number;             //储存地址栏传递过来的id，从而获取当前id的内容，并修改
  public isUseList:any;         //是否启用的数组
  public editData:any;          //根据id查询出来的数据
  public bingID:string="Y";     //是否启用的数组

  constructor(
    public settings: SettingsService,
    private routeInfo: ActivatedRoute,
    public service:SubmitService,
    public parent:ExpressComponent,
    public patterns: PatternService,
    private operationService: OperationService
  ) {
    this.settings.showRightPage("30%");
  }

  /**
   * 1.获取参数的类型
   * 2.对按钮进行赋值
   */
  ngOnInit() {
    this.type = this.routeInfo.snapshot.queryParams['type'];

    /**
     * 获取地址栏的参数，并且根据id查询当前id的信息，从而做修改
     * @type {any}
     * 如果id存在的话，就说明是修改，这时候才执行以下的代码
     */
    this.id = this.routeInfo.snapshot.queryParams['id'];
    if(this.id){
      let url='/basicExpress/loadBasicExpressById';
      let data={
        id:this.id
      }
      this.editData=this.service.getData(url,data);
    }

    /**
     * 是否启用的数组
     * @type {[{id: string; name: string},{id: string; name: string}]}
     */
    this.isUseList=[
      {id:'Y',name:'启用'},
      {id:'N',name:'停用'}
    ]
  }

  /**
   * 取消
   */
  cancel(){
    this.settings.closeRightPageAndRouteBack(); //关闭右侧滑动页面
  }

  /**
   * 提交
   * @param obj
   */
  submit(obj){
    if(this.type=='add'){
      let url='/basicExpress/addBasicExpress';
      let data={
        expressCode:obj.expressCode,
        expressName:obj.expressName,
        expressUrl:obj.expressUrl,
        isUse:obj.isUse
      }
      let result=this.operationService.addNewArticle(url,data);
      if(result=='物流公司编码已存在'||result=='物流公司名称已存在'){
        return;
      }
    }else if(this.type=="edit"){
      let url='/basicExpress/updateBasicExpress';
      let data={
        id:this.id,
        expressCode:obj.expressCode,
        expressName:obj.expressName,
        expressUrl:obj.expressUrl,
        isUse:obj.isUse
      }
      let result=this.operationService.updataeEpress(url,data);
      if(result=='物流公司编码已存在'||result=='物流公司名称已存在'){
        return;
      }
    }
    this.settings.closeRightPageAndRouteBack(); //关闭右侧滑动页面
    this.parent.queryExpressList()
  }
}
