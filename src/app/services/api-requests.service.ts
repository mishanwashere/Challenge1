import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, ReplaySubject } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ApiRequestEnum } from './model/api-request.enum';
import { ApiGetArtistsResponseModel } from './model/api-get-artists-response.model';
import { ApiGetArtistTracklistResponseModel, Album } from './model/api-get-artist-tracklist-response.model';


@Injectable({
  providedIn: 'root'
})
export class ApiRequestsService {

  private currentSearchedArtists: ReplaySubject<ApiGetArtistsResponseModel> = new ReplaySubject<ApiGetArtistsResponseModel>(1);
  private currentArtistTracklist: ReplaySubject<ApiGetArtistTracklistResponseModel> = new ReplaySubject<ApiGetArtistTracklistResponseModel>(1);

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

    this.http.get<ApiGetArtistsResponseModel>(ApiRequestEnum.ProxyUrl + ApiRequestEnum.ApiUrl + "artist/" + searchValue).subscribe((responseData: ApiGetArtistsResponseModel) => { // Could probably clean up this built up URL.
      if (responseData?.error?.code == 800) { // API doesn't return a 404 not found. Rudimentary error handling for no API response data.
        this.errorCounter++;
        return;
      }

      this.errorCounter = 0;
      this.circuitStatus = "Closed";
      this.setArists(responseData); // call setter.
    });
  }

  public getArtists(): Observable<ApiGetArtistsResponseModel> { // getter.
    return this.currentSearchedArtists.asObservable(); // returns observable.
  }

  private setArists(responseData: ApiGetArtistsResponseModel): void { // setter.
    this.currentSearchedArtists.next(responseData); // update subject
  }

  public getArtistTracklist(id: string) {
    // TODO refactor circuit breaker pattern to include this.
    this.http.get<ApiGetArtistTracklistResponseModel>(ApiRequestEnum.ProxyUrl + ApiRequestEnum.ApiUrl + "artist/" + id + "/top?limit=50").subscribe((responseData: ApiGetArtistTracklistResponseModel) => { // Could probably clean up this built up URL.
      this.setTracklist(responseData);
    });
  }

  public getTracklist(): Observable<ApiGetArtistTracklistResponseModel> { // getter.
    return this.currentArtistTracklist.asObservable(); // returns observable.
  }

  private setTracklist(responseData: ApiGetArtistTracklistResponseModel): void { // setter.
    this.currentArtistTracklist.next(responseData); // update subject
  }

  public getArtistAlbums(): Observable<Album[]> {
    return this.currentArtistTracklist.pipe(
      mergeMap(artistTracklist => { 
        let artistAlbums: Album[] = [];
        
        for (let i = 0; i < artistTracklist.total; i++) {
          artistAlbums.push(artistTracklist.data[i].album)
        }
        
        return of(artistAlbums);
      })
    );
  }
}