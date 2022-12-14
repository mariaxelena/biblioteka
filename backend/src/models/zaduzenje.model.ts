import { Schema, model, Types } from 'mongoose';
import { Knjiga, KnjigaSchema } from './knjiga.model';

export interface ZaduzenaKnjiga{
    knjiga: Knjiga;
    period: number;
    produzavana: boolean;
    vracena: boolean;
}

export const ZaduzenaKnjigaSchema = new Schema<ZaduzenaKnjiga>(
    {
        knjiga: {type: KnjigaSchema, required: true},
        period: {type: Number, required: true},
        produzavana: {type: Boolean, required: true},
        vracena: {type: Boolean, default: false}
    }
);

export interface Zaduzenje{
    id:string;
    broj: number;
    zaduzeneKnjige: ZaduzenaKnjiga[];
    korisnik: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

export const ZaduzenjeSchema = new Schema<Zaduzenje>({
      broj: {type: Number, required: true},
      zaduzeneKnjige: {type: [ZaduzenaKnjigaSchema], required: true},
      korisnik: {type: Schema.Types.ObjectId, required: true}
}, {
    timestamps: true,
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    }
});

export const ZaduzenjeModel = model<Zaduzenje>('zaduzenje', ZaduzenjeSchema);