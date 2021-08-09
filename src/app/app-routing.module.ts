import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserComponent } from './add-user/add-user.component';
import { ReportComponent } from './report/report.component';
import { UserComponent } from './user/user.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  { path: 'add', component: AddUserComponent },
  { path: 'users', component: UsersComponent },
  { path: 'user/:id', component: UserComponent },
  { path: 'report', component: ReportComponent },
  { path: '', redirectTo: 'users', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
