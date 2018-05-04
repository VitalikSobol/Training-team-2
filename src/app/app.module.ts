import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {ModalModule, TabsModule} from 'ngx-bootstrap';

import {ServerInterceptor} from './base-pages/service/server-interceptor';
import {BaseModule} from './base-pages/base.module';
import {BaseRoutingModule} from './base-pages/base-routing.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ModalModule.forRoot(),
    TabsModule.forRoot(),
    BaseModule,
    BaseRoutingModule

  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ServerInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

