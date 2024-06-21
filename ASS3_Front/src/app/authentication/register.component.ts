import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { APIService } from '../services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerFormGroup: FormGroup = this.fb.group({
    emailaddress: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(16)]],
  })

  constructor(private router: Router, private apiService: APIService, private fb: FormBuilder, private snackBar: MatSnackBar) { 

    
  }

  ngOnInit(): void {
  }

  RegisterUser(){

    if(this.registerFormGroup.valid)
    {
        this.apiService.RegisterUser(this.registerFormGroup.value).subscribe(() => {
        this.registerFormGroup.reset();
        this.router.navigate(['']).then((navigated: boolean) => {
          if(navigated) {
            this.snackBar.open(`Registered successfully`, 'X', {duration: 5000});
          }
       });
      })
    }
  }

}
