import { Request, Response } from 'express'
import { DeckService } from '../services/DeckService'
class DeckController {
    async handle(req: Request, res: Response) {
        const deckService = new DeckService()
        const { name, user_id } = req.body
        const deck = await deckService.create({name, user_id})
        return res.json(deck)
    }
    async getAll(req: Request, res: Response) {
        const deckService = new DeckService()
        const { id } = req.body
        const listOfDecks = await deckService.listAll(id)
        return res.json(listOfDecks)
    }
}

export { DeckController }