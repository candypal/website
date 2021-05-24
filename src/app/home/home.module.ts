import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import {RestaurantModule} from '../restaurant/restaurant.module';

@NgModule({
  imports: [
    CommonModule,
    RestaurantModule
  ],
  declarations: [
    HomeComponent
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
