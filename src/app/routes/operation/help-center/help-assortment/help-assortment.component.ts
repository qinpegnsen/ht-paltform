import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
declare var $: any;
@Component({
  selector: 'app-help-assortment',
  templateUrl: './help-assortment.component.html',
  styleUrls: ['./help-assortment.component.scss']
})
export class HelpAssortmentComponent implements OnInit {
  public contents: string;
  private linkType:string;
  constructor(private routeInfo: ActivatedRoute,) { }

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
    back(){
      window.history.back();
    }
}
