import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { APIService } from '../services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginFormGroup: FormGroup = this.fb.group({
    emailaddress: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  })

  isLoading:boolean = false

  constructor(private router: Router, private apiService: APIService, private fb: FormBuilder, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  async LoginUser(){
    if(this.loginFormGroup.valid)
    {
      this.isLoading = true

      await this.apiService.LoginUser(this.loginFormGroup.value).subscribe(result => {
        localStorage.setItem('User', JSON.stringify(result))
        this.loginFormGroup.reset();
        this.router.navigateByUrl('productListing');
      })
    }
  }

}
