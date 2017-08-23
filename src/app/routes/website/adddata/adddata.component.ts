import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SettingsService} from "../../../core/settings/settings.service";
import {Page} from "../../../core/page/page";
import {PageEvent} from "../../../shared/directives/ng2-datatable/DataTable";
import {AdddataService} from "./adddata.service";
import {DataDictionaryComponent} from "../data-dictionary/data-dictionary.component";

@Component({
  selector: 'app-adddata',
  templateUrl: './adddata.component.html',
  styleUrls: ['./adddata.component.scss'],
  providers: [AdddataService]
})
export class AdddataComponent implements OnInit {
  private adddata={name:'',remark:''};
  public updataData:string;
  public linkType:string;
  public acParentId:number;
  public info:string;
  public code:number;
  public typecode:number;
  private name:string;
  private remark:string;
  private data: Page = new Page();
  constructor(public settings: SettingsService,private router:Router,private adddataService:AdddataService,
              private routeInfo: ActivatedRoute,private DataDictionaryComponent:DataDictionaryComponent) {
    this.settings.showRightPage("30%"); // 此方法必须调用！页面右侧显示，带滑动效果,可以自定义宽度：..%  或者 ..px
  }

  ngOnInit() {
    this.linkType = this.routeInfo.snapshot.queryParams['linkType'];
    this.acParentId = this.routeInfo.snapshot.queryParams['acParentId'];
    this.code = this.routeInfo.snapshot.queryParams['code'];
    let url='/datadict/updateDatadictType';
    let data={
      id:this.code
    }
    // if(this.linkType=='updateSort'){
    //   let updataData=this.adddataService.queryClassById(url,data);
    //   this.updataData=updataData;
    // }
  }

  // 取消
  cancel(){
    this.settings.closeRightPageAndRouteBack(); //关闭右侧滑动页面
  }
  //提交
  submit(obj){
    if(this.linkType=='addChildSort'){
      let url='/datadict/addDatadict';
      let data={
       typecode:this.code,
        info:obj.info,
        remark:obj.remark
      }
      this.adddataService.addClass(url,data);
    }else if(this.linkType=='updateSort'){
      let url='/datadict/updateDatadictType';
      let data={
        code:this.code,
        name:obj.name,
        remark:obj.remark,
      }
      this.adddataService.updateClass(url,data);
    }else{
      var data=this.adddata
      this.adddataService.getaddData(data)
    }

    this.DataDictionaryComponent.queryDatas()
    this.settings.closeRightPageAndRouteBack();
    console.log(this.adddata)
  }
}
