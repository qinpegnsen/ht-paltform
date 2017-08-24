import {Component, OnInit} from "@angular/core";
import {SubmitService} from "../../../core/forms/submit.service";
declare var $: any;

@Component({
  selector: 'app-publish',
  templateUrl: './publish.component.html',
  styleUrls: ['./publish.component.scss']
})
export class PublishComponent implements OnInit {
  private firstList;// 一级分类列表
  private secondList;// 二级分类列表
  private thirdList;// 三级分类列表
  private choosedKind: string;// 选择的分类ID
  private choosedKindStr: string = '';// 已经选择的分类

  constructor(private submit: SubmitService) {
  }

  ngOnInit() {
    let me = this;
    me.firstList = me.submit.getData('/goodskind/queryGoodsByParentId', '');
    $(document).on('click','.step-one li',function(){
      $(this).addClass('current').siblings().removeClass('current');
      me.choosedKindStr = '';
      for (let i=0; i<$('.step-one .current').length; i ++){
        me.choosedKindStr += $('.step-one .current')[i].innerText+' >> ';
      }
      me.choosedKindStr = me.choosedKindStr.substring(0,me.choosedKindStr.length - 4)
    })
  }

  getNextLevel(id, level) {
    let me = this;
    switch (level) {
      case 1:
        me.secondList = me.submit.getData('/goodskind/queryGoodsByParentId', {kindParentId: id});
        me.thirdList = [];
        me.choosedKind = '';
        break;
      case 2 :
        me.thirdList = me.submit.getData('/goodskind/queryGoodsByParentId', {kindParentId: id});
        me.choosedKind = '';
        break;
      case 3:
        me.choosedKind = id;
        console.log("█ id ►►►", id);
        break;
    }
  }


}
