import { Component, OnInit } from '@angular/core';
import { KnjigaService } from 'src/app/services/knjiga.service';
import { Zanr } from 'src/app/shared/models/Zanr';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.css']
})
export class GenresComponent implements OnInit {
  genres?:Zanr[];
  constructor(knjigaService: KnjigaService) {
    knjigaService.getAllGenres().subscribe(serverGenres => {
      this.genres = serverGenres;
    });
  }

  ngOnInit(): void {
  }

}
