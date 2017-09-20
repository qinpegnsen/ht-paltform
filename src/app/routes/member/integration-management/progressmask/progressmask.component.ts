import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progressmask',
  templateUrl: './progressmask.component.html',
  styleUrls: ['./progressmask.component.scss']
})
export class ProgressmaskComponent implements OnInit {
  public max: number = 200;
  public showWarning: boolean;
  public dynamic: number;
  public type: string;
  public stacked: any[] = [];
  constructor() {

  }

  ngOnInit() {
  }

}
