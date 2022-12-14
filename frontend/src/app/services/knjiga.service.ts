import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BOOKS_BY_GENRE_URL, BOOKS_BY_ID_URL, BOOKS_BY_SEARCH_URL, BOOKS_GENRES_URL, BOOKS_URL } from '../shared/constants/urls';
import { Knjiga } from '../shared/models/Knjiga';
import { Zanr } from '../shared/models/Zanr';

@Injectable({
  providedIn: 'root'
})
export class KnjigaService {

  constructor(private http:HttpClient) { }

  getAll():Observable<Knjiga[]>{
    return this.http.get<Knjiga[]>(BOOKS_URL);
  }


  getAllBooksBySearchTerm(searchTerm:string) {
    return this.http.get<Knjiga[]>(BOOKS_BY_SEARCH_URL + searchTerm);
  }

  getAllGenres(): Observable<Zanr[]>{
    return this.http.get<Zanr[]>(BOOKS_GENRES_URL);
  }

  getAllBooksByGenre(genreName:String){
    return genreName === "svi žanrovi" ?
    this.getAll() :
    this.http.get<Knjiga[]>(BOOKS_BY_GENRE_URL + genreName);
  }

  getBookById(bookId:String):Observable<Knjiga>{
    return this.http.get<Knjiga>(BOOKS_BY_ID_URL + bookId);
  }
}
