import { StreamerService } from './../streamer.service';
import { Component, OnInit } from '@angular/core';
import * as L from "leaflet"
import * as GeoJSON from 'geojson';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  private mapId: string;
  private center: number[];
  private map: L.Map;
  private mainStreamLayer;
  private layers: any[] = [];
  constructor(private streamer: StreamerService, private http: HttpClient) { }
  
  /*
  constructor(public navCtrl: NavController,
  public http: Http) {
    
  }
  */
  ngOnInit() {
    this.mapId = "map-container";
    this.center = [38.219606, -85.475043];
    this.initMap();
  }
  
  
  async initMap(){
    console.time("initMap");
    var center = L.latLng(this.center[0], this.center[1]);
    
    var options: L.MapOptions = {
      center: center,
      zoom: 13
    };
    this.map = L.map(this.mapId, options);
    /*
    this.map = new L.Map(this.mapId, {
      center: center,
      zoom: 12,
    });
    */
    
    let osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    
    var osmLayer = L.tileLayer(osmUrl).addTo(this.map);
    var streams = await this.getJSON("assets/data/parsedstreamfile.json")
    var nodes = await this.getJSON("assets/data/parsednodefile.json")
    this.streamer.LoadData( streams, nodes);
    this.mainStreamLayer = L.geoJSON(this.streamer.getStreamFile,{
      onEachFeature: (feature, layer)=>{
        layer.on("click", (e: L.LeafletEvent)=>{
            this.DownstreamTrace(e);
        })
      }
    }).addTo(this.map);
    //osmLayer.addTo(this.map);s
    
    console.timeEnd("initMap");

    this.map.on("click", (e:L.LeafletMouseEvent)=>{
      var marker = L.marker(e.latlng).bindPopup("<app-map-popup></app-map-popup>").addTo(this.map);
      console.log(e);
    })
  }

  async getJSON(path: string): Promise<any>{
    return new Promise<any>((resolve, reject)=>{
      this.http.get(path).subscribe(data=>{
        resolve(data);
      })
    })
  
  }

  DownstreamTrace(event: L.LeafletEvent){
    var streamFeature = event.target.feature;

    var returnedGeojson = this.streamer.DownstreamTrace(streamFeature);
    var newLayer = L.geoJSON(returnedGeojson);
    this.map.removeLayer(this.mainStreamLayer).addLayer(newLayer);
    
  }

}
