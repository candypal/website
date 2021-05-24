import {InjectionToken, Injector, ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import {AlertService} from './services/alert/alert.service';
import {AppInitService} from './services/app-init/app-init.service';
import {AuthGuardService} from './services/auth-guard/auth-guard.service';
import {UserService} from './services/user/user.service';
import {AlertsComponent} from './components/alerts/alerts.component';
import {LoginComponent} from './components/login/login.component';
import {ReactiveFormsModule} from '@angular/forms';
import {EncryptionService} from './services/encryption/encryption.service';
import {MapService} from './services/map/map.service';
import {AppService} from './services/app/app.service';
import {NoAuthGuardService} from './services/no-auth-guard/no-auth-guard.service';
import {GoogleAnalyticsService} from './services/google-analytics/google-analytics.service';
import {RouterModule} from '@angular/router';
import {PrivacyComponent} from './components/privacy/privacy.component';
import {CoreService} from './services/core/core.service';
import {FilterPipe} from './services/filter-pipe/filter-pipe.service';
import {ChangeLocationModelComponent} from './components/change-location-model/change-location-model.component';
import {ProfileComponent} from './components/profile/profile.component';
import {CorouselComponent} from './components/corousel/corousel.component';
import {ContentLoadingComponent} from './components/content-loading/content-loading.component';
import {AutoScrollDirective} from './directives/auto-scroll.directive';
import {ModelComponent} from './components/model/model.component';
import {CfsInfiniteScrollService} from './services/cfs-infinite-scroll/cfs-infinite-scroll.service';
import {ReadMoreComponent} from './components/read-more/read-more.component';
import {SafeHtmlPipe} from './pipes/safe-html/safe-html.pipe';
import {WebsiteComponent} from './components/website/website.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {NgbAlertModule, NgbCarouselModule, NgbCollapseModule} from "@ng-bootstrap/ng-bootstrap";
import {WebsiteEnvironmentConfigs} from "./interfaces/website-environment-configs";

export const WINDOW = new InjectionToken<any>('A reference to the window');

export function windowFactory() {
  return window;
}

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    NgbAlertModule,
    NgbCarouselModule,
    NgbCollapseModule,
  ],
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
  exports: [
    HeaderComponent,
    FooterComponent,
    AlertsComponent,
    LoginComponent,
    ProfileComponent,
    PrivacyComponent,
    ChangeLocationModelComponent,
    CorouselComponent,
    ContentLoadingComponent,
    ReadMoreComponent,
    AutoScrollDirective,
    SafeHtmlPipe,
    WebsiteComponent
  ],
  entryComponents: [
    HeaderComponent,
    FooterComponent,
    AlertsComponent,
    LoginComponent,
    ProfileComponent,
    PrivacyComponent,
    ChangeLocationModelComponent,
    CorouselComponent,
    ContentLoadingComponent,
    ModelComponent,
    ReadMoreComponent,
    WebsiteComponent
  ]
})
export class WebsiteModule {
  public static forRoot(websiteEnvironment: WebsiteEnvironmentConfigs): ModuleWithProviders<WebsiteModule> {
    return {
      ngModule: WebsiteModule,
      providers: [
        AppService,
        AlertService,
        AppInitService,
        AuthGuardService,
        CoreService,
        EncryptionService,
        MapService,
        NoAuthGuardService,
        {
          provide: WINDOW,
          useFactory: windowFactory
        },
        {
          provide: 'websiteEnvironment',
          useValue: websiteEnvironment
        },
        UserService,
        GoogleAnalyticsService,
        CfsInfiniteScrollService,
        SafeHtmlPipe
      ]
    };
  }

  constructor(@Optional() @SkipSelf() parentModule: WebsiteModule) {
    if (parentModule) {
      throw new Error(
        'WebsiteModule is already loaded. Import it in the AppModule only');
    }
  }
}
