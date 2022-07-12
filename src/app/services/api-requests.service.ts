import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiRequestsService {

  constructor(
    private http: HttpClient,
  ) { }

  getArtist() {
    const proxyUrl = "http://cors-anywhere.herokuapp.com/";
    const apiUrl = "https://api.deezer.com/";

    return this.http.get(proxyUrl + apiUrl + "artist/eminem");
  }
}
