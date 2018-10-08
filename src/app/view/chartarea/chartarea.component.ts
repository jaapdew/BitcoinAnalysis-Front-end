import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { DataService } from 'src/service/data.service';
import { BitcoinDataDto } from 'src/model/BitcoinDataDto';
import { DataPoint } from 'src/model/DataPoint';

@Component({
  selector: 'app-chartarea',
  template: `
    <div [chart]="chartArea"></div>
  `
  
})
export class ChartAreaComponent implements OnInit {
  data: BitcoinDataDto[];
  parsedData: Array<DataPoint>;
  startDateField;
  endDateField;
  chartArea : Chart;


  constructor(private service: DataService) { }

  ngOnInit() {
  }

  getData(){
    this.service.getData(this.startDateField, this.endDateField).subscribe(
      data =>{ this.data = data;
        this.createChart();
      this.parseData();
    })
  }

  parseData(){
    this.parsedData = new Array();
    this.data.forEach(element => {
      let dataPoint = new DataPoint();
      dataPoint.x = new Date(element.timeStamp * 1000);
      dataPoint.y = element.close;
      this.parsedData.push(dataPoint);
       
      })
      this.chartArea.removeSerie(0);
      this.chartArea.addSerie({
        turboThreshold: 0,
        color: 'rgba(255, 230, 190, 1)',
        name: 'Bitcoin',
        data: this.parsedData,
    });
  }

  createChart(){
    this. chartArea = new Chart({
      chart: {
        type: 'area',
        zoomType: 'x',
        backgroundColor: '#cdcdcd'
      },
      xAxis: {
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
        title: {
          align: 'middle',
          text: 'Date / Time'
        }
      },
      yAxis: {
        min: null,
        lineColor: '#000000',
        lineWidth: 1,
        title:{
          text: 'Close price'
        }
      },
      title: {
        text: 'Bitcoin Price',
      },
      credits: {
        enabled: false
      },
      legend: {
        enabled: false
      },
      plotOptions: {
        area: {
          fillColor: 
          {
            linearGradient: {
              x1: 0,
              y1: 0,
              x2: 0,
              y2: 1,
              },
            stops: [
                [0, 'rgba(234, 148, 23, 0.3)'],
                [1, 'rgba(234, 148, 23, 0.7)']
            ]
          },      
      }   
    },
    });
  
  }
  
}