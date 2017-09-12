import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SettingsService} from "../../../../core/settings/settings.service";
import {SubmitService} from "../../../../core/forms/submit.service";
import {Page} from "../../../../core/page/page";
import {AjaxService} from "../../../../core/services/ajax.service";
import {PageEvent} from "../../../../shared/directives/ng2-datatable/DataTable";
import {constructDependencies} from "@angular/core/src/di/reflective_provider";
declare var $: any;
@Component({
  selector: 'app-help-assortment',
  templateUrl: './help-assortment.component.html',
  styleUrls: ['./help-assortment.component.scss']
})
export class HelpAssortmentComponent implements OnInit {
  public contents: string;
  private linkType:string;
  private kinds:any;
  private kindId: string;
  private aa:any;
  constructor(private ajax: AjaxService,public settings: SettingsService, private router: Router, private routeInfo: ActivatedRoute,private submitt: SubmitService) { }

  ngOnInit() {
    let me=this;
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
    me.kindId = me.kinds[0].id;
  }

    //返回上一页
    back(){
      this.router.navigate(['/main/operation/help-center/help-answer']);
      this.qeuryAllService();
    }
  //查询分类
  qeuryAllService(){
    this.kinds = this.submitt.getData("/helpKind/queryAll",'');
    console.log("█ this.kinds ►►►",  this.kinds);
  }

   //添加问题
  submit(res) {
    let me = this;
      var sHTML = $('#summernote').summernote('code')//获取编辑器的值
      let url = '/helpQuestions/addHelpQuestions';//帮助分类添加
      let data = {
        kindId: me.kindId,
        question: res.question,
        answer:sHTML,
        sort: res.sort,
      }
      this.submitt.postRequest(url, data);
      this.router.navigate(['/main/operation/help-center/help-answer']);
      this.qeuryAllService();
      console.log("█ data ►►►",  data);
    }

}
