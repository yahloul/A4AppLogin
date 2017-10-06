import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
// Import HttpClientModule from @angular/common/http
import {HttpClientModule} from '@angular/common/http';

// used to create fake backend
// import { fakeBackendProvider } from './_helpers/index';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions } from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginformComponent } from './loginform/loginform.component';
import { FooterComponent } from './footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';

// import { UserService } from './user.service';
import { AuthguardGuard } from './authguard.guard';

import { AlertComponent } from './_directives/index';
import { AuthGuard } from './_guards/index';
import { AlertService, AuthenticationService, UserService } from './_services/index';
import { DataService } from './_services/data.service';


const appRoutes:Routes = [
  {
    path: '',
    component: LoginformComponent
  },
  {
    path: 'dashboard',
    canActivate: [AuthguardGuard],
    component: DashboardComponent
  },
  // otherwise redirect to home
  {
    path: '**', redirectTo: '' 
  }
]

@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    HeaderComponent,
    LoginformComponent,
    FooterComponent,
    DashboardComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    // Include it under 'imports' in your application module
    // after BrowserModule.
    HttpClientModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    AuthGuard,
    AuthguardGuard,
    AlertService,
    AuthenticationService,
    UserService,
    DataService,

    // providers used to create fake backend
    // fakeBackendProvider,
    MockBackend,
    BaseRequestOptions
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
