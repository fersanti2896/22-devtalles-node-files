import { Router } from 'express';
import { CategoryController } from './category.controller';
import { CategoryService } from '../services';
import { AuthMiddleware } from '../middlewares/auth.middleware';

export class CategoryRoutes {
    static get routes(): Router {
        const router = Router();
        const categoryService = new CategoryService();
        const categoryController = new CategoryController( categoryService );

        router.get( '/', categoryController.getCategories );
        router.post( '/', [ AuthMiddleware.validateJWT ], categoryController.createCategory );

        return router;
    }
}