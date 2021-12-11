import { ValidationError } from "./ValidationError";
import { Request, Response, NextFunction} from 'express'

export function handleErrors(err: Error, req: Request, res: Response, next: NextFunction) {

    if(err instanceof ValidationError) {
        return res.status(400).json({error: err.message})
    }
    return res.status(500).json({error: `Internal Server Error ${err.message}`})
    

    return next()
}