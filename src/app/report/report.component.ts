import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EChartsOption } from 'echarts';
import { User } from '../model/user.model';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  agesCountsChartOption: EChartsOption={};
  localitiesCountsChartOption: EChartsOption={};
  professionCountsChartOption: EChartsOption={};
  guestCountsChartOption: EChartsOption={};
  users: User[]=[];
  constructor(private router: Router, private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getUsers()
      .subscribe(data => {
        this.users = data;
        const agesCounts:any={};
        const localitiesCounts:any={};
        const professionCounts:any={};
        const guestCounts:any={};
        //logic to group object based on field
        for (let i = 0; i < this.users.length; i++) {
          if(this.users[i].age!=undefined)
          {
            agesCounts[Number(this.users[i].age)] = 1 + (agesCounts[Number(this.users[i].age)] || 0);
            localitiesCounts[String(this.users[i].locality)] = 1 + (localitiesCounts[String(this.users[i].locality)] || 0);
            professionCounts[String(this.users[i].profession)] = 1 + (professionCounts[String(this.users[i].profession)] || 0);
            guestCounts[Number(this.users[i].noOfGuest)] = 1 + (guestCounts[Number(this.users[i].noOfGuest)] || 0);
          }
        }
        //setting chart option for each of the chart
        this.agesCountsChartOption  = {
          xAxis: {
            type: 'category',
            data: Object.keys(agesCounts),
          },
          yAxis: {
            type: 'value',
            name: 'Distribution of users by age',
            splitNumber:1,
            nameLocation: 'middle',
          },
          series: [
            {
              data: Object.entries(agesCounts),
              type: 'bar',
            },
          ],
        };
        this.localitiesCountsChartOption  = {
          xAxis: {
            type: 'category',
            data: Object.keys(localitiesCounts),
          },
          yAxis: {
            type: 'value',
            name: 'Distribution of users by Locality',
            splitNumber:1,
            nameLocation: 'middle',
          },
          series: [
            {
              data: Object.entries(localitiesCounts),
              type: 'bar',
            },
          ],
        };
        this.guestCountsChartOption  = {
          xAxis: {
            type: 'category',
            data: Object.keys(guestCounts),
          },
          yAxis: {
            type: 'value',
            name: 'Distribution of users by Guest Count',
            splitNumber:1,
            nameLocation: 'middle',
          },
          series: [
            {
              data: Object.entries(guestCounts),
              type: 'bar',
            },
          ],
        };
        this.professionCountsChartOption  = {
          xAxis: {
            type: 'category',
            data: Object.keys(professionCounts),
          },
          yAxis: {
            type: 'value',
            name: 'Distribution of users by Profession',
            splitNumber:1,
            nameLocation: 'middle',
          },
          series: [
            {
              data: Object.entries(professionCounts),
              type: 'bar',
            },
          ],
        };
      });
  }

}
