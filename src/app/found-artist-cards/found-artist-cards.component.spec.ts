import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoundArtistCardsComponent } from './found-artist-cards.component';

describe('FoundArtistCardsComponent', () => {
  let component: FoundArtistCardsComponent;
  let fixture: ComponentFixture<FoundArtistCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoundArtistCardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FoundArtistCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
