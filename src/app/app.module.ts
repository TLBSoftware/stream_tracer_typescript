import { StreamerService } from './streamer.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { HttpClientModule } from "@angular/common/http";
import { D3VisualizationsComponent } from './d3-visualizations/d3-visualizations.component';
import { MapPopupComponent } from './map-popup/map-popup.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    D3VisualizationsComponent,
    MapPopupComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    StreamerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
