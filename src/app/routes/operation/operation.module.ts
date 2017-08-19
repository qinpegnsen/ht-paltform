import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpressComponent } from './express/express.component';
import { ArticleComponent } from './article/article.component';
import { EnsureComponent } from './ensure/ensure.component';
import { AfterEnsureComponent } from './after-ensure/after-ensure.component';
import {RouterModule, Routes} from "@angular/router";
import { ArticleSortComponent } from './article/article-sort/article-sort.component';
import { ArticleManageComponent } from './article/article-manage/article-manage.component';
import {SharedModule} from "../../shared/shared.module";

const articleChildRoutes: Routes = [
  {path: '', redirectTo:'manage'},
  {path: 'manage', component: ArticleManageComponent},
  {path: 'sort', component: ArticleSortComponent}
]
const routes: Routes = [
  {path: '',redirectTo:'express'},
  {path: 'express', component: ExpressComponent},
  {path: 'article', component: ArticleComponent,children:articleChildRoutes},
  {path: 'ensure', component:EnsureComponent},
  {path: 'after-ensure', component: AfterEnsureComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [ExpressComponent, ArticleComponent, EnsureComponent, AfterEnsureComponent, ArticleSortComponent, ArticleManageComponent]
})
export class OperationModule { }
