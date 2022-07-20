import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ApiRequestEnum } from './model/api-request.enum';
import { ApiResponseModel } from './model/api-response.model';

@Injectable({
  providedIn: 'root'
})
export class ApiRequestsService {

  private currentSearchedArtists: ApiResponseModel[] = [];

  constructor(
    private http: HttpClient,
  ) { }

  getArtistRequest(searchValue: string) {
    const proxyUrl = ApiRequestEnum.ProxyUrl;
    const apiUrl = ApiRequestEnum.ApiUrl;

    this.http.get<ApiResponseModel>(proxyUrl + apiUrl + "artist/" + searchValue).subscribe(responseData => {
      this.currentSearchedArtists.push(responseData);
    });
  }
}