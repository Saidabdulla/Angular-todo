import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from "./modules/main/main.component";
import { LoginComponent } from "./modules/login/login.component";
import { authGuard } from "./guards/auth.guard";
import { HttpClientModule } from "@angular/common/http";

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [authGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), HttpClientModule],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
