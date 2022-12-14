

import { Schema, model } from 'mongoose';
  
export interface Knjiga{
    id:string;
    naziv:string;
    autor:string[];
    zanr:string[];
    izdavac:string;
    godina:string;
    jezik:string;
    slikaUrl:string;
    ocena:number;
    opis:string;
}

export const KnjigaSchema = new Schema<Knjiga>(
    {
        naziv: {type: String, required: true},
        autor: {type: [String], required: true},
        zanr: {type: [String], required: true},
        izdavac: {type: String, required: true},
        godina: {type: String, required: true},
        jezik: {type: String, required: true},
        slikaUrl: {type: String},
        ocena: {type: Number, default: 0},
        opis: {type: String},
    },{
        toJSON:{
            virtuals: true
        }, 
        toObject:{
            virtuals: true
        },
        timestamps: true
    }
);

export const KnjigaModel = model<Knjiga>('knjiga', KnjigaSchema);