import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {PublishComponent} from "../publish/publish.component";

@Component({
  selector: 'app-edit-detail',
  templateUrl: './edit-detail.component.html',
  styleUrls: ['./edit-detail.component.scss'],
  providers: [PublishComponent]
})
export class EditDetailComponent implements OnInit {

  constructor(private publishComponent:PublishComponent) { }

  ngOnInit() {
    this.publishComponent.changeStep()
  }

}
