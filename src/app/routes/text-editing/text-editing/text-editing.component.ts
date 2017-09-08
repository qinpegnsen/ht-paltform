import { Component, OnInit } from '@angular/core';
import {SubmitService} from "../../../core/forms/submit.service";
import {Router} from "@angular/router";
declare var $: any;
@Component({
  selector: 'app-text-editing',
  templateUrl: './text-editing.component.html',
  styleUrls: ['./text-editing.component.scss']
})
export class TextEditingComponent implements OnInit {

  public contents: string;
  public submitObj;//用来保存提交的时候的数据，在addArticleExtra里面使用
  public submitState;//用来保存提交的时候的状态，在addArticleExtra里面使用
  private uuid: any;
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
  /**
   * 把新增文章单独写出来，初始化(没有图片上传)和当图片上传成功的时候都可以调用
   */
  submit(){
    var sHTML = $('#summernote').summernote('code')//获取编辑器的值
    let url = '';//新增文章接口
    this.submitObj.articleContent = sHTML;  //把编辑器的值保存下来
    this.submitObj.addArticleEnum = this.submitState //默认文章的类型是草稿
    let data = this.submitObj;
    this.service.postRequest(url,data);
    this.router.navigate(['']);//提交后路由跳转
  }
}
