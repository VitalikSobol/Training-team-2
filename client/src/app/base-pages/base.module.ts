import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BaseRoutingModule} from './base-routing.module';

import {MenuComponent} from './common/menu/menu.component';
import {NotificationBlockComponent} from './common/notification-block/notification-block.component';
import {SearchInputComponent} from './common/search-input/search-input.component';
import {BaseComponent} from './base/base.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    BaseRoutingModule,
    FormsModule
  ],
  declarations: [
    BaseComponent,
    MenuComponent,
    NotificationBlockComponent,
    SearchInputComponent
  ],
  bootstrap: [
    BaseComponent
  ]
})
export class BaseModule {
}
