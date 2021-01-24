import { Component } from "@angular/core";
import { DataSvcService } from "./data-svc.service";
// import { Config } from 'protractor';

@Component({
  selector: "app-root",
  providers: [DataSvcService],
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  courses: any;
  apiAllData: any;
  allAPValueIData: any;
  Years: any = [];
  uniqueYears: any = [];
  launchSuccess: any;
  spinner: any = false;

  // (2) Inject
  constructor(private courseService: DataSvcService) {
    this.courses = [];
    this.spinner = false;
  }

  ngOnInit() {
    // (3) Subscribe
    this.courseService.getConfig().subscribe((data: any) => {
      this.courses = data;
      this.apiAllData = data;
      this.spinner = true;
      for (let i = 0; i < data.length; i++) {
        this.Years.push(data[i].launch_year);
      }
      const uniqueYearsSet = new Set(this.Years);
      this.uniqueYears = [...uniqueYearsSet];
      console.table(this.uniqueYears);
    });
  }
  storeYear: any;

  getDataByYear(index: any) {
    this.courseService.successfulLaunch().subscribe((data: any) => {
      this.courses = data;
    });
    this.spinner = true;
    this.apiAllData = this.courses.filter(function(courses: any) {
      return courses.launch_year == index;
    });
  }
  launchFail: any;

  successfulLaunch() {
    this.apiAllData = "";
    this.courseService.successfulLaunch().subscribe((data: any) => {
      this.courses = data;
    });
    this.spinner = true;
    this.launchSuccess = this.courses.filter(function(courses: any) {
      return courses.launch_success == true;
    });
  }

  unsuccessfulLaunch() {
    this.apiAllData = "";
    this.launchSuccess = "";
    this.launchFail = "";
    this.courseService.successfulLaunch().subscribe((data: any) => {
      this.courses = data;
    });
    this.spinner = true;
    this.launchFail = this.courses.filter(function(courses: any) {
      return courses.launch_success == false;
    });
  }
  successfulLandValue: any;

  successfulLand() {
    this.apiAllData = "";
    this.launchSuccess = "";
    this.launchFail = "";
    this.courseService.successfulLand().subscribe((data: any) => {
      this.courses = data;
    });
    this.spinner = true;
    this.successfulLandValue = this.courses.filter(function(courses: any) {
      return courses.rocket.first_stage.cores[0].land_success == true;
    });
  }
  unsuccessfulLandValue: any;

  unsuccessfulLand() {
    this.successfulLandValue = "";
    this.apiAllData = "";
    this.launchSuccess = "";
    this.launchFail = "";
    this.courseService.unsuccessfulLand().subscribe((data: any) => {
      this.courses = data;
      this.allAPValueIData = data;
    });
    this.spinner = true;
    this.unsuccessfulLandValue = this.courses.filter(function(courses: any) {
      return courses.rocket.first_stage.cores[0].land_success == false;
    });
  }

  onChangeMultipleData(event: any, index: any) {}
}
