import { StreamerService } from './streamer.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { HttpClientModule } from "@angular/common/http";
import { D3VisualizationsComponent } from './d3-visualizations/d3-visualizations.component';
import { MapPopupComponent } from './map-popup/map-popup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
//you need to know import all material components that you want to use
import { MatSidenavModule ,MatButtonModule, MatCardModule, MatMenuModule, MatToolbarModule, MatIconModule} from '@angular/material'
@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    D3VisualizationsComponent,
    MapPopupComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule, 
    MatCardModule,
    MatMenuModule,
    MatToolbarModule, 
    MatIconModule,
    MatSidenavModule
  ],
  providers: [
    StreamerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
