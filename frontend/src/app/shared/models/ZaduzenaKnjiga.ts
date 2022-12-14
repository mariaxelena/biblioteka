import { Knjiga } from "./Knjiga";

export class ZaduzenaKnjiga{
  constructor(public knjiga: Knjiga){
    this.knjiga = knjiga;
  }
  period:number = 14;
  produzavana:boolean = false;
  vracena:boolean = false;
}
