import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-audit-detail',
  templateUrl: './audit-detail.component.html',
  styleUrls: ['./audit-detail.component.scss']
})
export class AuditDetailComponent implements OnInit {
  public brandId: string;//品牌id

  constructor() { }

  ngOnInit() {
  }

}