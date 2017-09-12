import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SettingsService} from "../../../../core/settings/settings.service";
import {SubmitService} from "../../../../core/forms/submit.service";
import {ProblemDetailsComponent} from "../problem-details/problem-details.component";
declare var $: any;
@Component({
  selector: 'app-view-problem',
  templateUrl: './view-problem.component.html',
  styleUrls: ['./view-problem.component.scss']
})
export class ViewProblemComponent implements OnInit {
  public contents: string;
  private linkType:string;
  private kinds:any;
  private id:number;
  private a:any;
  constructor( public settings: SettingsService, private router: Router, private routeInfo: ActivatedRoute,
               private submitt: SubmitService,private problemDetailsComponent:ProblemDetailsComponent) { }

  ngOnInit() {

    this.id = this.routeInfo.snapshot.queryParams['id'];
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
    //分类帮助--若为查看操作,获取信息
      this.a=this.submitt.getData("/helpQuestions/loadHelpQuestions", {id: this.id}); //获取数据字典key
    $('#summernote').summernote('code', this.a.answer);
      console.log(this.a.answer)

  }
  //返回上一页
  back(){
    this.router.navigate(['/main/operation/help-center/help-interlocution/problem-details']);
    this.problemDetailsComponent.allproblem();
  }
  //查询分类
  qeuryAllService(){
    this.kinds = this.submitt.getData("/helpKind/queryAll",'');
  }


}
