import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {SharedModule} from "../shared/shared.module";
import {routes} from './routes';
import {PagesModule} from './pages/pages.module';
import {SiteComponent} from "./activities/site/site.component";
@NgModule({
  imports: [
    SharedModule,
    RouterModule.forRoot(routes),
    PagesModule,
  ],
  declarations: [],
  exports: [
    RouterModule
  ],
  providers:[SiteComponent]
})

export class RoutesModule {
}
