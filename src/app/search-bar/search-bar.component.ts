import { Component, OnInit } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { ApiRequestsService } from '../services/api-requests.service';
import { debounceTime } from "rxjs/operators";

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  public searchArtist: string = "";
  public searchArtistSubject = new ReplaySubject<string>(1);

  private previousSearchValue: string = "";

  constructor(
    private apiRequestsService: ApiRequestsService,
  ) { }

  ngOnInit(): void {
    this.searchArtistSubject.pipe(
      debounceTime(800),
    ).subscribe(searchValue => {
      if (searchValue === "" || this.previousSearchValue === searchValue) { // Prevent empty string requests OR if the previous search equals the current search request.
        return;
      }

      this.previousSearchValue = searchValue;

      this.apiRequestsService.getArtistsRequest(searchValue); // API request.
    })
  }
}
