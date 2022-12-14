import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { USER_LOGIN_URL, USER_REGISTER_URL } from '../shared/constants/urls';
import { IKorisnikLogin } from '../shared/interfaces/IKorisnikLogin';
import { Korisnik } from '../shared/models/Korisnik';
import { ToastrService } from 'ngx-toastr'
import { Router } from '@angular/router';
import { IKorisnikRegister } from '../shared/interfaces/iKorisnikRegister';
import { ZaduzenjeService } from './zaduzenje.service';

const USER_KEY = 'Korisnik';
@Injectable({
  providedIn: 'root'
})
export class KorisnikService {

  private korisnikSubject = new BehaviorSubject<Korisnik>(this.getKorisnikFromLocalStorage());
  public korisnikObservable:Observable<Korisnik>;
  constructor(private http:HttpClient, private toastrService:ToastrService, private router: Router, private zaduzenjeService: ZaduzenjeService) {
    this.korisnikObservable = this.korisnikSubject.asObservable();
  }

  public get currentUser():Korisnik{
    return this.korisnikSubject.value;
  }

  login(userLogin:IKorisnikLogin):Observable<Korisnik>{
    return this.http.post<Korisnik>(USER_LOGIN_URL, userLogin).pipe(
      tap({
        next: (user) =>{
          this.setKorisnikToLocalStorage(user);
          this.korisnikSubject.next(user);
          this.toastrService.success(
            `Dobrodošao/la u Biblioteku ${user.ime}`,
            'Uspešna prijava'
          )
          this.zaduzenjeService.setZaduzenjeToLocalStorage();
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error, 'Neuspešna prijava');
        }
      })
    );
  }

  register(userRegister: IKorisnikRegister): Observable<Korisnik>{
    return this.http.post<Korisnik>(USER_REGISTER_URL, userRegister).pipe(
      tap({
        next: (user) => {
          this.setKorisnikToLocalStorage(user);
          this.korisnikSubject.next(user);
          this.toastrService.success(
            `Dobrodošao/la u Biblioteku ${user.ime}`,
            'Uspešna registracija'
          )
          this.zaduzenjeService.setZaduzenjeToLocalStorage();
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error,
            'Neuspešna registracija')
        }
      })
    )
  }

  logout(){
    this.korisnikSubject.next(new Korisnik());
    localStorage.removeItem(USER_KEY);
    this.router.navigateByUrl('/');
  }

  private setKorisnikToLocalStorage(korisnik: Korisnik){
    localStorage.setItem(USER_KEY, JSON.stringify(korisnik));
  }

  private getKorisnikFromLocalStorage():Korisnik{
    const userJson = localStorage.getItem(USER_KEY);
    if (userJson) return JSON.parse(userJson) as Korisnik;
    return new Korisnik();
  }

}
