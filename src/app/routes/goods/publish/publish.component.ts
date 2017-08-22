import {Component, OnInit} from "@angular/core";
import {AppComponent} from "../../../app.component";

@Component({
  selector: 'app-publish',
  templateUrl: './publish.component.html',
  styleUrls: ['./publish.component.scss']
})
export class PublishComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

  ccc() {
    AppComponent.rzhAlt("error", "ok.....", "sdfsdfsdf");
  }

}
