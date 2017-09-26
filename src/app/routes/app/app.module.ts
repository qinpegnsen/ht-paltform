import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppIndexOptComponent } from './app-index-opt/app-index-opt.component';
import { AppIndexTplComponent } from './app-index-tpl/app-index-tpl.component';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../../shared/shared.module';


const routes: Routes = [
  {path: '', component: AppIndexOptComponent},
  {path: 'app-index-opt', component: AppIndexOptComponent},
  {path: 'app-index-tpl', component: AppIndexTplComponent},
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [AppIndexOptComponent, AppIndexTplComponent]
})
export class AppModule { }
