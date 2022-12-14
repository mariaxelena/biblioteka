import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { KnjigaService } from 'src/app/services/knjiga.service';
import { KorisnikService } from 'src/app/services/korisnik.service';
import { ZaduzenjeService } from 'src/app/services/zaduzenje.service';
import { Korisnik } from 'src/app/shared/models/Korisnik';
import { Zaduzenje } from 'src/app/shared/models/Zaduzenje';

@Component({
  selector: 'app-my-books-page',
  templateUrl: './my-books-page.component.html',
  styleUrls: ['./my-books-page.component.css']
})
export class MyBooksPageComponent implements OnInit {

  message: string[]=['','',''];
  user!: Korisnik;
  zaduzenje: Zaduzenje = new Zaduzenje();

  constructor(private zaduzenjeService: ZaduzenjeService, private korisnikService: KorisnikService, public knjigaService: KnjigaService, private router: Router) {
    korisnikService.korisnikObservable.subscribe((newUser) => {
      this.user = newUser;
    })
    this.zaduzenje = zaduzenjeService.getZaduzenjeFromLocalStorage();
  }

  ngOnInit(): void {
  }


  returnBook(bookId: string){
    this.zaduzenjeService.vratiKnjigu(bookId);
    this.message=['','',''];
  }

  postponeBook(bookId: string, index:number){
    //let response = this.zaduzenjeService.postponeBook(bookId);
    //if (response == -1) this.message[index]='Ne možete ponovo da produžite rok!';
  }

  get isAuth(){
    return this.user.token;
  }

}
