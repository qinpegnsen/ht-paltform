import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
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

  private data: Page = new Page();
  constructor(public settings: SettingsService,private router:Router,private adddataService:AdddataService,private DataDictionaryComponent:DataDictionaryComponent) {
    this.settings.showRightPage("30%"); // 此方法必须调用！页面右侧显示，带滑动效果,可以自定义宽度：..%  或者 ..px
  }

  ngOnInit() {
  }

  // public queryDatas(event?:PageEvent) {
  //   let me = this,activePage = 1;
  //   if(typeof event !== "undefined") activePage =event.activePage;
  //   let requestData = {
  //     curPage: activePage,
  //
  //   }
  //   let res = this.adddataService.getaddData(requestData)
  //   me.data = new Page(res);
  //
  // }

  // 取消
  cancel(){
    this.settings.closeRightPageAndRouteBack(); //关闭右侧滑动页面
  }
  //提交
  submit(){
    var data=this.adddata
    this.adddataService.getaddData(data)
    this.DataDictionaryComponent.queryDatas()
    this.settings.closeRightPageAndRouteBack();
    console.log(this.adddata)
  }
}
