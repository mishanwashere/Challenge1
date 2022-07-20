import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';

import { ApiRequestEnum } from './model/api-request.enum';
import { ApiResponseModel } from './model/api-response.model';

@Injectable({
  providedIn: 'root'
})
export class ApiRequestsService {

  private currentSearchedArtists: Subject<ApiResponseModel> = new Subject<ApiResponseModel>();

  constructor(
    private http: HttpClient,
  ) { }

  getArtistsRequest(searchValue: string) {
    const proxyUrl = ApiRequestEnum.ProxyUrl;
    const apiUrl = ApiRequestEnum.ApiUrl;

    this.http.get<ApiResponseModel>(proxyUrl + apiUrl + "artist/" + searchValue).subscribe((responseData: ApiResponseModel) => { // Could probably clean up this built up URL.
      this.setArists(responseData); // call setter.
    });
  }

  getArtists(): Observable<ApiResponseModel> { // getter.
    return this.currentSearchedArtists.asObservable(); // returns observable.
  }

  setArists(responseData: ApiResponseModel): void { // setter.
    this.currentSearchedArtists.next(responseData); // update subject
  }
}