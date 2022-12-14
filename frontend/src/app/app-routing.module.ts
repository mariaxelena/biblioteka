import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookPageComponent } from './components/pages/book-page/book-page.component';
import { HomeComponent } from './components/pages/home/home.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { MyBooksPageComponent } from './components/pages/my-books-page/my-books-page.component';
import { RegisterPageComponent } from './components/pages/register-page/register-page.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'pretraga/:searchTerm', component: HomeComponent},
  {path: 'zanr/:genreName', component: HomeComponent},
  {path: 'knjiga/:id', component: BookPageComponent},
  {path: 'moje-knjige', component: MyBooksPageComponent},
  {path: 'prijava', component: LoginPageComponent},
  {path: 'registracija', component: RegisterPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
