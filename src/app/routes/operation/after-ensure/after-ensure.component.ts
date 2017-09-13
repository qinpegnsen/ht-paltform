import { Component, OnInit } from '@angular/core';
import {SubmitService} from "../../../core/forms/submit.service";
import {Router} from "@angular/router";
declare var $: any;
@Component({
  selector: 'app-after-ensure',
  templateUrl: './after-ensure.component.html',
  styleUrls: ['./after-ensure.component.scss']
})
export class AfterEnsureComponent implements OnInit {
  public contents: string;
  public submitObj;//用来保存提交的时候的数据，在addArticleExtra里面使用
  public submitState;//用来保存提交的时候的状态，在addArticleExtra里面使用
  constructor(public service:SubmitService, public router: Router) { }

  ngOnInit() {
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
  }

  // 把新增文章单独写出来，初始化(没有图片上传)和当图片上传成功的时候都可以调用
  submit(){
    var sHTML = $('#summernote').summernote('code')//获取编辑器的值

  }
}
