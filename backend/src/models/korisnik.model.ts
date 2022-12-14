import { Schema, model } from 'mongoose';

export interface Korisnik{
    id:string;
    korime:string;
    lozinka:string;
    ime:string;
    adresa:string;
    admin:boolean;
    moderator:boolean;
}

export const KorisnikSchema = new Schema<Korisnik>({
    korime: {type:String, required:true, unique:true},
    lozinka: {type:String, required:true},
    ime: {type:String, required:true},
    adresa: {type:String, required:true},
    admin: {type:Boolean, default:false},
    moderator: {type:Boolean, default:false}
}, {
    timestamps: true,
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    }
});

export const KorisnikModel = model<Korisnik>('korisnik', KorisnikSchema);