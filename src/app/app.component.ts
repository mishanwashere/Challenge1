import { Component, OnInit } from '@angular/core';
import { ApiRequestsService } from './services/api-requests.service'; 

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'musicdb-app-angular';

  constructor(
    private apiRequestsService: ApiRequestsService,
  ) {
  }

  ngOnInit(): void {
    this.apiRequestsService.getArtist().subscribe((data) => {
      console.log("Hello", data);
    });
  }
}
