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
import {AppComponent} from "../../../../app.component";
declare var $: any;
@Component({
  selector: 'app-help-assortment',
  templateUrl: './help-assortment.component.html',
  styleUrls: ['./help-assortment.component.scss'],
})
export class HelpAssortmentComponent implements OnInit {
  public contents: string;
  public linkType:string;//获取操作类型
  public kinds:any;//获取所有分类
  public kindId: string;//获取第一个分类
  public curPage:any;//获取分页
  constructor(public ajax: AjaxService,public settings: SettingsService, public router: Router, public routeInfo: ActivatedRoute,public submitt: SubmitService, public tools: RzhtoolsService,public operationService: OperationService,public patterns:PatternService) { }

  ngOnInit() {
    let me=this;
    me.linkType = me.routeInfo.snapshot.queryParams['linkType'];//获取操作类型
    me.curPage = me.routeInfo.snapshot.queryParams['curPage'];//获取分页
    // 调用富文本编辑器，初始化编辑器
    setTimeout(() => {
      $('#summernote').summernote({
        popover: {
          air: []
        },
        placeholder: '请在这里填写问题答案...',
        height: 280,
        dialogsInBody: true,
        lang: 'zh-CN',
        fontNames: [ '微软雅黑', '黑体','宋体 ','华文楷体','仿宋','方正舒体','方正姚体','楷体','隶书','Helvetica', 'Arial'],
        toolbar: [
          ['edit',['undo','redo']],//编辑
          ['headline', ['style']],//大字标题
          ['style', ['bold', 'italic', 'underline', 'superscript', 'subscript', 'strikethrough', 'clear']],//样式
          ['fontface', ['fontname','color','fontsize']],//字体
          ['alignment', ['ul', 'ol', 'paragraph', 'lineheight']],//对齐方式
          ['height', ['height']],//高
          ['table', ['table']],//表单
          ['insert', ['link','picture','hr']],//插入链接，图片，下划线
          ['view', ['fullscreen', 'codeview', 'help']]//全屏，代码视图,帮助
        ],
        callbacks: {
          onChange: (contents, $editable) => {
            me.contents = contents;
          },
          onImageUpload: function (files) {
            for (let file of files) me.sendFile(file);
          }
        }
      });
      me.kindId = me.kinds[0].id;//默认选中第一个帮助分类
    }, 0);
    me.qeuryAllService();
  }

  /**
   * 编辑器上传图片并显示
   * @param file
   */
  sendFile(file) {
    let _this = this, img = _this.operationService.uploadImgHelp(file);
    if(!isNullOrUndefined(img)){
      $("#summernote").summernote('insertImage', img, function ($image) {
        $image.css({width: ''});//设置图片的大小
      });
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
      let answer=me.operationService.addproblem(url,data);
      if(answer=='帮助问题名称已存在' || answer=='排序不能为空' ||answer=='帮助问题答案不能为空' || answer=='问题不能为空' ||answer=='答案不能为空'){
        return;
      }else{
        AppComponent.rzhAlt("success", "添加问题成功");
        me.qeuryAllService();
        me.router.navigate(['/main/operation/help-center/help-answer']);
      }
    }
}
