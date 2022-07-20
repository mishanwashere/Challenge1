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
  public mobile: boolean = false;

  constructor(
    private apiRequestsService: ApiRequestsService,
  ) { }

  ngOnInit(): void {
    if (window.screen.width <= 768) { // 768px portrait
      this.mobile = true;
    }

    this.apiRequestsService.getArtists().subscribe((artists: ApiResponseModel) => {
      this.foundArtists = [];
      this.foundArtists.push(artists);
    });
  }
}
