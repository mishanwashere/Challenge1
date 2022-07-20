import { Component, OnInit } from '@angular/core';
import { ApiRequestsService } from '../services/api-requests.service';
import { ApiResponseModel } from '../services/model/api-response.model';

@Component({
  selector: 'app-found-artist-cards',
  templateUrl: './found-artist-cards.component.html',
  styleUrls: ['./found-artist-cards.component.scss']
})
export class FoundArtistCardsComponent implements OnInit {

  public foundArtists: ApiResponseModel[] = [];

  constructor(
    private apiRequestsService: ApiRequestsService,
  ) { }

  ngOnInit(): void {
    this.apiRequestsService.getArtists().subscribe((artists: ApiResponseModel) => {
      this.foundArtists.push(artists);
    });
  }
}
