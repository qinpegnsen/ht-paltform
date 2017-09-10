import { Component, OnInit } from '@angular/core';
import {SettingsService} from "../../../../core/settings/settings.service";
import {SubmitService} from "../../../../core/forms/submit.service";
import {ActivatedRoute, Router} from "@angular/router";
declare var $: any;
@Component({
  selector: 'app-help-update',
  templateUrl: './help-update.component.html',
  styleUrls: ['./help-update.component.scss']
})
export class HelpUpdateComponent implements OnInit {
  public contents: string;
  private linkType:string;
  constructor(public settings: SettingsService, private router: Router, private routeInfo: ActivatedRoute,
              private submitt: SubmitService) { }

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
  }
  //返回上一页
  back(){
    window.history.back();
  }
}
