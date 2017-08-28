import {Component, OnInit} from "@angular/core";
import {PublishComponent} from "../publish/publish.component";
import {isNullOrUndefined} from "util";
import {ActivatedRoute, Router} from "@angular/router";
declare var $: any;

@Component({
  selector: 'app-edit-detail',
  templateUrl: './edit-detail.component.html',
  styleUrls: ['./edit-detail.component.scss'],
  providers: [PublishComponent]
})
export class EditDetailComponent implements OnInit {
  private goodsKind: string;

  constructor(private publishComponent:PublishComponent,private route: ActivatedRoute,private router: Router) { }

  ngOnInit() {
    let me = this;
    let kindId = me.route.snapshot.queryParams['kindId'];
    if(isNullOrUndefined(kindId)) {
      me.router.navigate(['/main/goods/publish/step_one'], {replaceUrl: true});
    }else{
      me.goodsKind = me.route.snapshot.queryParams['choosedKind'].replace('>>','>').replace('>>','>');
    }
    this.publishComponent.changeStep();
    $(function(){
      $('.tip').hover(function(){
        $(this).css('color', '#000');
      },function(){
        $(this).css('color', '#bbb');
      })
      /**
       * 调用富文本编辑器，初始化编辑器
       */
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
    })
  }

}
