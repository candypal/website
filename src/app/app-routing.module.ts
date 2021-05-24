import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/components/home/home.component";
import {RestaurantsComponent} from "./restaurant/components/restaurants/restaurants.component";
import {PrivacyComponent} from "../../projects/candypal/website/src/lib/components/privacy/privacy.component";
import {LoginComponent} from "../../projects/candypal/website/src/lib/components/login/login.component";
import {ProfileComponent} from "../../projects/candypal/website/src/lib/components/profile/profile.component";
import {AuthGuardService} from "../../projects/candypal/website/src/lib/services/auth-guard/auth-guard.service";

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
export class AppRoutingModule {
}
