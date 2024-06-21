import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ChartData, ChartOptions } from 'chart.js';
import { APIService } from '../services/api.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  chartsLoaded:boolean = false;
  brands:any[] = [] 
  productTypes:any[] = [] 
  products:any[] = [] 
  groupedProducts: { [brandName: string]: { [productType: string]: any[] } } = {};
  constructor(private apiService: APIService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.GenerateProductReport()
    console.log(this.brands)
    console.log(this.productTypes)
    console.log(this.products)
    console.log(this.groupedProducts)

  }

  // Brand Chart
  brandData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      { data: [], label:'Brands', backgroundColor: '#90E0EF' },
    ],
  };

  brandChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      x: { 
        position: 'bottom',
        grid: {
          display: false
        }
      },
      y: { 
        ticks: {
          stepSize: 1
        },
        grid: {
          display: false
        }
      }
    },
    plugins: {
      title: {
        display: true,
        text: 'Product Count by Brands',
      },
    },
  };

  // Product Type Chart
  productTypeData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      { data: [], label: 'Product Types', backgroundColor: '#00B4D8' },
    ],
  };

  productTypeChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      x: { 
        grid: {
          display: false 
        }
      },
      y: { 
        ticks: {
          stepSize: 1
        },
        grid: {
          display: false
        }
      }
    },
    plugins: {
      title: {
        display: true,
        text: 'Product Count by Product Type',
      },
    },
  };


  GenerateProductReport()
  {
    this.apiService.GenerateProductReport().subscribe(result => {
      let brandData:any[] = result[0]
      let productTypeData:any[] = result[1]
      let productList:any[] = result[2]
      let brandProductTypesData:any[]= result[3]

      brandData.forEach((element) => {
        this.brandData.labels?.push(element.key)
        this.brandData.datasets[0].data.push(element.productCount)
        this.brands.push(element)
      });

      productTypeData.forEach((element) => {
        this.productTypeData.labels?.push(element.key)
        this.productTypeData.datasets[0].data.push(element.productCount)
        this.productTypes.push(element)
      });
    
      productList.forEach((element) => {
        this.products.push(element)
      });

      this.chartsLoaded = true;
      this.groupProducts()
    }, (response: HttpErrorResponse) => {
        if (response.status === 500){
          this.snackBar.open(response.error, 'X', {duration: 5000});
        }
    })
  }

  groupProducts() {
    for (const product of this.products) {
     
      if (!this.groupedProducts[product.brandName]) {
        this.groupedProducts[product.brandName] = {};
      }
      if (!this.groupedProducts[product.brandName][product.productTypeName]) {
        this.groupedProducts[product.brandName][product.productTypeName] = [];
      }
      this.groupedProducts[product.brandName][product.productTypeName].push(product);
    }
  }

}
