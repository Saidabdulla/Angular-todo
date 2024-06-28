import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './modules/login/login.component';
import { MainComponent } from './modules/main/main.component';
import { AddComponent } from './modules/main/components/add/add.component';
import { ListComponent } from './modules/main/components/list/list.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AuthService } from "./servies/auth.service";
import { MessageService } from "primeng/api";
import { ToastModule } from "primeng/toast";
import { ButtonModule } from "primeng/button";
import { AuthInterceptor } from "./interceptor/auth.interceptor";
import { HTTP_INTERCEPTORS } from "@angular/common/http";


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AddComponent,
    LoginComponent,
    ToastModule,
    ButtonModule,
    ListComponent
  ],
  providers: [MessageService, AuthService, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
