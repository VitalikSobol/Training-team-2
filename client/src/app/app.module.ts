import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {ModalModule} from 'ngx-bootstrap';

import {ServerInterceptor} from './base-pages/service/server-interceptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ModalModule.forRoot()
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ServerInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

