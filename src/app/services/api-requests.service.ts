import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';

import { ApiRequestEnum } from './model/api-request.enum';
import { ApiResponseModel } from './model/api-response.model';

@Injectable({
  providedIn: 'root'
})
export class ApiRequestsService {

  private currentSearchedArtists: Subject<ApiResponseModel> = new Subject<ApiResponseModel>();
  private errorCounter: number = 0;
  private circuitStatus: string = "Closed";

  constructor(
    private http: HttpClient,
  ) { }

  public getArtistsRequest(searchValue: string): void {
    // Rudimentary Circuit Breaker Pattern.
    if (this.circuitStatus === "Open") {
      return;
    }

    if (this.errorCounter >= 2) {
      this.circuitStatus = "Open";

      console.error("Open circuit! API failed 3 times. Timeout for 15 seconds.");
      setTimeout(() => {
        this.errorCounter = 0;
        this.circuitStatus = "Closed";
        console.info("Closed Circuit! Retrying.");
      }, 15000);
    }
    // END

    this.http.get<ApiResponseModel>(ApiRequestEnum.ProxyUrl + ApiRequestEnum.ApiUrl + "artist/" + searchValue).subscribe((responseData: ApiResponseModel) => { // Could probably clean up this built up URL.
      if (responseData?.error?.code == 800) { // API doesn't return a 404 not found. Rudimentary error handling for no API response data.
        this.errorCounter++;
        return;
      }

      this.errorCounter = 0;
      this.circuitStatus = "Closed";
      this.setArists(responseData); // call setter.
    });
  }

  public getArtists(): Observable<ApiResponseModel> { // getter.
    return this.currentSearchedArtists.asObservable(); // returns observable.
  }

  private setArists(responseData: ApiResponseModel): void { // setter.
    this.currentSearchedArtists.next(responseData); // update subject
  }
}