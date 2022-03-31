import {NgModule} from '@angular/core';
import {WebsiteComponent} from "./components/website/website.component";
import {HeaderComponent} from "./components/header/header.component";
import {FooterComponent} from "./components/footer/footer.component";
import {AlertsComponent} from "./components/alerts/alerts.component";
import {ChangeLocationModelComponent} from "./components/change-location-model/change-location-model.component";
import {CorouselComponent} from "./components/corousel/corousel.component";
import {PrivacyComponent} from "./components/privacy/privacy.component";
import {ProfileComponent} from "./components/profile/profile.component";
import {LoginComponent} from "./components/login/login.component";
import {FilterPipe} from "./services/filter-pipe/filter-pipe.service";
import {ContentLoadingComponent} from "./components/content-loading/content-loading.component";
import {AutoScrollDirective} from "./directives/auto-scroll.directive";
import {ModelComponent} from "./components/model/model.component";
import {ReadMoreComponent} from "./components/read-more/read-more.component";
import {SafeHtmlPipe} from "./pipes/safe-html/safe-html.pipe";
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {NgbAlertModule, NgbCarouselModule, NgbCollapseModule} from "@ng-bootstrap/ng-bootstrap";
import {RouterModule} from "@angular/router";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    AlertsComponent,
    LoginComponent,
    ProfileComponent,
    PrivacyComponent,
    ChangeLocationModelComponent,
    CorouselComponent,
    FilterPipe,
    ContentLoadingComponent,
    AutoScrollDirective,
    ModelComponent,
    ReadMoreComponent,
    WebsiteComponent,
    SafeHtmlPipe,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbAlertModule,
    NgbCarouselModule,
    NgbCollapseModule,
    RouterModule,
    FontAwesomeModule,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    AlertsComponent,
    LoginComponent,
    ProfileComponent,
    PrivacyComponent,
    ChangeLocationModelComponent,
    CorouselComponent,
    FilterPipe,
    ContentLoadingComponent,
    AutoScrollDirective,
    ModelComponent,
    ReadMoreComponent,
    WebsiteComponent,
    SafeHtmlPipe,
  ]
})
export class WebsiteModule { }
