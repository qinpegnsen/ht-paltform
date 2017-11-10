import {NgModule, ModuleWithProviders} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';
import {ToasterModule} from 'angular2-toaster/angular2-toaster';

import {AccordionModule} from "ngx-bootstrap/accordion";
import {AlertModule} from "ngx-bootstrap/alert";
import {ButtonsModule} from "ngx-bootstrap/buttons";
import {CarouselModule} from "ngx-bootstrap/carousel";
import {CollapseModule} from "ngx-bootstrap/collapse";
import {BsDropdownModule} from "ngx-bootstrap/dropdown";
import {ModalModule} from "ngx-bootstrap/modal";
import {PaginationModule} from "ngx-bootstrap/pagination";
import {ProgressbarModule} from "ngx-bootstrap/progressbar";
import {RatingModule} from "ngx-bootstrap/rating";
import {TabsModule} from "ngx-bootstrap/tabs";
import {TimepickerModule} from "ngx-bootstrap/timepicker";
import {TooltipModule} from "ngx-bootstrap/tooltip";
import {TypeaheadModule} from "ngx-bootstrap/typeahead";
import {DatepickerModule} from "ngx-bootstrap/datepicker";
import {BsDatepickerModule} from "ngx-bootstrap/datepicker";

import {FlotDirective} from './directives/flot/flot.directive';
import {SparklineDirective} from './directives/sparkline/sparkline.directive';
import {EasypiechartDirective} from './directives/easypiechart/easypiechart.directive';
import {ColorsService} from './colors/colors.service';
import {CheckallDirective} from './directives/checkall/checkall.directive';
import {VectormapDirective} from './directives/vectormap/vectormap.directive';
import {NowDirective} from './directives/now/now.directive';
import {ScrollableDirective} from './directives/scrollable/scrollable.directive';
import {JqcloudDirective} from './directives/jqcloud/jqcloud.directive';
import {DataTableModule} from "./directives/ng2-datatable/DataTableModule";
import {RzhButtonsModule} from "../routes/buttons/rzh-buttons.module";
import {SelectAreaModule} from "./directives/select-area/select-area.module";
import {StatePipe} from './pipe/state.pipe';
import {AreaNamePipe} from './pipe/area-name.pipe';
import {SelectModule} from 'ng2-select';
import {RzhtoolsService} from "../core/services/rzhtools.service";
import {SubmitService} from "../core/forms/submit.service";
import {ImgUrlPipe} from './pipe/img-url.pipe';
import {AngularEchartsModule} from "ngx-echarts";
import {HoverDirective} from './directives/hover/hover.directive';
import {GetKindComponent} from './directives/get-kind/get-kind.component';
import {FoueAreasModule} from "./directives/foue-areas/foue-areas.module";
import {Level2AreaNamePipe} from './pipe/level-2-area-name.pipe';
import {StarsPipe} from './pipe/stars.pipe';
import {DndModule} from "ng2-dnd";
import {HoverShowLgPicDirective} from "./directives/hover/hover-show-lg-pic.directive";
import {PopoverModule} from "ngx-bootstrap";
import { StrJsonPipe } from './pipe/str-json.pipe';
import { GetWeekPipe } from './pipe/get-week.pipe';
import { StrToNumberPipe } from './pipe/str-to-number.pipe';
import { ToStringPipe } from './pipe/to-string.pipe';

// https://angular.io/styleguide#!#04-10
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    AccordionModule.forRoot(),
    AlertModule.forRoot(),
    AccordionModule.forRoot(),
    CarouselModule.forRoot(),
    CollapseModule.forRoot(),
    BsDatepickerModule.forRoot(),
    DatepickerModule.forRoot(),
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    PaginationModule.forRoot(),
    ProgressbarModule.forRoot(),
    RatingModule.forRoot(),
    TabsModule.forRoot(),
    TimepickerModule.forRoot(),
    TooltipModule.forRoot(),
    DndModule.forRoot(),
    TypeaheadModule.forRoot(),
    PopoverModule.forRoot(),
    ToasterModule,
    DataTableModule,
    RzhButtonsModule,
    SelectAreaModule,
    SelectModule,
    AngularEchartsModule,
    FoueAreasModule,
  ],
  providers: [
    ColorsService,
    RzhtoolsService,
    SubmitService
  ],
  declarations: [
    FlotDirective,
    SparklineDirective,
    EasypiechartDirective,
    CheckallDirective,
    VectormapDirective,
    NowDirective,
    ScrollableDirective,
    JqcloudDirective,
    StatePipe,
    AreaNamePipe,
    ImgUrlPipe,
    HoverDirective,
    GetKindComponent,
    Level2AreaNamePipe,
    StarsPipe,
    HoverShowLgPicDirective,
    StrJsonPipe,
    GetWeekPipe,
    StrToNumberPipe,
    ToStringPipe,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    RouterModule,
    AccordionModule,
    AlertModule,
    ButtonsModule,
    CarouselModule,
    CollapseModule,
    DatepickerModule,
    BsDropdownModule,
    ModalModule,
    PaginationModule,
    ProgressbarModule,
    RatingModule,
    TabsModule,
    TimepickerModule,
    TooltipModule,
    TypeaheadModule,
    ToasterModule,
    DataTableModule,
    RzhButtonsModule,
    FlotDirective,
    SparklineDirective,
    EasypiechartDirective,
    CheckallDirective,
    VectormapDirective,
    NowDirective,
    ScrollableDirective,
    JqcloudDirective,
    SelectAreaModule,
    StatePipe,
    AreaNamePipe,
    SelectModule,
    ImgUrlPipe,
    AngularEchartsModule,
    HoverDirective,
    GetKindComponent,
    FoueAreasModule,
    Level2AreaNamePipe,
    StarsPipe,
    BsDatepickerModule,
    DatepickerModule,
    DndModule,
    HoverShowLgPicDirective,
    PopoverModule,
    StrJsonPipe,
    GetWeekPipe,
    StrToNumberPipe,
    ToStringPipe
  ]
})

// https://github.com/ocombe/ng2-translate/issues/209
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule
    };
  }
}
