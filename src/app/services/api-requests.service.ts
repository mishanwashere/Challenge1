import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiRequestsService {

  private currentSearchedArtists: any = null;

  constructor(
    private http: HttpClient,
  ) { }

  getArtistRequest(searchValue: string) {
    const proxyUrl = "http://cors-anywhere.herokuapp.com/";
    const apiUrl = "https://api.deezer.com/";

    this.http.get(proxyUrl + apiUrl + "artist/" + searchValue).subscribe(responseData => {
      this.currentSearchedArtists = responseData;
    });
  }
}