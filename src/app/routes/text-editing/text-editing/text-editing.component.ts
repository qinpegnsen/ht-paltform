import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-text-editing',
  templateUrl: './text-editing.component.html',
  styleUrls: ['./text-editing.component.scss']
})
export class TextEditingComponent implements OnInit {

  public contents: string;

  constructor() { }

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

}
