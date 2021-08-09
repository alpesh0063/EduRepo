import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../model/user.model';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[]=[];
  filteredUsers:User[]=[];
  formGroup: FormGroup;
  constructor(private router: Router, private apiService: ApiService,private formBuilder: FormBuilder) {
    this.formGroup = formBuilder.group({ filter: [''] });
   }
  
  ngOnInit(): void {
    this.apiService.getUsers()
      .subscribe(data => {
        this.users = data;
        this.filteredUsers = data;
      });
  }

  addUser(): void {
    this.router.navigate(['add']);
  };
  getUserDetails(id:any){
    this.router.navigate(['user',id]);
  }
  filter(event:any){
    let temp=event.target.value.trim().toLowerCase();
    
    this.filteredUsers=this.users.filter(x=>x.name?.toLowerCase().includes(temp)||x.locality?.toLowerCase().includes(temp))
  }

}
