import { Router } from 'express';
import { ImagesController } from './images.controller';

export class ImageRoutes {
    static get routes(): Router {
        const router = Router();
        const imagesControler = new ImagesController();

        router.get('/:type/:img', imagesControler.getImage)

        return router;
    }
}