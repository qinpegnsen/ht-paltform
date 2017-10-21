import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SettingsService} from "../../../../core/settings/settings.service";
import {SubmitService} from "../../../../core/forms/submit.service";
import {Page} from "../../../../core/page/page";
import {AjaxService} from "../../../../core/services/ajax.service";
import {PageEvent} from "../../../../shared/directives/ng2-datatable/DataTable";
import {constructDependencies} from "@angular/core/src/di/reflective_provider";
import {isNullOrUndefined} from "util";
import {RzhtoolsService} from "../../../../core/services/rzhtools.service";
import {OperationService} from "../../operation.service";
import {PatternService} from "../../../../core/forms/pattern.service";
declare var $: any;
@Component({
  selector: 'app-help-assortment',
  templateUrl: './help-assortment.component.html',
  styleUrls: ['./help-assortment.component.scss'],
})
export class HelpAssortmentComponent implements OnInit {
  public contents: string;
  private linkType:string;
  private kinds:any;
  private kindId: string;
  constructor(private ajax: AjaxService,public settings: SettingsService, private router: Router, private routeInfo: ActivatedRoute,private submitt: SubmitService, private tools: RzhtoolsService,private operationService: OperationService,public patterns:PatternService) { }

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
          },
          onImageUpload: function (files) {
            for (let file of files) me.sendFile(file);
          }
        }
      });
      me.kindId = me.kinds[0].id;//默认选中第一个帮助分类
    }, 0);
    this.qeuryAllService();
  }

  /**
   * 编辑器上传图片并显示
   * @param file
   */
  sendFile(file) {
    let _this = this, img = _this.tools.uploadImg(file);
    if(!isNullOrUndefined(img)){
      $("#summernote").summernote('insertImage', img, '');
    }
  }

  /**
   * 返回上一页
   */
    back(){
      this.router.navigate(['/main/operation/help-center/help-answer']);
      this.qeuryAllService();
    }

  /**
   * 查询分类
   */
  qeuryAllService(){
    this.kinds = this.submitt.getData("/helpKind/queryAll",'');
  }

  /**
   * 添加问题
   */
  submit(res) {
      let me = this;
      var sHTML = $('#summernote').summernote('code')//获取编辑器的值
      if(sHTML=='<p><br></p>'){   //默认就有的标签，提交的时候如果文章内容为空，不跳转页面
        sHTML='';
      }
      let url = '/helpQuestions/addHelpQuestions';//帮助分类添加
      let data = {
        kindId: me.kindId,
        question: res.question,
        answer:sHTML,
        sort: res.sort,
      }
      let answer=this.operationService.addproblem(url,data);
      if(answer=='帮助问题名称已存在' || answer=='排序不能为空' ||answer=='帮助问题答案不能为空' || answer=='问题不能为空' ||answer=='答案不能为空'){
        return;
      }else{
        this.qeuryAllService();
        this.router.navigate(['/main/operation/help-center/help-answer']);
      }
    }
}
