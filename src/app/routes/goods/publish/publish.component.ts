import {Component, OnInit} from "@angular/core";
import {GoodsService} from "../goods.service";
declare var $: any;

@Component({
  selector: 'app-publish',
  templateUrl: './publish.component.html',
  styleUrls: ['./publish.component.scss']
})
export class PublishComponent implements OnInit {
  step: number = 1;// 当前步骤

  constructor(private goods:GoodsService) {
  }

  ngOnInit() {
  }


}
