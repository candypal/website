import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuardService, LoginComponent, PrivacyComponent, ProfileComponent} from "@candypal/website";

const routes: Routes = [
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
