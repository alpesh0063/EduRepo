import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ApiService} from "../service/api.service";
import { HostListener } from '@angular/core';
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  addForm: FormGroup;
  submitted:boolean=false;

  @HostListener('window:popstate', ['$event'])
  //event listener for browser back button press
  onPopState(event:any) {
    alert('Back button pressed');
  }
  constructor(private formBuilder: FormBuilder,private router: Router, private apiService: ApiService) {
    //added validation as per requirement
    this.addForm = this.formBuilder.group({
      id: [],
      name: ['', Validators.required],
      age: ['', Validators.required],
      dob: ['', Validators.required],
      profession: ['', Validators.required],
      locality: ['', Validators.required],      
      noOfGuest: ['', [Validators.required,Validators.min(0),Validators.max(2)]],
      address: ['', Validators.required,Validators.maxLength(50)]
    });
   }

  ngOnInit() {
  }

  onSubmit() {
    this.submitted=true;
    if (this.addForm.valid){
      this.apiService.createUser(this.addForm.value)
      .subscribe( data => {
        this.router.navigate(['users']);
      });
    }
  }
}
