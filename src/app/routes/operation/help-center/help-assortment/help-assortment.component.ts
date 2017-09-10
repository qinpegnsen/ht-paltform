import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SettingsService} from "../../../../core/settings/settings.service";
import {SubmitService} from "../../../../core/forms/submit.service";
import {Page} from "../../../../core/page/page";
import {AjaxService} from "../../../../core/services/ajax.service";
import {PageEvent} from "../../../../shared/directives/ng2-datatable/DataTable";
declare var $: any;
@Component({
  selector: 'app-help-assortment',
  templateUrl: './help-assortment.component.html',
  styleUrls: ['./help-assortment.component.scss']
})
export class HelpAssortmentComponent implements OnInit {
  public contents: string;
  private linkType:string;
  private data: Page = new Page();

  constructor(private ajax: AjaxService,public settings: SettingsService, private router: Router, private routeInfo: ActivatedRoute,private submitt: SubmitService) { }

  ngOnInit() {

    this.linkType = this.routeInfo.snapshot.queryParams['linkType'];//获取地址栏的参数
    // 调用富文本编辑器，初始化编辑器
    setTimeout(() => {
      $('#summernote').summernote({
        height: 280,
        dialogsInBody: true,
        callbacks: {
          onChange: (contents, $editable) => {
            this.contents = contents;
            // console.log(contents);
          }
        }
      });
    }, 0);

    this.qeuryAllService();
  }

    //返回上一页
    back(){
      window.history.back();
    }
  //查询分类
  qeuryAllService(event?: PageEvent){
    let me = this, activePage = 1;
    if (typeof event !== "undefined") activePage = event.activePage;
    let url = "/helpKind/pageQueryAll";
    let data={
      curPage: activePage,
      pageSize:10,
    }
    let result = this.submitt.getData(url,data);
    // me.data = new Page(result);
  }
   //添加问题
  submit(res) {
      let url = '/helpQuestions/addHelpQuestions';//帮助分类添加
      let data = {
        kindId:res.kindId,
        question: res.question,
        answer: res.answer,
        sort: res.sort,
      }
      this.submitt.postRequest(url, data);
    }
}
