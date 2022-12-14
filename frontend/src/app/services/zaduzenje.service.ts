import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Zaduzenje } from '../shared/models/Zaduzenje';
import { ZaduzenaKnjiga } from '../shared/models/ZaduzenaKnjiga';
import { Knjiga } from '../shared/models/Knjiga';
import { HttpClient } from '@angular/common/http';
import { VRATI_KNJIGU_URL, ZADUZENJA_ZA_TRENUTNOG_KORISNIKA_URL, ZADUZI_KNJIGU_URL } from '../shared/constants/urls';

@Injectable({
  providedIn: 'root'
})
export class ZaduzenjeService {

  constructor(private http: HttpClient) {
  }

  zaduziKnjigu(knjiga:Knjiga):Observable<Zaduzenje>{
    return this.http.post<Zaduzenje>(ZADUZI_KNJIGU_URL, knjiga);
  }

  getZaduzenjaZaTrenutnogKorisnika():Observable<Zaduzenje>{
    return this.http.get<Zaduzenje>(ZADUZENJA_ZA_TRENUTNOG_KORISNIKA_URL);
  }

  vratiKnjigu(knjigaId:string):Observable<string>{
    return this.http.post<string>(VRATI_KNJIGU_URL,knjigaId);
  }

  setZaduzenjeToLocalStorage(): void {
    const zaduzenjeJson = JSON.stringify(this.getZaduzenjaZaTrenutnogKorisnika());
    localStorage.setItem('Zaduzenje', zaduzenjeJson);
  }

  getZaduzenjeFromLocalStorage(): Zaduzenje {
    const zaduzenjeJson = localStorage.getItem('Zaduzenje');
    return zaduzenjeJson ? JSON.parse(zaduzenjeJson) : new Zaduzenje();
  }

  /*
  addToMyBooks(book: Knjiga): number {
    if (this.zaduzenje.broj == 3) return -2;
    let zaduzeneKnjige = this.zaduzenje.zaduzeneKnjige
      .find(zaduzenaKnjiga => zaduzenaKnjiga.knjiga.id === book.id);
    if (zaduzeneKnjige)
      return -1;
    this.zaduzenje.zaduzeneKnjige.push(new ZaduzenaKnjiga(book));
    this.setZaduzenjeToLocalStorage();
    return 0;
  }

  returnBook(bookId: string): void {
    this.zaduzenje.zaduzeneKnjige = this.zaduzenje.zaduzeneKnjige
      .filter(zaduzenaKnjiga => zaduzenaKnjiga.knjiga.id != bookId);
    this.setZaduzenjeToLocalStorage();
  }

  postponeBook(bookId: string): number {
    let zaduzenaKnjiga = this.zaduzenje.zaduzeneKnjige
      .find(zaduzenaKnjiga => zaduzenaKnjiga.knjiga.id === bookId);
    if (zaduzenaKnjiga.produzavana) return -1;
    if (!zaduzenaKnjiga.produzavana) {
      zaduzenaKnjiga.period += 14;
      zaduzenaKnjiga.produzavana = true;
    }
    this.setZaduzenjeToLocalStorage();
    return 0;
  }

  getZaduzenjeObservable(): Observable<Zaduzenje> {
    return this.zaduzenjeSubject.asObservable();
  }

  getZaduzenje(): Zaduzenje{
    return this.zaduzenjeSubject.value;
  }

  private setZaduzenjeToLocalStorage(): void {
    this.zaduzenje.broj = this.zaduzenje.zaduzeneKnjige.length;
    const zaduzenjeJson = JSON.stringify(this.zaduzenje);
    localStorage.setItem('Zaduzenje', zaduzenjeJson);
    this.zaduzenjeSubject.next(this.zaduzenje);
  }

  private getZaduzenjeFromLocalStorage(): Zaduzenje {
    const zaduzenjeJson = localStorage.getItem('Zaduzenje');
    return zaduzenjeJson ? JSON.parse(zaduzenjeJson) : new Zaduzenje();
  } */
}
