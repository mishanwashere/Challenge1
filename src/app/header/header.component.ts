import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiRequestsService } from '../services/api-requests.service';
import { debounceTime } from "rxjs/operators";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public searchArtist: string = "";
  public searchArtistBehaviorSubject = new BehaviorSubject<string>("");

  private previousSearchValue: string = "";

  constructor(
    private apiRequestsService: ApiRequestsService,
  ) { }

  ngOnInit(): void {
    this.searchArtistBehaviorSubject.pipe(
      debounceTime(800),
    ).subscribe(searchValue => {
      if (searchValue === "" || this.previousSearchValue === searchValue) {
        return;
      }

      this.previousSearchValue = searchValue;

      this.apiRequestsService.getArtistRequest(searchValue);
    })
  }
}
