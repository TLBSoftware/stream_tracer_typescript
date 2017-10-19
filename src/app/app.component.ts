import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';
  mainView = true;
  pages = [
    {
      name: 'map',
      toggled: false,
      description: "A page dedicated to displaying the use of a stream tracing api built from javascript alone"
    },
    {
      name: 'graph',
      toggled: false,
      description: "A page dedicated to a linegraph class built in javascript and ported to typescript"
    }
  ];

  ngOnInit(){
    this.page('map').toggled = true;
  }

  toggle(page){
    this.page(page).toggled = true;
  }

  toggleAllOff(){
    this.pages.forEach(i=>i.toggled=false);
  }

  toggleMap(){
    this.toggleAllOff();
    this.toggle('map');
  }

  page(string){
    return this.pages.filter(item=>{
      if(item.name === string){
        return true;
      }
      return false;
    })[0];
  }

  toggleGraph(){
    this.toggleAllOff();
    this.toggle('graph');
  }
}
