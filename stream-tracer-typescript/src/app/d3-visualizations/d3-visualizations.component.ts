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

    var linegraph = new LineGraph(selector, graphWidth, graphHeight, graphMargins);
    var data = new Array(100);
    for(var i=0;i<100;i++){
      data.push({
        year: this.parseTime(Math.floor(Math.random() * 100).toString()),
        value: Math.floor(Math.random() * 30000)
      })
    }
    linegraph.loadData(data);
    
    
  }

}
