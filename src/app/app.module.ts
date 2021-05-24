import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import {environment} from "../environments/environment";
import {WebsiteModule} from "@candypal/website";
import {HomeModule} from "./home/home.module";
import {RestaurantModule} from "./restaurant/restaurant.module";
import {AgmCoreModule} from "@agm/core";
import {NgbRatingModule} from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    WebsiteModule.forRoot({
      restUrl: environment.restUrl,
      loginUrl: environment.restUrl + '/authentication/login',
      alertDelayInSeconds: 7
    }),
    HomeModule,
    RestaurantModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBMIoVYsqVdrlm_IwdKSkLEhpMH7JtEIT8',
      libraries: [
        'places'
      ]
    }),
    NgbRatingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
