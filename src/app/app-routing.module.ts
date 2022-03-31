import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./home/components/home/home.component";
import {RestaurantsComponent} from "./restaurant/components/restaurants/restaurants.component";
import {AuthGuardService, LoginComponent, PrivacyComponent, ProfileComponent} from "@candypal/website";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'restaurant',
    component: RestaurantsComponent
  },
  {
    path: 'privacy',
    component: PrivacyComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [
      AuthGuardService
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
