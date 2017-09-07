import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpressComponent } from './express/express.component';
import { ArticleComponent } from './article/article.component';
import { EnsureComponent } from './ensure/ensure.component';
import { AfterEnsureComponent } from './after-ensure/after-ensure.component';
import {RouterModule, Routes} from "@angular/router";
import { ArticleSortComponent } from './article/article-sort/article-sort.component';
import {SharedModule} from "../../shared/shared.module";
import { AddArticleSortComponent } from './add-article-sort/add-article-sort.component';
import {ArticleManageComponent} from "./article/article-manage/article-manage.component";
import { ContentNavComponent } from './article/article-manage/content-nav/content-nav.component';
import { ContentComponent } from './article/article-manage/content/content.component';
import { AddArticleComponent } from './article/article-manage/add-article/add-article.component';
import {ContentService} from "./article/article-manage/content/content.service";
import {FileUploadModule} from "ng2-file-upload";
import {NavService} from "./article/article-manage/content-nav/nav.service";
import { RightPageComponent } from './express/right-page/right-page.component';
import {FreightTemplateComponent} from "./freight-template/freight-template.component";
import { AddFormworkComponent } from './add-formwork/add-formwork.component';


const addSort: Routes = [
  {path: 'addSort', component: AddArticleSortComponent}
];
const addArticle: Routes = [
  {path: 'addArticle', component: AddArticleComponent}
];
const articleChildRoutes: Routes = [
  {path: 'manage', component: ArticleManageComponent,children:addArticle},
  {path: 'sort', component: ArticleSortComponent,children:addSort}
]
const expressChildRoute: Routes = [
  {path: 'rightPage', component: RightPageComponent}
]
const appChildRoutes: Routes = [
  {path: 'add-formoek', component: AddFormworkComponent}
]
const routes: Routes = [
  {path: '',redirectTo:'express'},
  {path: 'express', component: ExpressComponent,children:expressChildRoute},
  {path: 'article', component: ArticleComponent,children:articleChildRoutes},
  {path: 'ensure', component:EnsureComponent},
  {path: 'after-ensure', component: AfterEnsureComponent},
  {path: 'freight-template', component: FreightTemplateComponent,children: appChildRoutes},
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    FileUploadModule
  ],
  declarations: [ExpressComponent, ArticleComponent, EnsureComponent,FreightTemplateComponent, AfterEnsureComponent, ArticleSortComponent, ArticleManageComponent, AddArticleSortComponent, ContentNavComponent, ContentComponent, AddArticleComponent, RightPageComponent, AddFormworkComponent],
  providers:[ArticleSortComponent,ContentService,ContentComponent,NavService,ContentNavComponent]
})
export class OperationModule { }
