import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { KnjigaService } from 'src/app/services/knjiga.service';
import { KorisnikService } from 'src/app/services/korisnik.service';
import { ZaduzenjeService } from 'src/app/services/zaduzenje.service';
import { Knjiga } from 'src/app/shared/models/Knjiga';
import { Korisnik } from 'src/app/shared/models/Korisnik';
import { Zaduzenje } from 'src/app/shared/models/Zaduzenje';

@Component({
  selector: 'app-book-page',
  templateUrl: './book-page.component.html',
  styleUrls: ['./book-page.component.css']
})
export class BookPageComponent implements OnInit {

  book: Knjiga;
  user!: Korisnik;
  zaduzenje: Zaduzenje = new Zaduzenje();

  constructor(activatedRoute:ActivatedRoute, knjigaService:KnjigaService,
    private korisnikService: KorisnikService, private router:Router,
    private zaduzenjeService: ZaduzenjeService, private toastrService: ToastrService) {
    activatedRoute.params.subscribe((params) => {
      if(params.id)
      knjigaService.getBookById(params.id).subscribe(serverBook => {
        this.book = serverBook;
      });
    })
    korisnikService.korisnikObservable.subscribe((newUser) => {
      this.user = newUser;
    })
    this.zaduzenje = zaduzenjeService.getZaduzenjeFromLocalStorage();
  }

  ngOnInit(): void {
  }

  addToMyBooks(){
    if(!this.isAuth) {
      this.toastrService.warning('Morate se prijaviti da biste zadužili knjigu!', 'Niste prijavljeni');
      return;
    } else {
      this.zaduzenjeService.zaduziKnjigu(this.book).subscribe({
        next:() => {
          this.zaduzenjeService.setZaduzenjeToLocalStorage();
          this.router.navigateByUrl('/moje-knjige');
        },
        error:(errorResponse) => {
          this.toastrService.error(errorResponse.error, 'Neuspešno zaduženje');
        }
      })
    }
  }

  get isAuth(){
    return this.user.token;
  }
}
