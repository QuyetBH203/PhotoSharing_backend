import express from "express";
import { PhotoController } from "../controllers/index.js";
import Photo from "../db/photoModel.js";
import HttpStatusCode from "../exceptions/HttpStatusCode.js";
const router = express.Router();

;

router.get('/photosOfUser/:id', PhotoController.getPhotosOfUser);

export default router;