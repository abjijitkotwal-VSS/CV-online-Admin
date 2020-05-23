import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// SERVICES
import { ThemeService } from './services/theme.service';
import { NavigationService } from "./services/navigation.service";
import { RoutePartsService } from './services/route-parts.service';
import { AuthGuard } from './services/auth/auth.guard';
import { AppConfirmService } from './services/app-confirm/app-confirm.service';
import { AppLoaderService } from './services/app-loader/app-loader.service';

import { SharedComponentsModule } from './components/shared-components.module';
import { SharedPipesModule } from './pipes/shared-pipes.module';
import { SharedDirectivesModule } from './directives/shared-directives.module';




// SERVICES


import { AuthorizeService } from './services/MyServices/authorize.service';
import { CommonService } from './services/MyServices/common.service';
import { InventoryService } from './services/MyServices/inventory.service';

import {AppinterceptorService} from '../shared/services/MyServices/appinterceptor.service';
import {HTTP_INTERCEPTORS} from '@angular/common/http';




@NgModule({
  imports: [
    CommonModule,
    SharedComponentsModule,
    SharedPipesModule,
    SharedDirectivesModule    
  ],
  providers: [AuthorizeService,CommonService,
    ThemeService,
    NavigationService,
    RoutePartsService,
    AuthGuard,
    AppConfirmService,
    AppLoaderService,
    {provide: HTTP_INTERCEPTORS, useClass: AppinterceptorService, multi: true},
  ],
  exports: [
    SharedComponentsModule,
    SharedPipesModule,
    SharedDirectivesModule
  ]
})
export class SharedModule { }
