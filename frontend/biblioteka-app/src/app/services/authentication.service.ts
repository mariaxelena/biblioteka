import { Injectable } from '@angular/core';
import { Auth, authState, createUserWithEmailAndPassword, updateProfile } from '@angular/fire/auth';
import { signInWithEmailAndPassword } from '@firebase/auth';
import { stringLength } from '@firebase/util';
import { from, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  currentUser$ = authState(this.auth);

  constructor(private auth: Auth) { }

  login(username: string, password: string) {
    return from(signInWithEmailAndPassword(this.auth, username, password));
  }

  signUp(username: string, password: string, name: string, surname: string, address: string, phoneNumber: string, email: string){
    return from(createUs)
  }
  logout() {
    return from(this.auth.signOut());
  }
}
