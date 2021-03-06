import { LineGraph } from './../model/d3tools';
import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';


@Component({
  selector: 'app-d3-visualizations',
  templateUrl: './d3-visualizations.component.html',
  styleUrls: ['./d3-visualizations.component.css']
})
export class D3VisualizationsComponent implements OnInit {
  private parseTime = d3.timeParse("%Y");
  private lineGraph : LineGraph;
  constructor() { }

  ngOnInit() {
    var width = 1140;
    var height = 506;
    var selector = d3.select("#d3-canvas");
    var graphMargins = {top: 20, right: 85, left: 85, bottom: 20},
    graphWidth = width - graphMargins.left - graphMargins.right - 66,
    graphHeight = height - graphMargins.top - graphMargins.bottom - 32;
    var margins = {
      left: 85,
      top: 20
    }

    this.lineGraph = new LineGraph(selector, graphWidth, graphHeight, graphMargins);
    var data = new Array();
    var year = 1990;
    for(var i=0;i<100;i++){
      var date = new Date();
      date.setFullYear(1990 + Math.floor(Math.random() * 30))
      data.push({
        year: this.parseTime(date.getFullYear().toString()),
        value: Math.floor(Math.random() * 30000)
      })
    }
    data = data.sort((a, b)=>{
      if(a.year < b.year) return -1;
      if(a.year === b.year) return 0;
      else return 1;
    })
    this.lineGraph.loadData(data);
    this.lineGraph.draw();
    
    
  }

}
