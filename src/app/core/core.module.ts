import {NgModule, Optional, SkipSelf} from '@angular/core';
import {SettingsService} from './settings/settings.service';
import {ThemesService} from './themes/themes.service';
import {TranslatorService} from './translator/translator.service';
import {MenuService} from './menu/menu.service';
import {PatternService} from './forms/pattern.service';
import {TableService} from './list/table.service';
import {AjaxService} from './services/ajax.service';
import {MaskService} from './services/mask.service';
import {throwIfAlreadyLoaded} from "./module-import-guard";
import {PopupComponent} from "../routes/operationpage/popup/popup.component";

@NgModule({
  imports: [],
  providers: [
    SettingsService,
    ThemesService,
    TranslatorService,
    MenuService,
    PatternService,
    TableService,
    MaskService,
    AjaxService
  ],
  declarations: [PopupComponent],
  exports: []
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
