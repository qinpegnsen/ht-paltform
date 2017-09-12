import { Component, OnInit } from '@angular/core';
import {SettingsService} from "../../../../core/settings/settings.service";
import {SubmitService} from "../../../../core/forms/submit.service";
import {ActivatedRoute, Router} from "@angular/router";
import {HelpAnswerComponent} from "../help-answer/help-answer.component";
import { Location }from '@angular/common';
declare var $: any;

@Component({
  selector: 'app-help-update',
  templateUrl: './help-update.component.html',
  styleUrls: ['./help-update.component.scss']
})
export class HelpUpdateComponent implements OnInit {
  public contents: string;
  private linkType:string;
  private kinds:any;
  private b:any;
  private abc:any;
  public kindid: number;
  constructor(public settings: SettingsService, private router: Router, private routeInfo: ActivatedRoute,
              private submitt: SubmitService,private helpAnswerComponent:HelpAnswerComponent,private location: Location) { }

  ngOnInit() {
    this.kindid = this.routeInfo.snapshot.queryParams['id'];
    this.linkType = this.routeInfo.snapshot.queryParams['linkType'];//获取地址栏的参数
    // 调用富文本编辑器，初始化编辑器
    setTimeout(() => {
      $('#summernote').summernote({
        height: 500,
        dialogsInBody: true,
        callbacks: {
          onChange: (contents, $editable) => {
            this.contents = contents;
            // console.log(contents);
          }
        }
      });
    }, 0);
    this.qeuryAll();
    //修改时，先获取数据

    this.b=this.submitt.getData("/helpQuestions/loadHelpQuestions", {id:this.kindid}); //获取数据字典key
    $('#summernote').summernote('code', this.b.answer);
    // console.log(this.b)

  }
  //返回上一页
  back(){
    this.location.back();
    // this.helpAnswerComponent.qeuryAllService();
  }
  //查询分类
  qeuryAll(){
    this.kinds = this.submitt.getData("/helpKind/queryAll",'');
  }

  submit(res){
    var sHTML = $('#summernote').summernote('code')//获取编辑器的值
    let url = '/helpQuestions/updateHelpQuestions';//帮助问题修改
    let data = {
      id:this.b.id,
      question:res.question,
      sort: res.sort,
      answer: sHTML,
    }
    this.abc=this.submitt.putRequest(url, data);
    this.router.navigate(['/main/operation/help-center/help-answer']);
    console.log( this.abc)
  }
}
