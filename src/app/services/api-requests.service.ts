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

  getArtistRequest(searchValue: string) {
    const proxyUrl = ApiRequestEnum.ProxyUrl;
    const apiUrl = ApiRequestEnum.ApiUrl;

    this.http.get<ApiResponseModel>(proxyUrl + apiUrl + "artist/" + searchValue).subscribe((responseData: ApiResponseModel) => {
      this.setArists(responseData);
    });
  }

  getArtists(): Observable<ApiResponseModel> {
    return this.currentSearchedArtists.asObservable();
  }

  setArists(responseData: ApiResponseModel): void {
    this.currentSearchedArtists.next(responseData);
  }
}