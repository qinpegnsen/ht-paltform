import { Component, OnInit } from '@angular/core';
import {SettingsService} from "../../../core/settings/settings.service";
import {AddArticleSortService} from "./add-article-sort.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ArticleSortComponent} from "../article/article-sort/article-sort.component";

@Component({
  selector: 'app-add-article-sort',
  templateUrl: './add-article-sort.component.html',
  styleUrls: ['./add-article-sort.component.scss']
})
export class AddArticleSortComponent implements OnInit {
  public acName:string;
  public updataData:string;
  public acSort:number;
  public summary:string;
  public linkType:string;
  public acParentId:number;
  public id:number;
  public stateList:Array<string>;
  constructor(public settings: SettingsService,public AddArticleSortService: AddArticleSortService,private routeInfo: ActivatedRoute,public ArticleSortComponent: ArticleSortComponent,private router: Router) {
    this.settings.showRightPage("30%"); // 此方法必须调用！页面右侧显示，带滑动效果,可以自定义宽度：..%  或者 ..px
  }

  ngOnInit() {
    this.linkType = this.routeInfo.snapshot.queryParams['linkType'];
    this.acParentId = this.routeInfo.snapshot.queryParams['acParentId'];

    this.id = this.routeInfo.snapshot.queryParams['id'];//如果id存在的话，就说明是修改，这时候才执行以下的代码
    if(this.id){
      let url='/articleClass/loadArticleClassById';
      let data={
        id:this.id
      }
      let updataData=this.AddArticleSortService.queryClassById(url,data);
      this.updataData=updataData;
    }

    /**
     * 状态列表
     */
    this.stateList=['HIDE','SHOW','DEL ']
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
      this.AddArticleSortService.addClass(url,data);

    }else if(this.linkType=='addChildSort'){
      let url='/articleClass/addArticleClass';
      let data={
        acName:this.acName,
        acParentId:this.acParentId,
        acSort:this.acSort,
        state:obj.state,
        summary:obj.summary
      }
      this.AddArticleSortService.addClass(url,data);
    }else if(this.linkType=='updateSort'){
      let url='/articleClass/updateArticleClass';
      let data={
        id:this.id,
        acName:obj.acName,
        acSort:obj.acSort,
        summary:obj.summary
      }
      this.AddArticleSortService.updateClass(url,data);
    }
    this.router.navigate(['/main/operation/article/sort']);
    this.ArticleSortComponent.queryArticSortleList()

  }
}
