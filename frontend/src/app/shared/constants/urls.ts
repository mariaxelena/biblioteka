const BASE_URL = 'http://localhost:4000';

export const BOOKS_URL = BASE_URL + '/api/knjige';
export const BOOKS_GENRES_URL = BOOKS_URL + '/zanrovi';
export const BOOKS_BY_SEARCH_URL = BOOKS_URL + '/pretraga/';
export const BOOKS_BY_GENRE_URL = BOOKS_URL + '/zanr/';
export const BOOKS_BY_ID_URL = BOOKS_URL + '/';

export const USER_URL = BASE_URL + '/api/korisnici';
export const USER_LOGIN_URL = USER_URL + '/prijava';
export const USER_REGISTER_URL = USER_URL + '/registracija';
export const USER_ADD_BOOK_URL = USER_URL + '/zaduzi';
export const MY_BOOKS_URL = USER_URL + '/moje-knjige';

export const ZADUZENJE_URL = BASE_URL + '/api/zaduzenja';
export const ZADUZI_KNJIGU_URL = ZADUZENJE_URL + '/zaduziKnjigu';
export const ZADUZENJA_ZA_TRENUTNOG_KORISNIKA_URL = ZADUZENJE_URL + '/zaduzenjaZaTrenutnogKorisnika';
export const VRATI_KNJIGU_URL = ZADUZENJE_URL + '/vratiKnjigu';

