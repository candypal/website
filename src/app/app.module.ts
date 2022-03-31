import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './components/app/app.component';
import {WebsiteModule} from "@candypal/website";
import {HomeModule} from "./home/home.module";
import {RestaurantModule} from "./restaurant/restaurant.module";
import {NgbRatingModule} from "@ng-bootstrap/ng-bootstrap";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    WebsiteModule/*.forRoot({
      restUrl: environment.restUrl,
      loginUrl: environment.restUrl + '/authentication/login',
      alertDelayInSeconds: 7
    })*/,
    HomeModule,
    RestaurantModule,
    NgbRatingModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
