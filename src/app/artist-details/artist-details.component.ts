import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ApiRequestsService } from '../services/api-requests.service';
import { ApiGetArtistsResponseModel } from '../services/model/api-get-artists-response.model';
import { ApiGetArtistTracklistResponseModel, ApiTracklist, Album } from '../services/model/api-get-artist-tracklist-response.model';
import { of } from 'rxjs';

@Component({
  selector: 'app-artist-details',
  templateUrl: './artist-details.component.html',
  styleUrls: ['./artist-details.component.scss']
})
export class ArtistDetailsComponent implements OnInit {

  public artist: any;
  public artistTracks: ApiTracklist[] = [];
  public artistAlbums: Album[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiRequestsService: ApiRequestsService,
  ) { }

  ngOnInit() {
    // this.route.paramMap.pipe(
    //   switchMap(params => {
    //     let id = params.get('id')!;
    //     return this.apiRequestsService.getArtistsRequest(id);
    //   })
    // ).subscribe((data) => {
    //   this.artist = data;
    // });

    this.apiRequestsService.getArtistsRequest("210807");
    this.apiRequestsService.getArtists().subscribe((data)=> {
      this.artist = data;
    });

    this.apiRequestsService.getArtistTracklist("210807");
    this.apiRequestsService.getTracklist().subscribe((artistTracklist)=> {
      this.artistTracks = artistTracklist.data;
    });

    this.apiRequestsService.getArtistAlbums().subscribe((albums) => {
      this.artistAlbums = albums;
    });
  }

}
