import { Router } from 'express';
import { primeri_korisnika } from '../data';
import jwt from 'jsonwebtoken';
import { Korisnik, KorisnikModel } from '../models/korisnik.model';
import asyncHandler from 'express-async-handler';
import { HTTP_BAD_REQUEST } from '../constants/http_status';
import bcrypt from 'bcryptjs';

const router = Router();

router.get("/seed", asyncHandler(
    async (req, res) => {
        const usersCount = await KorisnikModel.countDocuments();
        if(usersCount > 0) {
            res.send("Seed is already done!");
            return;
        }
        await KorisnikModel.create(primeri_korisnika);
        res.send("Seed Is Done!")
    }
))

router.post("/prijava", asyncHandler(
    async (req, res) => {
        const {korime, lozinka} = req.body;
        const encryptedPassword = await bcrypt.hash(lozinka, 10);
        const korisnik = await KorisnikModel.findOne({korime , encryptedPassword});
        
        if(korisnik) {
            res.send(generateTokenResponse(korisnik));
        } else {
            res.status(HTTP_BAD_REQUEST).send("Korisničko ime ili lozinka su netačni!");
        }
    }
))



router.post('/registracija', asyncHandler(
    async (req,res) => {
        const {ime, korime, lozinka, adresa} = req.body;
        const korisnik = await KorisnikModel.findOne({korime});
        if (korisnik){
            res.status(HTTP_BAD_REQUEST)
            .send('Korisničko ime je zauzeto!');
            return;
        }

        const encryptedPassword = await bcrypt.hash(lozinka, 10);

        const newKorisnik: Korisnik = {
            id:'',
            korime: korime.toLowerCase(),
            ime,
            lozinka: encryptedPassword,
            adresa,
            admin: false,
            moderator: false
        }
        const dbKorisnik = await KorisnikModel.create(newKorisnik);
        res.send(generateTokenResponse(dbKorisnik));

    }
))


const generateTokenResponse = (korisnik : Korisnik) => {
    const token = jwt.sign({
      id: korisnik.id, korime:korisnik.korime, admin: korisnik.admin
    },process.env.JWT_SECRET!,{
      expiresIn:"30d"
    });
    return {
        id: korisnik.id,
        korime: korisnik.korime,
        ime: korisnik.ime,
        adresa: korisnik.adresa,
        admin: korisnik.admin,
        moderator: korisnik.moderator,
        token: token
      };
}

export default router;