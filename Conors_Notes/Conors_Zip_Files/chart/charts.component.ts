import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart,registerables } from 'node_modules/chart.js';
import { RegionService } from '../service/region.service';
import { RegionModel } from '../service/Models/regionsModel';


Chart.register(...registerables);

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})

export class ChartsComponent implements OnInit{

  data: any;
  @ViewChild('myTemp')
  myTempRef!: ElementRef;

 
  constructor(private regionService : RegionService) {}
  
  ngOnInit(): void {
    this.regionService.getRegions().subscribe(response => {
      let regionList = response;

      this.data = response.$values;
      
      this.populateChartData(this.data);
      console.log('data',regionList)
      return regionList
    });
  }

  populateChartData(data: RegionModel[]) {
    
    let labelsData: string [] = [];
    let labelsPopulation: number [] = [];
    
    data.forEach((element: any) => {
      labelsData.push(element.code);
      labelsPopulation.push(element.population)
    });


    new Chart("barchart", {
      type: 'bar',
      data: {
        labels: labelsData,
        datasets: [{
          label: '# of Population',
          data: labelsPopulation,
          borderWidth: 1
        }]
      },
      
      options: {
        scales: {
          y: {
            beginAtZero: true
          },
        }
      
      }
    });
    

    new Chart("piechart", {
      type: 'pie',
      data: {
        labels: labelsData,
        datasets: [{
          label: '# of Population',
          data: labelsPopulation,
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    new Chart("dochart", {
      type: 'doughnut',
      data: {
        labels: labelsData,
        datasets: [{
          label: '# of Population',
          data: labelsPopulation,
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    new Chart("pochart", {
      type: 'polarArea',
      data: {
        labels: labelsData,
        datasets: [{
          label: '# of Population',
          data: labelsPopulation,
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    new Chart("rochart", {
      type: 'radar',
      data: {
        labels: labelsData,
        datasets: [{
          label: '# of Population',
          data: labelsPopulation,
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    new Chart("linechart", {
      type: 'line',
      data: {
        labels: labelsData,
        datasets: [{
          label: '# of Population',
          data: labelsPopulation,
          borderWidth: 1
          
        }]
        
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    new Chart("bubchart", {
      type: 'bubble',
      data: {
        labels: labelsData,
        datasets: [{
          label: '# of Population',
          data: labelsPopulation,
          borderWidth: 1
          
        }]
        
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

  }
  
}