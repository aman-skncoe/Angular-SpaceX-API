import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
@Injectable()
export class DataSvcService {
  constructor(private httpClient: HttpClient) {}
  configUrl = "https://api.spacexdata.com/v3/launches?limit=100";

  getConfig() {
    return this.httpClient.get(this.configUrl);
  }

  successfulLaunch() {
    let apiURL =
      "https://api.spacexdata.com/v3/launches?limit=100&amp;launch_success=true";
    return this.httpClient.get(apiURL);
  }

  successfulLand() {
    let apiURL =
      "https://api.spacexdata.com/v3/launches?limit=100&amp;launch_success=true&amp;land_success=true";
    return this.httpClient.get(apiURL);
  }
  unsuccessfulLand() {
    let apiURL =
      "https://api.spacexdata.com/v3/launches?limit=100&amp;launch_success=true&amp;land_success=true&amp;launch_year=2014";
    return this.httpClient.get(apiURL);
  }
}
