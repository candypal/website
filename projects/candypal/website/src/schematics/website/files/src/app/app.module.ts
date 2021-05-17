import {BrowserModule} from '@angular/platform-browser';
import {InjectionToken, NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {WebsiteModule} from '@candiman/website';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {environment} from '../environments/environment';


export const Window = new InjectionToken<any>('A reference to the window');

export function windowFactory() {
  return window;
}


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    // NgbModule,
    // NbLayoutModule,
    // NbAlertModule,
    // NbInputModule,
    // NbButtonModule,
    // NbCheckboxModule,
    WebsiteModule.forRoot({
      loginUrl: environment.restUrl + '/user/login',
      alertDelayInSeconds: 7
    }),
    BrowserAnimationsModule
  ],
  providers: [
    {
      provide: Window,
      useFactory: windowFactory
    }/*,{
      provide: APP_INITIALIZER,
      useFactory: appInitFactory,
      deps: [AppInitService],
      multi: true
    }*/
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
