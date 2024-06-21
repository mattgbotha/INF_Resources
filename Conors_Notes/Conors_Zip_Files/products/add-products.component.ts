import { Component, OnInit } from '@angular/core';
import { APIService } from '../services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Brands } from '../shared/brands';
import { ProductTypes } from '../shared/product-types';


@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.scss']
})
export class AddProductsComponent implements OnInit {
   formData = new FormData();
   brandsData:Brands[]=[]
   productTypesData:ProductTypes[]=[]
   fileNameUploaded = ''

  productForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    file: ['', Validators.required],
    price: ['', Validators.required],
    brand: [null, Validators.required],
    producttype: [null, Validators.required],
    description: ['', Validators.required]
  })

  constructor(private apiService: APIService, private fb: FormBuilder, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.GetBrands()
    this.GetProductTypes()
  }

GetBrands(){
  this.apiService.getBrands().subscribe(result => {
    let brandList:any[] = result
    brandList.forEach((element) => {
      this.brandsData.push(element)
    });
  });
}

GetProductTypes(){
   this.apiService.getProductTypes().subscribe(result => {
    let productTypeList:any[] = result
    productTypeList.forEach((element) => {
      this.productTypesData.push(element)
    });
  });
}

  uploadFile = (files: any) => {
    let fileToUpload = <File>files[0];
    this.formData.append('file', fileToUpload, fileToUpload.name);
    this.fileNameUploaded = fileToUpload.name
  }

  onSubmit() {
    if(this.productForm.valid)
    {
      this.formData.append('name', this.productForm.get('name')!.value);
      this.formData.append('price', this.productForm.get('price')!.value);
      this.formData.append('description', this.productForm.get('description')!.value);
      this.formData.append('brand', this.productForm.get('brand')!.value);
      this.formData.append('producttype', this.productForm.get('producttype')!.value);
      
      this.apiService.addProduct(this.formData).subscribe(() => {
        this.clearData()
        this.router.navigateByUrl('productListing').then((navigated: boolean) => {
          if(navigated) {
            this.snackBar.open(this.productForm.get('name')!.value + ` created successfully`, 'X', {duration: 5000});
          }
       });
      });
    }
  }

  clearData(){
    this.formData.delete("file");
    this.formData.delete("name");
    this.formData.delete("price");
    this.formData.delete("description");
    this.formData.delete("brand");
    this.formData.delete("producttype");
  }

}
