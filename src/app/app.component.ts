import { Component, ViewChild, ViewChildren, QueryList } from "@angular/core";
import { DataSvcService } from "./data-svc.service";
import { Location } from "@angular/common";
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
  selectedYear = -1;
  // (2) Inject
  constructor(
    private courseService: DataSvcService,
    private location: Location
  ) {
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
  filters: any = {
    year: -1,
    isLaunched: -1,
    isLanded: -1
  };

  getData(filter: number, filterType: string) {
    switch (filterType) {
      case "year":
        if (this.filters.year === -1 || this.filters.year !== filter) {
          this.filters.year = filter;
        } else {
          this.filters.year = -1;
        }
        break;
      case "isLaunched":
        if (this.filters.isLaunched === -1) {
          this.filters.isLaunched = filter;
        } else {
          this.filters.isLaunched = -1;
        }
        break;
      case "isLanded":
        if (this.filters.isLanded === -1) {
          this.filters.isLanded = filter;
        } else {
          this.filters.isLanded = -1;
        }
        break;
    }
    //  this.courseService.unsuccessfulLand().subscribe((data:any) => {
    this.courses = this.apiAllData
      .filter((courses: any) => {
        // let appliedFilter = true;
        if (this.filters.year != -1) {
          return courses.launch_year == this.filters.year;
        }
        return true;
      })
      .filter((courses: any) => {
        if (this.filters.isLaunched !== -1) {
          if (this.filters.isLaunched == 0) {
            return courses.launch_success == true;
          } else {
            return courses.launch_success == false;
          }
        }
        return true;
      })
      .filter((courses: any) => {
        if (this.filters.isLanded !== -1) {
          if (this.filters.isLanded == 0) {
            return courses.rocket.first_stage.cores[0].land_success == true;
          } else {
            return courses.rocket.first_stage.cores[0].land_success == false;
          }
        }
        return true;
      });
    // });
    this.spinner = true;
    // this.apiAllData = this.courses.filter(function(courses:any){
    //   return courses.launch_year == index;
    // });
  }
  launchFail: any;
  checked: any = false;

  successfulLaunch(event: any) {
    this.checked = !this.checked;
    this.location.replaceState("/success#Launch");
    this.apiAllData = "";
    this.courseService.successfulLaunch().subscribe((data: any) => {
      this.courses = data;
    });
    this.spinner = true;
    this.launchSuccess = this.courses.filter((courses: any) => {
      return (
        courses.launch_success == true &&
        courses.launch_year == this.selectedYear
      );
    });
  }

  unsuccessfulLaunch() {
    this.location.replaceState("/Failed#Launch");
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
    this.location.replaceState("/success#Land");
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
    this.location.replaceState("/Failed#Land");
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

  abc(event: any) {
    let abc;
  }
}
