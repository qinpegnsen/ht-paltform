import { Component, OnInit } from '@angular/core';
import {PublishComponent} from "../publish/publish.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-published',
  templateUrl: './published.component.html',
  styleUrls: ['./published.component.scss']
})
export class PublishedComponent implements OnInit {

  constructor(private publishComponent: PublishComponent,private router: Router) { }

  ngOnInit() {
    let me = this;
    me.publishComponent.step = 3
  }

  private lookDetail(){
    this.router.navigate(['/main/goods/manage/detail'],{ preserveQueryParams: true })
  }

  private editGoods(){
    this.router.navigate(['/main/goods/manage/edit'],{ preserveQueryParams: true })
  }

  private publishNew(){
    this.router.navigate(['/main/goods/publish/step_one'])
  }

  private goodsList(){
    this.router.navigate(['/main/goods/manage'])
  }

}
