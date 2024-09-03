import express from "express";
import Artist from "../models/Artist";
import {imagesUpload} from "../multer";

const artistsReducer = express.Router();

artistsReducer.post("/", imagesUpload.single('image'), async (req, res, next) => {
    try {
        const artistData = {
            artist: req.body.artist,
            image: req.file ? req.file.filename : null,
            information: req.body.information,
        }

        const artist = new Artist(artistData);
        await artist.save();
        return res.send(artist);
    } catch (error) {
        return next(error);
    }
});

artistsReducer.get('/', async (req, res, next) => {
    try {
        const artists = await Artist.find();
        return res.send(artists);
    } catch (error) {
        return next(error);
    }
});

export default artistsReducer;