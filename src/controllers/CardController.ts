import { Request, Response } from 'express'
import { CardService } from '../services/CardService'

class CardController {
    async handle(req: Request, res: Response) {
        const { title, question, answer, user_id, deck_id} = req.body

        const cardService = new CardService()

        const card = await cardService.create({title, question, answer, user_id, deck_id})
        return res.json( card )
    }
}

export { CardController }