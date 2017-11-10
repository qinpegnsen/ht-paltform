import { Component, OnInit } from '@angular/core';
import {PublishComponent} from "../publish/publish.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-published',
  templateUrl: './published.component.html',
  styleUrls: ['./published.component.scss']
})
export class PublishedComponent implements OnInit {

  constructor(public publishComponent: PublishComponent,public router: Router) { }

  ngOnInit() {
    let me = this;
    me.publishComponent.step = 3
  }

  public lookDetail(){
    this.router.navigate(['/main/goods/manage/detail'],{ preserveQueryParams: true })
  }

  public editGoods(){
    this.router.navigate(['/main/goods/manage/edit'],{ preserveQueryParams: true })
  }

  public publishNew(){
    this.router.navigate(['/main/goods/publish/step_one'])
  }

  public goodsList(){
    this.router.navigate(['/main/goods/manage'])
  }

}
