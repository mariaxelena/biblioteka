import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { KnjigaService } from 'src/app/services/knjiga.service';
import { KorisnikService } from 'src/app/services/korisnik.service';
import { Knjiga } from 'src/app/shared/models/Knjiga';
import { Korisnik } from 'src/app/shared/models/Korisnik';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  knjige: Knjiga[] = [];
  user!: Korisnik;
  constructor(private knjigaService:KnjigaService, activatedRoute: ActivatedRoute, private korisnikService:KorisnikService) {
    let booksObservable:Observable<Knjiga[]>;
    activatedRoute.params.subscribe((params) => {
      if(params.searchTerm)
      booksObservable = knjigaService.getAllBooksBySearchTerm(params.searchTerm);
      else if(params.genreName)
      booksObservable = knjigaService.getAllBooksByGenre(params.genreName);
      else
      booksObservable = knjigaService.getAll();

      booksObservable.subscribe((serverBooks) => {
        this.knjige = serverBooks;
      })

      korisnikService.korisnikObservable.subscribe((newUser) => {
        this.user = newUser;
      })
    })
  }

  ngOnInit(): void {
  }

  get isAuth(){
    return this.user.token;
  }
}
