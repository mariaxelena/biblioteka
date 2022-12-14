import {Router} from 'express';
import asyncHandler from 'express-async-handler';
import { HTTP_BAD_REQUEST } from '../constants/http_status';
import auth from '../middlewares/auth.mid';
import { ZaduzenaKnjiga, ZaduzenjeModel } from '../models/zaduzenje.model';

const router = Router();
router.use(auth);


router.post('/zaduziKnjigu', asyncHandler( async (req:any, res) => {
    const {knjiga} = req.body;
    const zaduzenje = await getZaduzenjeZaTrenutnogKorisnika(req);

    if(!zaduzenje){
        res.status(HTTP_BAD_REQUEST).send('Greška! Pokušajte kasnije.');
        return;
    }

    if (zaduzenje.zaduzeneKnjige.length == 3) {
        res.status(HTTP_BAD_REQUEST).send('Već ste zadužili maksimalan broj knjiga!');
        return;
    }
    if (zaduzenje.zaduzeneKnjige.includes(knjiga)) {
        res.status(HTTP_BAD_REQUEST).send('Već ste zadužili ovu knjigu!');
        return;
    }
    const newZaduzenaKnjiga: ZaduzenaKnjiga = {
        knjiga,
        period: 14,
        produzavana: false,
        vracena: false
    }
    zaduzenje.zaduzeneKnjige.push(newZaduzenaKnjiga);
    zaduzenje.broj++;
    await ZaduzenjeModel.updateOne(
        { korisnik: req.korisnik.id },
        {
            $set: {
                zaduzeneKnjige: zaduzenje.zaduzeneKnjige,
                broj: zaduzenje.broj
            }
        }
    )
    const newZaduzenje = await getZaduzenjeZaTrenutnogKorisnika(req);
    res.send(newZaduzenje);
}))

router.get('/zaduzenjaZaTrenutnogKorisnika', asyncHandler( async (req:any,res ) => {
    const zaduzenje= await getZaduzenjeZaTrenutnogKorisnika(req);
    if(zaduzenje) res.send(zaduzenje);
    else {
        const zaduzeneKnjige: ZaduzenaKnjiga[] = [];
        const newZaduzenje = new ZaduzenjeModel({broj: 0, zaduzeneKnjige: zaduzeneKnjige, korisnik: req.korisnik.id});
        await newZaduzenje.save();
        res.send(newZaduzenje);
    }
}))

router.post('/vratiKnjigu', asyncHandler( async (req:any, res) => {
    const {knjigaId} = req.body;
    const zaduzenje = await getZaduzenjeZaTrenutnogKorisnika(req);
    if(!zaduzenje){
        res.status(HTTP_BAD_REQUEST).send('Korisnik nema zaduzenje!');
        return;
    }

    const zaduzenaKnjiga = zaduzenje.zaduzeneKnjige.find(zaduzenaKnjiga => zaduzenaKnjiga.knjiga.id == knjigaId);
    if (zaduzenaKnjiga) {
        zaduzenaKnjiga.vracena = true;
    }
    await zaduzenje.save();
    res.send(zaduzenje._id);
}))



export default router;

async function getZaduzenjeZaTrenutnogKorisnika(req: any) {
    return await ZaduzenjeModel.findOne({ korisnik: req.korisnik.id});
}