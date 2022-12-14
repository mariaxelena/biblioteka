import { Component, OnInit } from '@angular/core';
import { KorisnikService } from 'src/app/services/korisnik.service';
import { ZaduzenjeService } from 'src/app/services/zaduzenje.service';
import { Korisnik } from 'src/app/shared/models/Korisnik';
import { Zaduzenje } from 'src/app/shared/models/Zaduzenje';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  brojKnjiga: Number;
  user!: Korisnik;
  constructor(private korisnikService:KorisnikService, private zaduzenjeService: ZaduzenjeService) {
    korisnikService.korisnikObservable.subscribe((newUser) => {
      this.user = newUser;
    })

    this.brojKnjiga=zaduzenjeService.getZaduzenjeFromLocalStorage().broj;

   }

  ngOnInit(): void {
  }

  logout(){
    this.korisnikService.logout();
  }

  get isAuth(){
    return this.user.token;
  }
}
