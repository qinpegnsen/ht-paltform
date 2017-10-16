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
import {HelpCenterComponent} from "./help-center/help-center.component";
import {HelpAssortmentComponent} from "./help-center/help-assortment/help-assortment.component";
import {HelpInterlocutionComponent} from "./help-center/help-interlocution/help-interlocution.component";
import {AddrightpageComponent} from "./help-center/addrightpage/addrightpage.component";
import {ProblemDetailsComponent} from "./help-center/problem-details/problem-details.component";
import {HelpAnswerComponent} from "./help-center/help-answer/help-answer.component";
import {HelpUpdateComponent} from "./help-center/help-update/help-update.component";
import { NzModalModule, NzCheckboxModule } from 'ng-zorro-antd';
import {OperationService} from "./operation.service";
import {GoodsService} from "../goods/goods.service";
import {MaskService} from "../../core/services/mask.service";
import { GetClassComponent } from './get-class/get-class.component';
import { MessageInformComponent } from './message-inform/message-inform.component';
import { SysMessageComponent } from './sys-message/sys-message.component';
import { AgentTplComponent } from './message-inform/agent-tpl/agent-tpl.component';
import { PlatformTplComponent } from './message-inform/platform-tpl/platform-tpl.component';
import { MessageListComponent } from './sys-message/message-list/message-list.component';
import { ArticleAuditComponent } from './article/article-audit/article-audit.component';
import { AuditPageComponent } from './article/article-audit/audit-page/audit-page.component';
import { PlatformEditComponent } from './message-inform/platform-edit/platform-edit.component';
import { AgentEditComponent } from './message-inform/agent-edit/agent-edit.component';


const addSort: Routes = [
  {path: 'addSort', component: AddArticleSortComponent}
];
const addArticle: Routes = [
  {path: 'addArticle', component: AddArticleComponent}
];
const articleChildRoutes: Routes = [
  {path: 'manage', component: ArticleManageComponent,children:addArticle},
  {path: 'sort', component: ArticleSortComponent,children:addSort},
  {path: 'audit', component: ArticleAuditComponent},
  {path: 'auditPage', component: AuditPageComponent}
]
const expressChildRoute: Routes = [
  {path: 'rightPage', component: RightPageComponent}
]
const appChildRoutes: Routes = [
  {path: 'add-formoek', component: AddFormworkComponent}
]
const rightChildRoutes: Routes = [
  {path: 'help-assortment', component:HelpAssortmentComponent},
  {path: 'addrightpage', component:AddrightpageComponent}
]
const helpdRoutes: Routes = [
  {path: 'help-assortment', component:HelpAssortmentComponent},
]

const helpChildRoutes: Routes = [
  {path: 'help-interlocution', component: HelpInterlocutionComponent,children:rightChildRoutes},
  {path: 'problem-details', component:ProblemDetailsComponent},
  {path: 'help-answer', component: HelpAnswerComponent,children:helpdRoutes},
  {path: 'help-update', component:HelpUpdateComponent},
]

const messageChildRoutes: Routes = [
  {path: 'agent-tpl', component: AgentTplComponent},
  {path: 'platform-tpl', component: PlatformTplComponent}
]
const sysMessageChildRoutes: Routes = [
  {path: '',redirectTo:'message-list'},
  {path: 'message-list', component: MessageListComponent}
]

const routes: Routes = [
  {path: '',redirectTo:'express'},
  {path: 'express', component: ExpressComponent,children:expressChildRoute},
  {path: 'article', component: ArticleComponent,children:articleChildRoutes},
  {path: 'sys-message', component: SysMessageComponent,children:sysMessageChildRoutes},
  {path: 'message-inform', component: MessageInformComponent,children:messageChildRoutes},
  {path: 'help-center', component: HelpCenterComponent,children:helpChildRoutes},
  {path: 'ensure', component:EnsureComponent},
  {path: 'after-ensure', component: AfterEnsureComponent},
  {path: 'freight-template', component: FreightTemplateComponent,children: appChildRoutes},
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NzCheckboxModule,
    SharedModule,
    NzModalModule,
    FileUploadModule
  ],
  declarations: [ExpressComponent, ArticleComponent, EnsureComponent,FreightTemplateComponent, AfterEnsureComponent, ArticleSortComponent, ArticleManageComponent, AddArticleSortComponent, ContentNavComponent, ContentComponent, AddArticleComponent, RightPageComponent, AddFormworkComponent,HelpCenterComponent,HelpInterlocutionComponent,HelpAssortmentComponent,AddrightpageComponent,ProblemDetailsComponent,HelpAnswerComponent,HelpUpdateComponent, GetClassComponent, MessageInformComponent, SysMessageComponent, AgentTplComponent, PlatformTplComponent, MessageListComponent, PlatformEditComponent, ArticleAuditComponent, AuditPageComponent, PlatformEditComponent, AgentEditComponent],
  providers:[ArticleSortComponent,ContentService,ContentComponent,NavService,ContentNavComponent,OperationService,GoodsService,MaskService]
})
export class OperationModule { }
