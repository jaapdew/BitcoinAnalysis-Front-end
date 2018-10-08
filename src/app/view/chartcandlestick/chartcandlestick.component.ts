import { Component, OnInit } from '@angular/core';
import { Chart, Highcharts } from 'angular-highcharts';
import { DataService } from 'src/service/data.service';
import { BitcoinDataDto } from 'src/model/BitcoinDataDto';
import { Candlestick } from 'src/model/Candlestick';

@Component({
  selector: 'app-chartcandlestick',
  template: `
    <div [chart]="chartCandlestick"></div>
  `
  
})
export class chartCandlestickComponent implements OnInit {
  data: BitcoinDataDto[];
  parsedDataMinute: Array<Candlestick>;
  parsedDataHour: Array<Candlestick>;
  parsedDataDay: Array<Candlestick>;
  parsedDataWeek: Array<Candlestick>;
  startDateField;
  endDateField;
  chartCandlestick : Chart;


  constructor(private service: DataService) { 
  }

  ngOnInit() {
  }

  getData(){
    this.service.getData(this.startDateField, this.endDateField).subscribe(
      data =>{ this.data = data;
      this.createChart();
      this.parseData();

    })
  }

  zoom(zoomEvent: Highcharts.AxisEvent){
    let xAxis = (zoomEvent.max - zoomEvent.min)/1000;   //Length of chart in seconds
    if(zoomEvent.max == null){                          // zoomEvent = Reset Zoom 
      xAxis = (this.parsedDataMinute[this.parsedDataMinute.length-1].x - this.parsedDataMinute[0].x)/1000
    }
    if(xAxis <= 7_200){                                 //120 minutes
      this.chartCandlestick.removeSerie(0);
      this.chartCandlestick.addSerie({
        turboThreshold: 0,
        type: 'candlestick',
        name: 'Bitcoin',
        data: this.parsedDataMinute
      });
    } else if(xAxis <= 432_000){                        //120 Hours
      this.chartCandlestick.removeSerie(0);
      this.chartCandlestick.addSerie({
        turboThreshold: 0,
        type: 'candlestick',
        name: 'Bitcoin',
        data: this.parsedDataHour
      });
    } else if(xAxis <= 10_368_000){                       //120 Days
      this.chartCandlestick.removeSerie(0);
      this.chartCandlestick.addSerie({
        turboThreshold: 0,
        type: 'candlestick',
        name: 'Bitcoin',
        data: this.parsedDataDay
      });
    } else{                                               //Else => weekly
      this.chartCandlestick.removeSerie(0);
      this.chartCandlestick.addSerie({
        turboThreshold: 0,
        type: 'candlestick',
        name: 'Bitcoin',
        data: this.parsedDataWeek
      });
    }
  }

  parseData(){
    this.parsedDataMinute = new Array();
    this.data.forEach(element => {
      let candlestick = new Candlestick();
      candlestick.x = new Date(element.timeStamp * 1000);
      candlestick.close = element.close;
      candlestick.high = element.high;
      candlestick.open = element.open;
      candlestick.low = element.low;
      this.parsedDataMinute.push(candlestick);
    })
    let counter = 0;
    let totalcount = 0;
    let candlestick = new Candlestick();
    this.parsedDataHour = new Array();
    this.parsedDataMinute.forEach(element => {
      counter ++;
      totalcount ++;
      if(counter == 1){
        candlestick = new Candlestick();
        candlestick.x  = element.x;
        candlestick.open = element.open;
        candlestick.high = element.high;
        candlestick.low = element.low;
      }
      if(element.high > candlestick.high){
        candlestick.high = element.high;
      }
      if(element.low < candlestick.low){
        
        candlestick.low = element.low;
      }
      if(counter == 60 || totalcount == this.parsedDataMinute.length){
        candlestick.close = element.close;
        this.parsedDataHour.push(candlestick);
        counter = 0;
      } 
    });

    counter = 0;
    totalcount = 0;
    candlestick = new Candlestick();
    this.parsedDataDay = new Array();
    this.parsedDataHour.forEach(element => {
      counter ++;
      totalcount ++;
      if(counter == 1){
        candlestick = new Candlestick();
        candlestick.x  = element.x;
        candlestick.open = element.open;
        candlestick.high = element.high;
        candlestick.low = element.low;
      }
      if(element.high > candlestick.high){
        candlestick.high = element.high;
      }
      if(element.low < candlestick.low){
        candlestick.low = element.low;
      }

      if(element.x.getHours() >= 23 || counter == 24 || totalcount == this.parsedDataHour.length ){
        candlestick.close = element.close;
        this.parsedDataDay.push(candlestick);
        counter = 0;
      } 
    });

    counter = 0;
    totalcount = 0;
    candlestick = new Candlestick();
    this.parsedDataWeek = new Array();
    this.parsedDataDay.forEach(element => {
      console.log(element.x);
      counter ++;
      totalcount ++;
      if(counter == 1){
        candlestick = new Candlestick();
        candlestick.x  = element.x;
        candlestick.open = element.open;
        candlestick.high = element.high;
        candlestick.low = element.low;
      }
      if(element.high > candlestick.high){
        candlestick.high = element.high;
      }
      if(element.low < candlestick.low){
        candlestick.low = element.low;
      }
      if(counter == 7 || element.x.getDay() == 6|| totalcount == this.parsedDataHour.length){
        candlestick.close = element.close;
        this.parsedDataWeek.push(candlestick);
        counter = 0;
      } 
    });
    this.chartCandlestick.removeSerie(0);
    this.chartCandlestick.addSerie({
      turboThreshold: 0,
      type: 'candlestick',
      name: 'Bitcoin',
      data: this.parsedDataDay,
    });
  }
  
  createChart(){
    this.chartCandlestick = new Chart(
      {
     chart: {
       type: 'candlestick',
       zoomType: 'x',
       backgroundColor: '#cdcdcd'
     },
     xAxis: {
       title: {
         align: 'middle',
         text: 'Date / Time'
       },
       type: 'datetime',
       lineColor: '#000000',
       lineWidth: 1,
       dateTimeLabelFormats: {
         millisecond: '%H:%M:%S.%L',
         second: '%H:%M:%S',
         minute: '%H:%M',
         hour: '%H:%M',
         day: '%e. %b',
         week: '%e. %b',
         month: '%b \'%y',
       },
       events:{
         setExtremes:(event)=>this.zoom(event)
       }
     },
 
     yAxis: {
       min: null,
       lineColor: '#000000',
       lineWidth: 1,
       title:{
         text: 'Price USD'
       }
     },
 
     
     title: {
       text: 'Bitcoin Candlestick',
     },
 
     credits: {
       enabled: false
     },
 
     legend: {
       enabled: false
     }
    }); 
  }
    

}