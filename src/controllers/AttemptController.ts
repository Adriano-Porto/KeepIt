import { Request, Response } from 'express'
import { AttemptService } from '../services/AttemptService'


class AttemptController {
    async handle(req: Request, res: Response) {
        const { correct, card_id, deck_id, user_id } = req.body
        const attemptService = new AttemptService()
        
        const attempt = await attemptService.create({ correct, card_id, deck_id, user_id })
        return res.json(attempt)
    }
}

export { AttemptController }