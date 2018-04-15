import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { ProfileComponent } from './profile/profile.component';
import { AppRoutingModule } from './app-routing.module';
import { DropdowsStatusComponent } from './dropdown-status/dropdown-status.component';
import { MenuComponent } from './menu/menu.component';
import { NotificationBlockComponent } from './notification-block/notification-block.component';
import { SearchInputComponent } from './search-input/search-input.component';
import { ModalModule } from 'ngx-bootstrap';


@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    DropdowsStatusComponent,
    MenuComponent,
    NotificationBlockComponent,
    SearchInputComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ModalModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
