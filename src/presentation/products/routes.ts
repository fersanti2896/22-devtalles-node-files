import { Router } from 'express';
import { ProductService } from '../services';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { ProductController } from './product.controller';

export class ProductsRouter {
    static get routes(): Router {
        const router = Router();
        const productService = new ProductService();
        const productController = new ProductController( productService );

        router.get( '/', productController.getProducts );
        router.post( '/', [ AuthMiddleware.validateJWT ], productController.createProduct );

        return router;
    }
}