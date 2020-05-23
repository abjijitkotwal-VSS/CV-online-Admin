import { NgModule } from '@angular/core';
//import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule,FormsModule  } from '@angular/forms';
import { 
  MatInputModule,
  MatIconModule,
  MatCardModule,
  MatMenuModule,
  MatButtonModule,
  MatChipsModule,
  MatListModule,
  MatTooltipModule,
  MatDialogModule,
  MatSnackBarModule,
  MatSlideToggleModule,
  MatSliderModule,MatSidenavModule,MatToolbarModule
 } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SharedModule } from '../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { PagesRoutingModule } from './pages-routing.module';
import { MatTableModule } from '@angular/material';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { DatePipe } from '@angular/common';

import { 
  
  MatProgressBarModule,

  MatGridListModule,
  MatExpansionModule,
  MatTabsModule
  } from '@angular/material';

import { ChartsModule } from 'ng2-charts';
import { NgxEchartsModule } from 'ngx-echarts';

import { SharedPipesModule } from 'app/shared/pipes/shared-pipes.module';
import { MatPaginatorModule } from '@angular/material';





import {  HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GestureConfig } from '@angular/material';
import { 
  PerfectScrollbarModule, 
  PERFECT_SCROLLBAR_CONFIG, 
  PerfectScrollbarConfigInterface
} from 'ngx-perfect-scrollbar';





import { HttpClient, HttpClientModule } from '@angular/common/http';
import {  TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpLoaderFactory } from 'app/app.module';
import { MatRadioModule,MatStepperModule } from '@angular/material';
import {  MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import {MatSelectModule} from '@angular/material/select';

import { QuillModule } from 'ngx-quill';


//import {EgretHighlightDirective} from '../../shared/directives/egret-highlight.directive' 
import { DashBoardSummaryComponent } from './dash-board-summary/dash-board-summary.component';

//import {MatSelectSearchModule}  from '../../../../src/app/shared/components/mat-select-search/mat-select-search.module'

import { FilterComponent } from './dash-board-summary/filter/filter.component';
import { RegistrationComponent } from './Registration/registration/registration.component';
import { RegistrationListComponent } from './Registration/registration-list/registration-list.component';
import { UserRegistrationComponent } from './Registration/user-registration/user-registration.component';
import { RegistrationListSearchComponent } from './Registration/registration-list-search/registration-list-search.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

import { RolePageMappingComponent } from './Master/role-page-mapping/role-page-mapping.component';
import { PositionMasterComponent } from './Master/position-master/position-master.component';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  declarations: [RegistrationListSearchComponent,UserRegistrationComponent,RegistrationListComponent,RegistrationComponent,FilterComponent,DashBoardSummaryComponent,    RolePageMappingComponent, PositionMasterComponent],
  imports: [MatAutocompleteModule,QuillModule,MatStepperModule,MatTableModule,
    MatRadioModule,MatDatepickerModule,MatNativeDateModule,MatSelectModule,MatCheckboxModule,
    PerfectScrollbarModule,
    MatProgressBarModule,ChartsModule,MatPaginatorModule,
    NgxEchartsModule,SharedPipesModule,
    MatGridListModule,
    MatExpansionModule,
    MatTabsModule,
    //CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    ReactiveFormsModule,FormsModule,
    FlexLayoutModule,
    NgxDatatableModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatMenuModule,
    MatButtonModule,
    MatChipsModule,
    MatListModule,
    MatTooltipModule,
    MatDialogModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    TranslateModule,
    MatSliderModule,
   // SharedModule,
     //RouterModule.forChild(PagesRoutingModule)

     PagesRoutingModule,
     
     TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  //exports: [MatSelectSearchModule],
  entryComponents: [],
  providers: [DatePipe,
    //{ provide: ErrorHandler, useClass: ErrorHandlerService },
    { provide: HAMMER_GESTURE_CONFIG, useClass: GestureConfig },
    { provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG },
  ],
})
export class PagesModule { }
