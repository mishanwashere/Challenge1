import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiRequestsService } from '../services/api-requests.service';
import { ApiTracklist, Album } from '../services/model/api-get-artist-tracklist-response.model';

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
    this.apiRequestsService.getArtists().subscribe((artistDetails) => {
      this.artist = artistDetails;
    })

    this.apiRequestsService.getTracklist().subscribe((artistTracklist) => {
      this.artistTracks = artistTracklist.data;
    })

    this.apiRequestsService.getArtistAlbums().subscribe((artistAlbums) => {
      this.artistAlbums = artistAlbums;
    });

    if (!this.artist || !this.artistTracks || !this.artistAlbums) { // if we don't have the relevant data, request it.
      const id: string = this.route.snapshot.paramMap.get('id')!;
      this.apiRequestsService.getArtistsRequest(id); // /atrist endpoint can accept id and name to this works.
      this.apiRequestsService.getArtistTracklist(id);
    }
  }

}
