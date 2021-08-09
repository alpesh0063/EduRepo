import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../model/user.model';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user?:User;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService ) { }

  ngOnInit(): void {
    const userId = (this.route.snapshot.paramMap.get('id'));
    this.apiService.getUsers()
      .subscribe(data => {
        this.user = data.find(x=>x.id?.toString()===userId);
      });
  }
  backToList(){
    this.router.navigate(['users']);
  }

}
