import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

export class ImagesController {
    constructor(
        // private readonly imagesService: ImagesService
    ) {}

    getImage = ( req: Request, res: Response ) => {
        const { type = '', img = '' } = req.params;
        const imagePath = path.resolve( __dirname, `../../../uploads/${ type }/${ img }` );

        if( !fs.existsSync( imagePath ) ) {
            return res.status(404).send('Image not found.')
        }

        return res.sendFile( imagePath );
    }
}