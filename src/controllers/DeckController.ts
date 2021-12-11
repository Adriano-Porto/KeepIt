import { Request, Response } from 'express'
import { DeckService } from '../services/DeckService'
class DeckController {
    async handle(req: Request, res: Response) {
        const { name, user_id } = req.body
        const deckService = new DeckService()        
        const deck = await deckService.create({name, user_id})
        return res.json(deck)
    }
}

export { DeckController }