import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { KorisnikService } from 'src/app/services/korisnik.service';
import { IKorisnikRegister } from 'src/app/shared/interfaces/iKorisnikRegister';
import { PasswordsMatchValidator } from 'src/app/shared/validators/password_match_validator'

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {

  registerForm!:FormGroup;
  isSubmitted = false;

  returnUrl = '';
  constructor(private formBuilder: FormBuilder, private korisnikService: KorisnikService, private activatedRoute: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      ime: ['', [Validators.required, Validators.minLength(7)]],
      korime: ['', [Validators.required]],
      lozinka: ['',[Validators.required, Validators.minLength(8), Validators.maxLength(12)]],
      potvrdaLozinke: ['', Validators.required],
      adresa: ['', [Validators.required, Validators.minLength(12)]]
    }, {
      validators: PasswordsMatchValidator('lozinka', 'potvrdaLozinke')
    });

    this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl;
  }

  get fc(){
    return this.registerForm.controls;
  }

  submit() {
    this.isSubmitted = true;
    if(this.registerForm.invalid) return;

    const fv= this.registerForm.value;
    const user:IKorisnikRegister = {
      korime: fv.korime,
      ime: fv.ime,
      lozinka: fv.lozinka,
      potvrdaLozinke: fv.potvrdaLozinke,
      adresa: fv.adresa
    };
    this.korisnikService.register(user).subscribe(_=>{
      this.router.navigateByUrl(this.returnUrl);
    })
  }

}
