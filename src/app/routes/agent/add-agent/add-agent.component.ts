import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-add-agent',
  templateUrl: './add-agent.component.html',
  styleUrls: ['./add-agent.component.scss']
})
export class AddAgentComponent implements OnInit {
  public linkType: string;

  constructor( private routeInfo: ActivatedRoute) {


  }

  ngOnInit() {
    this.linkType = this.routeInfo.snapshot.queryParams['linkType'];//获取地址栏的参数
  }

}
