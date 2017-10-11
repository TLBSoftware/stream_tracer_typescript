import * as d3 from "d3";

interface GraphData{
    year: number,
    value: number
}

export class LineGraph{
    private selectorArg;
    private graphWidth;
    private graphHeight;
    private context;
    private margins;
    private svg;
    private focus;
    private lineSvg;
    private xScale;
    private yScale;
    private formatDate;
	private colorsForLines = ["red", "blue", "green"];
    private lineFunc;
    private data;
    constructor(selecterArg, width, height, margins){
        this.selectorArg = selecterArg;
        this.margins = margins;
		this.context = this;
        this.svg = selecterArg.append("g")
                    .attr("transform",
                    "translate("+this.margins.left+","+this.margins.top+")");
        this.graphHeight = height == null ? this.svg.attr("height") : height;
        this.graphWidth = width == null ? this.svg.attr("width") : width;
        this.focus = this.svg.append("g").style("display", "none").attr("class","focus");
        this.lineSvg = this.svg
                    .append("g");
        //Sets the scales of the graph
        this.xScale = d3.scaleTime().range([0, this.graphWidth]);
        this.yScale = d3.scaleLinear().range([this.graphHeight, 0]);
        this.formatDate = d3.timeFormat("%Y");
		//The line equation that data will be passed into to generate a polyline
		let lineYearFunc = (d)=>{return this.xScale(d.year)};
		let lineValueFunc = (d)=>{return this.yScale(d.value)};
        this.lineFunc = d3.line()
                    .x(lineYearFunc)
                    .y(lineValueFunc);

        //append circle for tooltip
        this.focus.append("circle")
                    .attr("class", "y")
                    .style("fill", "none")
                    .style("stroke", "blue")
                    .attr("r", 4);
        this.focus.append("text")
                    .attr("class", "y1")
                    .style("stroke", "white")
                    .style("stroke-width", "3.5px")
                    .style("opacity", 0.8)
                    .attr("dx", 8)
                    .attr("dy", "-.3em");
        this.focus.append("text")
                    .attr("class", "y2")
                    .attr("dx", 8)
                    .attr("dy", "-.3em");
        this.focus.append("text")
                    .attr("class", "y3")
                    .style("stroke", "white")
                    .style("stroke-width", "3.5px")
                    .style("opacity", 0.8)
                    .attr("dx", 8)
                    .attr("dy", "1em");
        this.focus.append("text")
                    .attr("class", "y4")
                    .attr("dx", 8)
                    .attr("dy", "1em");

    }

    loadData(data){
		this.data = data;
		console.log(data);
		var rangeOfTime = [], rangeOfValues = [];
		/*
		for(var i=0;i<this.data.length;i++){
			rangeOfTime.push(d3.min(data[i], returnYear));
            rangeOfTime.push(d3.max(data[i], returnYear));
			rangeOfValues.push(d3.min(data[i], returnValue));
			rangeOfValues.push(d3.max(data[i], returnValue));
		}*/
		
		let returnYear = (d) =>{return d.year};
		let returnValue = (d)=>{return d.value};
		rangeOfTime.push(d3.min(this.data, returnYear));
		rangeOfTime.push(d3.max(this.data, returnYear));
		rangeOfValues.push(d3.min(this.data, returnValue));
		rangeOfValues.push(d3.max(this.data, returnValue));
		
		this.xScale.domain(rangeOfTime.sort());
		this.yScale.domain(rangeOfValues.sort());
    };	
    
    draw(){
		/*
		if(this.data.length <= 3){
			for(var i=0;i<this.data.length;i++){
				var lineClass = "line" + i;
				this.lineSvg
					.append("path")
					.data([this.data[i]])
					.attr("class", lineClass)
					.attr("d", this.lineFunc)
					.attr("stroke", this.colorsForLines[i])
			}
		}else{
			for(var i=0;i<this.data.length;i++){
				var lineClass = "line" + i;
				this.lineSvg
					.append("path")
					.data([this.data[i]])
					.attr("class", lineClass)
					.attr("d", this.lineFunc)
					.attr("stroke", "red")
					
			}
		}*/

		var lineClass = "data-set-1";
		this.lineSvg
			.append("path")
			.data([this.data]) //datum, not data
			.attr("class", lineClass)
			.attr("d", this.lineFunc)
			.attr("fill", "none")
			.attr("stroke", "red")
		this.lineSvg
			.append("g")
			.attr("transform", "translate(0," + this.graphHeight + ")")
			.call(d3.axisBottom(this.xScale));
		this.lineSvg
			.append("g")
			.call(d3.axisLeft(this.yScale));

			/*
		if(this.data.length <= 3){
		this.svg.append("rect")
	        .attr("width", this.graphWidth)
	        .attr("height", this.graphHeight)
	        .attr("class", "mouseover-rectangle")
	        .style("stroke", "none")
	        .style("fill", "none")
	        .style("pointer-events", "all")
	        .on("mouseover", ()=> { this.focus.style("display", null); })
	        .on("mouseout", ()=> { this.focus.style("display", "none"); })
	        .on("mousemove", this.mousemove);
		}*/
		/*
		this.svg.append("rect")
				.attr("width", this.graphWidth)
				.attr("height", this.graphHeight)
				.attr("class", "mouseover-rectangle")
				.style("stroke", "none")
				.style("fill", "none")
				.style("pointer-events", "all")
				.on("mouseover", ()=> { this.focus.style("display", null); })
				.on("mouseout", ()=> { this.focus.style("display", "none"); })
				.on("mousemove", ()=>mousemove(this));

				
				function mousemove(context){
					let returnYear = (d)=>{ return d.year; };
					
					var bisectDate = d3.bisector(returnYear).left;
					var toolData = context.data;
					var rectangle: d3.ContainerElement = this;
					var x0 = context.xScale.invert(d3.mouse(this)[0]),
					  i = bisectDate(toolData, x0, 1),
					  d0 = toolData[i - 1],
					  d1 = toolData[i],
					  d =x0 - d0.year > d1.year - x0 ? d1 : d0;
					  
					let xScale = context.xScale,
						yScale = context.yScale,
						focus = context.focus,
						formatDate = context.formateDate;
			
					focus.select("circle.y")
							.attr("transform",  
							"translate(" + (xScale(d.year)) + "," +  
										   (yScale(d.value)) + ")");
					focus.select("text.y1")
							.attr("transform",  
							"translate(" + (xScale(d.year)) + "," +  
										   (yScale(d.value)) + ")")
							.text("$"+d.value);
			
					focus.select("text.y2")
							.attr("transform",  
							"translate(" + (xScale(d.year)) + "," +  
										   (yScale(d.value)) + ")")
							.text("$"+d.value);
					focus.select("text.y3")
							  .attr("transform",
							"translate(" + xScale(d.year) + "," +
									   yScale(d.value) + ")")
							  .text(formatDate(d.year));
			
					focus.select("text.y4")
							  .attr("transform",
								"translate(" + xScale(d.year) + "," +
											   yScale(d.value) + ")")
							  .text(formatDate(d.year));
				}
		
		*/
    }
    	
//event to track mouse position and move circle on line
    
    
	

}
