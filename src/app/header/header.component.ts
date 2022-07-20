import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ApiRequestsService } from '../services/api-requests.service';
import { debounceTime } from "rxjs/operators";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public searchArtist: string = "";
  public searchArtistSubject = new Subject<string>();

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
