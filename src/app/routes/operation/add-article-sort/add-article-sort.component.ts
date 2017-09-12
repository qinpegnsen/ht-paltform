import { Component, OnInit } from '@angular/core';
import {SettingsService} from "../../../core/settings/settings.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ArticleSortComponent} from "../article/article-sort/article-sort.component";
import {SubmitService} from "../../../core/forms/submit.service";
import {OperationService} from "../operation.service";

@Component({
  selector: 'app-add-article-sort',
  templateUrl: './add-article-sort.component.html',
  styleUrls: ['./add-article-sort.component.scss']
})
export class AddArticleSortComponent implements OnInit {
  public acName:string;
  public updataData;
  public acSort:number;
  public summary:string;
  public linkType:string;
  public acParentId:number;
  public id:number;
  public flag:boolean=false;
  public stateList:Array<string>;
  constructor(public settings: SettingsService,private routeInfo: ActivatedRoute,public ArticleSortComponent: ArticleSortComponent,private router: Router,public service:SubmitService,public operationService:OperationService) {
    this.settings.showRightPage("30%"); // 此方法必须调用！页面右侧显示，带滑动效果,可以自定义宽度：..%  或者 ..px
  }

  ngOnInit() {
    this.linkType = this.routeInfo.snapshot.queryParams['linkType'];
    this.acParentId = this.routeInfo.snapshot.queryParams['acParentId'];

    this.id = this.routeInfo.snapshot.queryParams['id'];//如果id存在的话，就说明是修改，这时候才执行以下的代码
    /**
     * 当给子分类添加分类的时候，也需要获取当前id的信息，因为在调用根据父id查分类的时候用的到
     */
    if(this.id||this.acParentId){
      this.selectDataById()
    }

    /**
     * 状态列表
     */
    this.stateList=['HIDE','SHOW','DEL ']
  }

  /**
   * 根据id查询数据
   */
  public selectDataById(){
    let url='/articleClass/loadArticleClassById';
    if(this.id){
      var data={
        id:this.id
      }
    }else if(this.acParentId){
      var data={
        id:this.acParentId
      }
    }
    let updataData=this.service.getData(url,data);
    this.updataData=updataData;
  }
  // 取消
  cancel(){
    this.settings.closeRightPageAndRouteBack(); //关闭右侧滑动页面
  }
  // 提交
  submit(obj){
    if(this.linkType=='addClass'){
      let url='/articleClass/addArticleClass';
      let data={
        acName:this.acName,
        acParentId:0,
        acSort:this.acSort,
        state:obj.state,
        summary:obj.summary
      }
      let result=this.operationService.postRequest(url,data);
      if(result){
        this.ArticleSortComponent.queryArticSortleList()
      }else{
        return;
      }

    }else if(this.linkType=='addChildSort'){
      let url='/articleClass/addArticleClass';
      let data={
        acName:this.acName,
        acParentId:this.id,//每个类别的id作为他的子类的父id
        acSort:this.acSort,
        state:obj.state,
        summary:obj.summary
      }
      this.service.postRequest(url,data);
      this.ArticleSortComponent.queryChildSortList('',this.id,this.updataData.acName,this.flag)
    }else if(this.linkType=='updateSort'){
      this.flag=true;//flag用来判断面包屑是加还是减，当新增分类的时候为假，这时候面包屑加，当修改的时候设置为true，这时候减
      let url='/articleClass/updateArticleClass';
      let data={
        id:this.id,
        acName:obj.acName,
        acSort:obj.acSort,
        summary:obj.summary,
        acParentId:this.acParentId
      }
      // this.AddArticleSortService.updateClass(url,data);
      this.service.putRequest(url,data);
      this.ArticleSortComponent.getChild(this.acParentId)

    }
    this.router.navigate(['/main/operation/article/sort']);

  }
}
