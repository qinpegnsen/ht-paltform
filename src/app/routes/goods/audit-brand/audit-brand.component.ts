import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-audit-brand',
  templateUrl: './audit-brand.component.html',
  styleUrls: ['./audit-brand.component.scss']
})
export class AuditBrandComponent implements OnInit {
  public auditType: string = 'APPLY';//审核类型

  constructor() {
  }

  ngOnInit() {
  }

}
