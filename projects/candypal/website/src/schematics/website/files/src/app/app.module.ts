import {BrowserModule} from '@angular/platform-browser';
import {InjectionToken, NgModule} from '@angular/core';
import {AppComponent} from './app.component';

// Export window object
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
export class AppModule {
}
