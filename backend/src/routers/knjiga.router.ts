import { Router } from 'express';
import { primeri_knjiga } from '../data';
import asyncHandler from 'express-async-handler'
import { KnjigaModel } from '../models/knjiga.model';
const router = Router();

router.get("/seed", asyncHandler(
    async (req, res) => {
        const booksCount = await KnjigaModel.countDocuments();
        if(booksCount > 0) {
            res.send("Seed is already done!");
            return;
        }
        await KnjigaModel.create(primeri_knjiga);
        res.send("Seed Is Done!")
    }
))

router.get("/",asyncHandler(
    async (req, res) => {
        const books = await KnjigaModel.find();
        res.send(books);
    }
))


router.get("/pretraga/:searchTerm", asyncHandler(
    async (req, res) => {
        const searchRegex = new RegExp(req.params.searchTerm, 'i');
        const books = await KnjigaModel.find({ $or: [{naziv: {$regex:searchRegex}}, {autor: {$regex:searchRegex}}]});
        res.send(books);
    }
))

router.get("/zanrovi", asyncHandler(
    async (req, res) => {
        const genres = await KnjigaModel.aggregate([
            {
                $unwind:'$zanr'
            },
            {
                $group:{
                    _id: '$zanr',
                    broj: {$sum: 1}
                }
            },
            {
                $project:{
                    _id: 0,
                    ime: '$_id',
                    broj: '$broj'
                }
            }
        ]).sort({broj: -1});
        const svi = {
            ime: 'svi žanrovi',
            broj: await KnjigaModel.countDocuments()
        }
        genres.unshift(svi);
        res.send(genres);
    }
))

router.get("/zanr/:genreName", asyncHandler(
    async (req, res) => {
        const books = await KnjigaModel.find({zanr: req.params.genreName});
        res.send(books);
    }
))

router.get("/:bookId", asyncHandler(
    async (req, res) => {
        const book = await KnjigaModel.findById(req.params.bookId);
        res.send(book);
    }
))

export default router;