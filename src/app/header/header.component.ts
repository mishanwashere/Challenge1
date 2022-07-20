import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { ApiRequestsService } from '../services/api-requests.service';

import { debounceTime, filter } from "rxjs/operators";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public searchArtist: string = "";

  public searchArtistBehaviorSubject = new BehaviorSubject<string>("");

  constructor(
    private apiRequestsService: ApiRequestsService,
  ) { }

  ngOnInit(): void {
    this.searchArtistBehaviorSubject.pipe(
      filter(searchValue => searchValue.length > 0),
      debounceTime(800),
    ).subscribe(searchValue => {
      this.apiRequestsService.getArtistRequest(searchValue);
    })
  }
}
