import { Request, Response } from 'express';
import { CustomError, PaginationDto } from '../../domain';
import { FileUploadService } from '../services';

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
        res.json('Upload File')
    };

    uploadMultipleFile = ( req: Request, res: Response ) => {
        res.json('Upload Multiple File')
    };
}