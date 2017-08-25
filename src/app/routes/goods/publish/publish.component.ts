import {Component, OnInit} from "@angular/core";
import {SubmitService} from "../../../core/forms/submit.service";
import {ActivatedRoute, Router} from "@angular/router";
declare var $: any;

@Component({
  selector: 'app-publish',
  templateUrl: './publish.component.html',
  styleUrls: ['./publish.component.scss']
})
export class PublishComponent implements OnInit {
  public step: number = 1;// 当前步骤

  constructor(private router: Router,private route: ActivatedRoute,private submit: SubmitService) {
  }

  ngOnInit() {
    let me = this;
    console.log("█ this.step ►►►",  this.step);
  }

  changeStep(){
    this.step = 2
    console.log("█ this.step ►►►",  this.step);
  }


}
