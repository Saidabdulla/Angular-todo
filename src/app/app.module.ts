import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './modules/login/login.component';
import { MainComponent } from './modules/main/main.component';
import { AddComponent } from './modules/main/components/add/add.component';
import { ListComponent } from './modules/main/components/list/list.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    ListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AddComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
