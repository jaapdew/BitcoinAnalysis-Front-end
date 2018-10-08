import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';

import { HttpClientModule} from '@angular/common/http';
import { UiSwitchModule } from 'ngx-toggle-switch';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { ChartModule, HIGHCHARTS_MODULES } from 'angular-highcharts';

import * as stock from 'highcharts/modules/stock.src';
import * as more from 'highcharts/highcharts-more.src';
import * as exporting from 'highcharts/modules/exporting.src';

import { BitcoinService } from '../service/bitcoin.service';
import { loginService } from '../service/login.service';
import { DataService } from '../service/data.service';
import { PredictionService } from '../service/prediction.service';

import { DatabaseHubComponent } from './view/database-hub/database-hub.component';
import { DatabaseChartComponent } from './view/database-chart/database-chart.component';
import { LoginComponent } from './view/login/login.component';
import { GraphsComponent } from './view/graphs/graphs.component';
import { DataComponent } from './view/data/data.component';
import { PredictionsComponent } from './view/predictions/predictions.component';
import { ChartAreaComponent } from './view/chartarea/chartarea.component';
import { ChartLineComponent } from './view/chartline/chartline.component';
import { chartCandlestickComponent } from './view/chartcandlestick/chartcandlestick.component';

const appRoutes: Routes =[
  {path: '', component: DatabaseHubComponent},
  {path: 'login', component: LoginComponent},
  {path: 'graphs', component: GraphsComponent},
  {path: 'data', component: DataComponent},
  {path: 'predictions', component: PredictionsComponent}
];


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    DatabaseHubComponent,
    DatabaseChartComponent,
    LoginComponent,
    GraphsComponent,
    DataComponent,
    PredictionsComponent,
    ChartAreaComponent,
    ChartLineComponent,
    chartCandlestickComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    UiSwitchModule,
    MatDatepickerModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    ChartModule,
    MatButtonModule
  ],
  providers: [
    BitcoinService,
    loginService,
    DataService,
    PredictionService,
    { provide: HIGHCHARTS_MODULES, useFactory: highchartsModules }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function highchartsModules() { return [stock, more, exporting]; }
