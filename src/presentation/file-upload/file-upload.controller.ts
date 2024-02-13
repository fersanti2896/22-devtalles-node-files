import { Request, Response } from 'express';
import { CustomError } from '../../domain';
import { FileUploadService } from '../services';
import { UploadedFile } from 'express-fileupload';

export class FileUploadController {
    constructor(
        private readonly fileService: FileUploadService
    ) {}

    private handleError = ( error: unknown, res: Response ) => {
        if( error instanceof CustomError ) {
            return res.status( error.statusCode ).json({ error: error.message });
        }

        return res.status(500).json({ error: 'Internal Server Error' });
    }

    uploadFile = ( req: Request, res: Response ) => {
        const type = req.params.type;
        const validTypes = ['users', 'products', 'categories'];

        if( !validTypes.includes(type) ) {
            return res.status(400).json({ error: `Invalid type: ${ type }, valid ones: ${ validTypes }` });
        }

        const file = req.body.files.at(0) as UploadedFile;

        this.fileService.uploadSingle( file, `uploads/${ type }` )
                        .then( uploaded => res.status(200).json( uploaded ) )
                        .catch( error => this.handleError( error, res ) );
    };

    uploadMultipleFile = ( req: Request, res: Response ) => {
        const type = req.params.type;
        const validTypes = ['users', 'products', 'categories'];

        if( !validTypes.includes(type) ) {
            return res.status(400).json({ error: `Invalid type: ${ type }, valid ones: ${ validTypes }` });
        }

        const files = req.body.files as UploadedFile[];

        this.fileService.uploadMultiple( files, `uploads/${ type }` )
                        .then( uploaded => res.status(200).json( uploaded ) )
                        .catch( error => this.handleError( error, res ) );
    };
}