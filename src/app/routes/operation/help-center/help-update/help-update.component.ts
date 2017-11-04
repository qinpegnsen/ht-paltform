import { Component, OnInit } from '@angular/core';
import {SettingsService} from "../../../../core/settings/settings.service";
import {SubmitService} from "../../../../core/forms/submit.service";
import {ActivatedRoute, Router} from "@angular/router";
import {HelpAnswerComponent} from "../help-answer/help-answer.component";
import { Location }from '@angular/common';
import {isNullOrUndefined} from "util";
import {RzhtoolsService} from "../../../../core/services/rzhtools.service";
import {OperationService} from "../../operation.service";
import {PatternService} from "../../../../core/forms/pattern.service";
declare var $: any;

@Component({
  selector: 'app-help-update',
  templateUrl: './help-update.component.html',
  styleUrls: ['./help-update.component.scss'],
  providers:[HelpAnswerComponent]
})
export class HelpUpdateComponent implements OnInit {
  public contents: string;
  private linkType:string;
  private kinds:any;
  private b:any;
  private operation:any;
  public kindid: number;
  private curPage:any;
  constructor(public settings: SettingsService, private router: Router, private routeInfo: ActivatedRoute,
              private submitt: SubmitService, private tools: RzhtoolsService,private location: Location,private operationService:OperationService,public patterns:PatternService, private route: ActivatedRoute,
              private helpAnswerComponent:HelpAnswerComponent) { }

  ngOnInit() {
    let me = this;
    me.kindid = me.routeInfo.snapshot.queryParams['id'];
    me.curPage = this.routeInfo.snapshot.queryParams['curPage'];
    sessionStorage.setItem('curPage',me.curPage)
    me.linkType = me.routeInfo.snapshot.queryParams['linkType'];//获取地址栏的参数
    // 调用富文本编辑器，初始化编辑器
    setTimeout(() => {
      $('#summernote').summernote({ //初始化编辑器
        popover: {
          air: []
        },
        height: 500,
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
          ['view', ['fullscreen', 'codeview']]//全屏，代码视图
        ],
        callbacks: {
          onChange: (contents, $editable) => {
            this.contents = contents;
            $(".note-editable *").css({'width':'100%',',margin':'0px'});//解决复制过来的p和图片太宽出现横向滚动条
            $(".note-editable img").removeAttr('width');//解决复制过来的p和图片太宽出现横向滚动条

          },
          onImageUpload: function (files) {
            for (let file of files) me.sendFile(file);
          }
        }
      });
      $('#summernote').summernote('code', me.b.answer); //编辑器赋值
    }, 0);
    me.b=me.submitt.getData("/helpQuestions/loadHelpQuestions", {id:me.kindid});//帮助问题修改时，先获取数据
    me.qeuryAll();
  }

  /**
   * 编辑器上传图片并显示
   * @param file
   */
  sendFile(file) {
    let _this = this, img = _this.tools.uploadImg(file);
    if(!isNullOrUndefined(img)){
      $("#summernote").summernote('insertImage', img,function($image){
        $image.css({//设置图片的大小
          width: '100%'
        });
      });
    }
  }

  /**
   * 返回上一页
   */
  back(){
    this.location.back();
  }

  /**
   * 查询分类
   */
  qeuryAll(){
    this.kinds = this.submitt.getData("/helpKind/queryAll",'');
  }

  /**
   * 修改完成后提交
   */
  submit(res,){
    let _this=this;
    var sHTML = $('#summernote').summernote('code')//获取编辑器的值
    if(sHTML=='<p><br></p>'){   //默认就有的标签，提交的时候如果文章内容为空，不跳转页面
      sHTML='';
    }
    let url = '/helpQuestions/updateHelpQuestions';//帮助问题修改
    let data = {
      id:this.b.id,
      question:res.question,
      sort: res.sort,
      answer: sHTML,
    }
    _this.operation=_this.operationService.updateproblem(url, data);
    let answer=_this.operation;
    if(answer=="帮助问题名称不能为空" || answer=="帮助问题排序不能为空" || answer=="帮助问题答案不能为空"){
      return;
    }else{
      _this.location.back();
      _this.helpAnswerComponent.qeuryAllService(_this.curPage)
    }
  }
}
