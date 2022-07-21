import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FoundArtistCardsComponent } from './found-artist-cards/found-artist-cards.component';
import { ArtistDetailsComponent } from './artist-details/artist-details.component';

const routes: Routes = [
  { path: '', redirectTo: '/found-artists', pathMatch: 'full' },
  { path: 'found-artists', component: FoundArtistCardsComponent },
  { path: 'artist-details/:id', component: ArtistDetailsComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
