import { photoRepository } from "../repositories/index.js";
async function getPhotosOfUser(req,res){
    const id=req?.params?.id;
    try{
        const photos=await photoRepository.getPhotosOfUser(id);
        res.status(200).send(photos);
    }
    catch(exception){
        res.status(404).send({message:exception.message});
    }
}

export default {getPhotosOfUser};